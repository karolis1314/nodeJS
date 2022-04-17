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


app.get(`${api}/products`, async (req, res) => {
  const product = await Product.find();

    if(!product){
      res.status(500).json({success: false});
    }
    res.send(product);
})

app.post(`${api}/products`, (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save((err, product) => {
    if (err) {
      res.status(500).json({
        error: err,
        success: false
   })
  } else {
      res.send(product);
    }
  });
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