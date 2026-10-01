const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersDB = []; 

const generateToken = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.JWT_SECRET || 'secret_key_myshop_2026',
        { expiresIn: '24h' }
    );
};

class AuthController {
    async registration(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email и пароль обязательны' });
            }

            const candidate = usersDB.find(u => u.email === email);
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: usersDB.length + 1,
                email,
                role: role || 'USER',
                password: hashPassword 
            };

            usersDB.push(newUser);
            console.log('Текущая база пользователей:', usersDB);

            const token = generateToken(newUser.id, newUser.email, newUser.role);

            return res.status(201).json({ token, message: 'Регистрация успешна!' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = usersDB.find(u => u.email === email);
            if (!user) {
                return res.status(400).json({ message: 'Неверный email или пароль' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный email или пароль' });
            }

            const token = generateToken(user.id, user.email, user.role);
            return res.json({ token, message: 'Вы успешно вошли!' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка авторизации' });
        }
    }
}

module.exports = new AuthController();
