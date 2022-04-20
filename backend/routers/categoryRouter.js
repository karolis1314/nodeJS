const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

 router.get(`/`,(req, res) => {
    Category.find().then(category => {
      if(!category){
        res.status(404).json({success: false});
      }
      res.send(category);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.get(`/:id`, (req, res) => {
    Category.findById(req.params.id).then(category => {
      if(!category){
        res.status(404).json({success: false, error: 'Category not found'});
      }
      res.status(200).send(category);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    }
  )
  })
  
  //Only post needs async rest needs the id validation, so promises are the best.
  router.post(`/`, async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save((err, category) => {
      if (err) {
        res.status(500).json({
          error: err,
          success: false
     })
      }else{
        res.status(200).send(category);
      }
  })
  })

  router.put(`/:id`, (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(category => {
      if(!category){
        res.status(404).json({success: false, error: 'Category not found'});
      }
      res.status(200).send(category);
    }).catch(err => {
    res.status(500).json({
      error: err,
      success: false
    })  
  })
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