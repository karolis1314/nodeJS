const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();


 router.get(`/`, async (req, res) => {
    const order = await Order.find();

      if(!order){
        res.status(500).json({success: false});
      }
      res.send(order);
  })
  
  router.post(`/`, async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save((err, order) => {
      if (err) {
        res.status(500).json({
          error: err,
          success: false
     })
    } else {
        res.send(order);
      }
    });
  })

  module.exports = router;