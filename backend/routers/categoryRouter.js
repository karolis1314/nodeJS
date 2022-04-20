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

  router.get(`/:id`, async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
      res.status(500).json({success: false, error: 'Category not found'});
    }
    res.status(200).send(category);
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

  router.put(`/:id`, async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!category){
      res.status(500).json({success: false, error: 'Category not found'});
    }
    res.status(200).send(category);
  })

  router.delete(`/:id`,  (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
      if(category){
        return res.status(200).json({
          success: true,
          category: category
          });
      } else {
        return res.status(404).json({
          error: 'Category not found',
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

  module.exports = router;