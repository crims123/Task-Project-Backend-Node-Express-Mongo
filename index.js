require('./database');
const express = require('express');
const path = require('path');

const app = express();

// Setting
app.set('port', 4000);

// Middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', require('./routes/users'));

app.listen(app.get('port'), () => {
    console.log('Server running at port: ' + app.get('port'));
});
