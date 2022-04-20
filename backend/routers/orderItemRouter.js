const { OrderItem } = require('../models/orderItem');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const orderItem = await OrderItem.find();

      if(!orderItem){
        res.status(404).json({success: false});
      }
      res.send(orderItem);
  })

  router.get(`/:id`, async (req, res) => {
    const orderItem = await OrderItem.findById(req.params.id);
    if(!orderItem){
      res.status(404).json({success: false, error: 'OrderItem not found'});
    }
    res.status(200).send(orderItem);
  })

  router.put(`/:id`, async (req, res) => {
    const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!orderItem){
      res.status(404).json({success: false, error: 'OrderItem not found'});
    }
    res.status(200).send(orderItem);
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
        res.send(orderItem);
      }
    });
  })

  module.exports = router;