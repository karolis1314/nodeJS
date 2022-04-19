const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const category = await Category.find();

      if(!category){
        res.status(500).json({success: false});
      }
      res.send(category);
  })
  
  router.post(`/`, async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save((err, category) => {
      if (err) {
        res.status(500).json({
          error: err,
          success: false
     })
    } else {
        res.send(category);
      }
    });
  })

  module.exports = router;