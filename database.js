const mongoose = require('mongoose');

const URI = 'mongodb+srv://acamica:acamica@cluster0-gzgnl.azure.mongodb.net/tasks?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Successfully connected to the Database');
});