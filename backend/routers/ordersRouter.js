const { Order } = require('../models/order');
const { User } = require('../models/user');
const { OrderItem } = require('../models/orderItem');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


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

  router.put(`/:id`, async (req, res) => {
    User.findById(req.body.user).then(user => {
      if(!user){
        return res.status(400).send({success: false, error: 'Invalid User'});
      }}).catch(err => {
        return res.status(500).send({
          error: err,
          success: false
        })
      })
      let answer = false;
      req.body.orderItems.forEach(element => {
        if(!mongoose.isValidObjectId(element)){
          answer = true;
       }
      });
      if(answer){
        return res.status(400).send({ error: 'Invalid Order Items'});
      }
    const orderItems = [await OrderItem.findById(req.body.orderItems)];
    if(!orderItems){
      return res.status(400).send({success: false, error: 'Invalid Order Item'});
    }
    req.body.totalPrice = await getTotal(req.body.orderItems);
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
    const orderItem = [await OrderItem.findById(req.body.orderItems)];
    if(!user){
      return res.status(400).send({success: false, error: 'Invalid User'});
    }
      if(!orderItem){
        return res.status(400).send({success: false, error: 'Invalid OrderItem'});
      }
     const newOrder = new Order(req.body);
     newOrder.totalPrice = await getTotal(newOrder.orderItems);
     await newOrder.save((err, order) => {
      if (err) {
        res.status(404).json({
          error: "Error Passing the Order",
          success: false
     })
    } else {
        res.send(order);
      }
    });
  })

   async function getTotal(orderItems) {
    let total = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = await OrderItem.findById(orderItems[i]);
      total += orderItem.price * orderItem.quantity;
    }
    return total;
  }

  module.exports = router;