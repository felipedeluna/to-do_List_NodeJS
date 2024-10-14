const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
})
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/cadastro.html'));
})

app.use('/api/usuario', authRoutes)
app.use('/api/tasks', taskRoutes)

module.exports = app;