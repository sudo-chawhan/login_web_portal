var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res, next) {
  console.log('entered this');
  addToDB(req, res);
});


async function addToDB(req, res) {
  
  console.log('inside add to DB');

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    pkey: req.body.pkey,
    creation_dt: Date.now()
  });
  console.log('before try');
  try {
    console.log(user);
    doc = await user.save();
    console.log('trying to save');
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log('error found');
    return res.status(501).json(err);
  }
}

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    console.log('entered 0');
    if (err) { return res.status(501).json(err); }
    console.log('entered 1', user);
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      console.log('entered this!', user);
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;
