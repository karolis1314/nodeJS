const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

//require
require('dotenv/config');
const productRouter = require('./routers/productRouter');

// env variable
const api = process.env.API_URL;
const dbConnection = process.env.CONNECTION_TO_THE_DB;

//Middelware for this app
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productRouter);

mongoose.connect(dbConnection,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch(err => {
  console.log('Error connecting to the database', err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});