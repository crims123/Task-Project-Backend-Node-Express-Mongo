const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Nombre: String, 
    Apellido: String, 
    Email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    }, 
    Contrasena: String
});

module.exports = mongoose.model('User', userSchema);