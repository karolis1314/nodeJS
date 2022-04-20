const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();


 router.get(`/`, (req, res) => {
    Order.find().then(order => {
      if(!order){
        res.status(404).json({success: false});
      }
      res.status(200).send(order);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.get(`/:id`, (req, res) => {
    Order.findById(req.params.id).then(order => {
      if(!order){
        res.status(404).json({success: false, error: 'Order not found'});
      }
      res.status(200).send(order);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.put(`/:id`,(req, res) => {
    User.findById(req.body.user).then(user => {
      if(!user){
        return res.status(400).send({success: false, error: 'Invalid User'});
      }}).catch(err => {
        return res.status(500).send({
          error: err,
          success: false
        })
      })
    OrderItem.findById(req.body.orderItem).then(orderItem => {
    if(!orderItem){
      return res.status(400).send({success: false, error: 'Invalid OrderItem'});
    }
    }).catch(err => {
    return res.status(500).send({
      error: err,
      success: false
    })
  })
    Order.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(order => {
      if(!order){
        res.status(404).json({success: false, error: 'Order not found'});
      }
      res.status(200).send(order);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
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