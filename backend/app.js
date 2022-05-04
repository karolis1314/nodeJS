const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/errorHandler');

app.use(cors());
app.options('*', cors());

//require
require('dotenv/config');

//Routers constants
const productRouter = require('./routers/productRouter');
const ordersRouter = require('./routers/ordersRouter');
const orderItemRouter = require('./routers/orderItemRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');


// env variable
const api = process.env.API_URL;
const dbConnection = process.env.CONNECTION_TO_THE_DB;

//Middelware for this app
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/orderItems`, orderItemRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);

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