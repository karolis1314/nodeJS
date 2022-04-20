const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

 router.get(`/`, (req, res) => {
    User.find().select('-password').then(user => {
      if(!user){
        res.status(404).json({success: false});
      }
      res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.get(`/:id`, (req, res) => {
    User.findById(req.params.id).select('-password').then(user => {
      if(!user){
        res.status(404).json({success: false, error: 'User not found'});
      }
      res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.put(`/:id`, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password').then(user => {
      if(!user){
        res.status(404).json({success: false, error: 'User not found'});
      }
      res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
  })

  router.delete(`/:id`,  (req, res) => {
    User.findByIdAndDelete(req.params.id).select('-password').then(user => {
      if(user){
        return res.status(200).json({
          success: true,
          user: user
          });
      } else {
        return res.status(404).json({
          error: 'User not found',
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
    const newUser = new User(req.body);
    await newUser.save((err, user) => {
      if (err) {
        res.status(404).json({
          error: err,
          success: false
     })
    } else {
        res.status(200).json({
          success: true,
          user: ('User created successfully with id: ' + user._id)
        })
      }
    });
  })

  module.exports = router;
  