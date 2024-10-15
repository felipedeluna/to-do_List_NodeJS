
const app = require('./app');
const connectMongo = require('./config/mongo');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 3000;

connectMongo().then(() => {
    console.log('MongoDB conectado com sucesso!')

    redisClient.connect().then(() => {
	console.log('Redis conectado com sucesso!')
	app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    }).catch(() => {
	console.error('Erro ao conectar ao redis:', err);
        process.exit(1);
    })
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
})
