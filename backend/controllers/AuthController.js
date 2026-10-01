const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_myshop_2026';
const TOKEN_EXPIRES_IN = '24h';
const HASH_ITERATIONS = 100000;
const HASH_KEY_LENGTH = 64;
const HASH_DIGEST = 'sha512';

const generateToken = (id, name, role) => {
    return jwt.sign(
        { id, name, role },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES_IN }
    );
};

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)
        .toString('hex');

    return `${salt}:${hash}`;
};

const comparePassword = (password, savedPassword) => {
    const [salt, savedHash] = String(savedPassword || '').split(':');

    if (!salt || !savedHash) {
        return false;
    }

    const hash = crypto
        .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)
        .toString('hex');

    if (hash.length !== savedHash.length) {
        return false;
    }

    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(savedHash));
};

class AuthController {
    async registration(req, res) {
        try {
            const { name, email, password } = req.body;
            const userName = (name || email || '').trim();

            if (!userName || !password) {
                return res.status(400).json({ message: 'Имя пользователя и пароль обязательны' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Пароль должен быть не короче 6 символов' });
            }

            const candidate = await UserRepository.isUser({ name: userName });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }

            const hashedPassword = hashPassword(password);
            const role = 'user';
            const id = await UserRepository.addUser({
                name: userName,
                password: hashedPassword,
                role,
            });
            const token = generateToken(id, userName, role);

            return res.status(201).json({
                token,
                user: { id, name: userName, role },
                message: 'Регистрация успешна',
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { name, email, password } = req.body;
            const userName = (name || email || '').trim();

            if (!userName || !password) {
                return res.status(400).json({ message: 'Имя пользователя и пароль обязательны' });
            }

            const user = await UserRepository.isUser({ name: userName });
            if (!user || !comparePassword(password, user.password)) {
                return res.status(400).json({ message: 'Неверное имя пользователя или пароль' });
            }

            const token = generateToken(user.id, user.name, user.role);

            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                },
                message: 'Вы успешно вошли',
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка авторизации' });
        }
    }
}

module.exports = new AuthController();
