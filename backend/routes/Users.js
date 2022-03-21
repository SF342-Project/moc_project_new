const router = require('express').Router();
const User = require('../models/Users');

router.get('/:id', async (req, res) => {
  console.log( req.params.id)
  var users = await User.find({_id: req.params.id}, {_id: 0,date: 0,__v: 0});
  res.send({success: true ,user: users});
});

module.exports = router;
