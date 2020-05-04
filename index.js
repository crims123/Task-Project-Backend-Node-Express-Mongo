require('./database');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

// Middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(port, '0.0.0.0', () => {
  console.log('Server running at port: ' + app.get('port'));
});
