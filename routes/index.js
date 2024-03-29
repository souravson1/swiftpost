var express = require('express');
var router = express.Router();

const userModel = require('../models/UserModel');
const postModel = require('../models/PostModel');
const upload = require('./multer.js');
const passport = require('passport');
const localStrategy = require('passport-local');


passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render('index', { footer: true, user: user });

});
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.post('/register', function (req, res, next) {
  const userData = new userModel({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone
  });
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      })
    })
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function (req, res, next) {

});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/login')
  })
})

router.post('/post', upload.single('image'), async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    picture: req.file.filename,
    user: user._id,
    caption: req.body.caption,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}

module.exports = router;
