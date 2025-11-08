const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const alienRoutes = require('./routes/alienRoutes');
const errorHandler = require('./middelwares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
app.use('/api', alienRoutes);
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/alienDB')
    .then(() => console.log('MongoDB tilsluttet!'))
    .catch(err => console.error('MongoDB fejl:', err));

app.listen(port, () => console.log('Server klar op http://localhost:3000'));

