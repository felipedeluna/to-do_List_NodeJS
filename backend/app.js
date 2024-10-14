const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes')
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
})
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/registro.html'));
})

app.use('/usuario', authRoutes)

module.exports = app;