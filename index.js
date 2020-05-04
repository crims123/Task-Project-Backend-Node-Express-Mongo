require('./database');
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

// Middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (_, res) => {
  res.json('Conected');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Server running');
});
