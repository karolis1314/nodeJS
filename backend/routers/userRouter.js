const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
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
  
  router.post(`/register`, async (req, res) => {
    let user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, 10);
    const {email, phone} = req.body;
    try {
      if(await alreadyExists(email)){
        return res.status(400).json({
          error: 'Email already exists'
        })
      }
      if(await alreadyExistsphone(phone)){
        return res.status(400).json({
          error: 'Phone already exists'
        })
      }
      await user.save();
      console.log(user.password);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        id: user._id
        });
    } catch (err) {
      res.status(400).send(err);
    }
  })

  router.post(`/login`, async (req, res) => {
    const {email, password} = req.body;
    const secret = process.env.secret;
    try {
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
          error: 'User with this email not found'
        })
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if(!isMatch){
        return res.status(400).json({
          error: 'Invalid password'
        })
      }
      const token = jsonwebtoken.sign({userId: user.id}, secret, {expiresIn: '1h'});
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        id: user._id,
        token: token
      });
    } catch (err) {
      res.status(400).send(err);
    }
  })


  async function alreadyExists(email) {
    const userEmail = await User.findOne({email: email});
    if(userEmail){
      return true;
    }
    return false;
  }

  async function alreadyExistsphone(phone) {
    const userPhone = await User.findOne({phone: phone});
    if(userPhone){
      return true;
    }
    return false;
  }
  module.exports = router;
  