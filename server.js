const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const db = require('./db');

app.get('/', function (req, res) {
  res.send('Hello World')
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000,(req, res)=>{
    console.log("listening on port 3000");
});