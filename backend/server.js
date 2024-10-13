const app = require('./app');
const connectMongo = require('./config/mongo');

const PORT = process.env.PORT || 3000;

connectMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
});