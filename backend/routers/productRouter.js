const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const product = await Product.find();

      if(!product){
        res.status(404).json({success: false});
      }
      res.send(product);
  })

  router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
      res.status(404).json({success: false, error: 'Product not found'});
    }
    res.status(200).send(product);
  })

  router.put(`/:id`, async (req, res) => { 
    const category = await Category.findById(req.body.category);
    if(!category){
      return res.status(400).send({success: false, error: 'Invalid Category'});
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!product){
      res.status(404).json({success: false, error: 'Product not found'});
    }
    res.status(200).send(product);
  })

  router.delete(`/:id`,  (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
      if(product){
        return res.status(200).json({
          success: true,
          product: product
          });
      } else {
        return res.status(404).json({
          error: 'Product not found',
          success: false
        })
      }
  }).catch(err => {
    return res.status(500).json({
      error: err,
      success: false
    })
  })
})
  
  router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category){
      return res.status(400).send({success: false, error: 'Invalid Category'});
    }
    const newProduct = new Product(req.body);
    await newProduct.save((err, product) => {
      if (err) {
        res.status(404).json({
          error: err,
          success: false
     })
    } else {
        res.send(product);
      }
    });
  })

  module.exports = router;
  