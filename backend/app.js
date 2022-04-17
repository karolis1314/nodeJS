const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

//Middelware for this app
app.use(express.json());
app.use(morgan('tiny'));

// env variable
const api = process.env.API_URL;
const dbConnection = process.env.CONNECTION_TO_THE_DB;

//Product schemas
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String
});

const Product = mongoose.model('Product', productSchema);


app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'Product 1 description',
    image: 'https://via.placeholder.com/150',
  
  };
    res.send(product);
})

app.post(`${api}/products`, (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    image: req.body.image
  });
  newProduct.save().then((createProduct => {
    res.status(201).json(createProduct)
  })).catch((err) => {
    res.status(500).json({
      error: err,
      success: false
    })
  })
})

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