const { OrderItem } = require('../models/orderItem');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const orderItem = await OrderItem.find();

      if(!orderItem){
        res.status(500).json({success: false});
      }
      res.send(orderItem);
  })
  
  router.post(`/`, (req, res) => {
    const newOrderItem = new OrderItem(req.body);
    newOrderItem.save((err, orderItem) => {
      if (err) {
        res.status(500).json({
          error: err,
          success: false
     })
    } else {
        res.send(orderItem);
      }
    });
  })

  module.exports = router;