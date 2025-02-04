const express = require('express')
const app = express()
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const db = require('./db');

// Middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);
app.get('/', function (req, res) {
  res.send('Hello World')
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,(req, res)=>{
    console.log("listening on port 3000");
});