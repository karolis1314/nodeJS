const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

 router.get(`/`, async (req, res) => {
    const user = await User.find();

      if(!user){
        res.status(500).json({success: false});
      }
      res.send(user);
  })
  
  router.post(`/`, (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({
          error: err,
          success: false
     })
    } else {
        res.send(user);
      }
    });
  })

  module.exports = router;
  