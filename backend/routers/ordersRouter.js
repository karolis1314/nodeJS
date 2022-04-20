const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();


 router.get(`/`, async (req, res) => {
    const order = await Order.find();

      if(!order){
        res.status(404).json({success: false});
      }
      res.send(order);
  })

  router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
      res.status(404).json({success: false, error: 'Order not found'});
    }
    res.status(200).send(order);
  })

  router.put(`/:id`, async (req, res) => {
    const user = await User.findById(req.body.user);
    const orderItem = await OrderItem.findById(req.body.orderItem);
    if(!user){
      return res.status(400).send({success: false, error: 'Invalid User'});
    }
    if(!orderItem){
      return res.status(400).send({success: false, error: 'Invalid OrderItem'});
    }
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!order){
      res.status(404).json({success: false, error: 'Order not found'});
    }
    res.status(200).send(order);
  })

  router.delete(`/:id`,  (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(order => {
      if(order){
        return res.status(200).json({
          success: true,
          order: order
          });
      } else {
        return res.status(404).json({
          error: 'Order not found',
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
    const user = await User.findById(req.body.user);
    const orderItem = await OrderItem.findById(req.body.orderItem);
    if(!user){
      return res.status(400).send({success: false, error: 'Invalid User'});
    }
    if(!orderItem){
      return res.status(400).send({success: false, error: 'Invalid OrderItem'});
    }
    const newOrder = new Order(req.body);
    await newOrder.save((err, order) => {
      if (err) {
        res.status(404).json({
          error: err,
          success: false
     })
    } else {
        res.send(order);
      }
    });
  })

  module.exports = router;