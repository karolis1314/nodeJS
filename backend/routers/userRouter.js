const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const user = await User.find().select('-password');

      if(!user){
        res.status(404).json({success: false});
      }
      res.send(user);
  })

  router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
      res.status(404).json({success: false, error: 'User not found'});
    }
    res.status(200).send(user);
  })

  router.put(`/:id`, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password');
    if(!user){
      res.status(404).json({success: false, error: 'User not found'});
    }
    res.status(200).send(user);
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
  