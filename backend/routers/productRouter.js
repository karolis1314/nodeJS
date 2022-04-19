const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const product = await Product.find();

      if(!product){
        res.status(500).json({success: false});
      }
      res.send(product);
  })
  
  router.post(`/`, async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save((err, product) => {
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

  module.exports = router;
  