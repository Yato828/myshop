const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./dao/db'); 

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

app.listen(PORT);