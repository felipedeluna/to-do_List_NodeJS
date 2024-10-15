const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI

const connect = async () => {
    try
    {
        await mongoose.connect(uri);
    }catch(err){
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connect;
