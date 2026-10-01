const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRepository = require('./repositories/user.repository');

const authRouter = require('./routers/AuthRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Сервер работает!'
    });
});

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await UserRepository.initTable();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server start error:', error);
    }
};

startServer();
