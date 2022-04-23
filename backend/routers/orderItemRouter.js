const { OrderItem } = require('../models/orderItem');
const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

 router.get(`/`, (req, res) => {
    OrderItem.find().then(orderItem => {
      if(!orderItem){
        res.status(404).json({success: false});
      }
      res.status(200).send(orderItem);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.get(`/:id`, (req, res) => {
    OrderItem.findById(req.params.id).then(orderItem => {
      if(!orderItem){
        res.status(404).json({success: false, error: 'OrderItem not found'});
      }
      res.status(200).send(orderItem);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.put(`/:id`, (req, res) => {
    Product.findById(req.body.product).then(product => {  
    if(!product){
      return res.status(400).send({success: false, error: 'Invalid Product'});
    }
    OrderItem.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(orderItem => {
      if(!orderItem){
        res.status(404).json({success: false, error: 'OrderItem not found'});
      } else{
        orderItem.price = product.price;
        orderItem.save();
         res.status(200).send(orderItem);
      }
    }).catch(err => {
      return res.status(500).json({
        error: err,
        success: false
      })
    })
  })
})

  router.delete(`/:id`,  (req, res) => { 
    OrderItem.findByIdAndDelete(req.params.id).then(orderItem => {
      if(orderItem){
        return res.status(200).json({
          success: true,
          orderItem: orderItem
          });
      } else {
        return res.status(404).json({
          error: 'OrderItem not found',
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
    const product = await Product.findById(req.body.product);
    if(!product){
      return res.status(400).send({success: false, error: 'Invalid Product'});
    }
    const newOrderItem = new OrderItem(req.body);
    await newOrderItem.save((err, orderItem) => {
      if (err) {
        res.status(404).json({
          error: err,
          success: false
     })
    } else {
        orderItem.price = product.price;
        orderItem.save();
        res.send(orderItem);
      }
    });
  })

  module.exports = router;