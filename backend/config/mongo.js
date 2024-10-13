const mongoose = require('mongoose');

const connect = async () => {
    try
    {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.mgydf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }catch(err){
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connect;