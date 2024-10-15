const app = require('./app');
const connectMongo = require('./config/mongo');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectMongo()
        console.log('MongoDB conectado');

        await redisClient.connect()
        console.log('Redis conectado');

        // Inicia o app
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao inicializar o servidor:', err);
        process.exit(1);
    }
})