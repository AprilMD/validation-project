var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html');
});

/* GET html template page. */
router.get('/html', function(req, res) {
  res.render('html-view.html');
});

/* GET nunjuck template page. */
router.get('/nunjuck', function(req, res) { 
  res.render('nunjuck-view.html');
});

router.get('/spacecats', function(req, res) {
  res.render('nunjuck-view.html');
});

router.get('/what-is-your-name', function(req, res) {
  res.render('what-is-your-name.html');
});

/* GET nunjuck GOVUK page. */
router.get('/what-is-your-name', function(req, res) {
  res.render('what-is-your-name.html');
});

/* POST nunjuck GOVUK page. */
router.post('/what-is-your-name', function(req, res) {

  var firstNameIsMissing = req.body["first-name"].length == 0;
  var surnameIsMissing = req.body["surname"].length == 0;

  if(firstNameIsMissing || surnameIsMissing) {
    res.render("what-is-your-name.html", {
      firstNameIsMissing: firstNameIsMissing,
      surnameIsMissing: surnameIsMissing
    });
  } else {
    res.redirect('/what-is-your-postcode');
  }
});

router.get('/what-is-your-postcode', function(req, res) {
  res.render('what-is-your-postcode.html');
});

router.get('/check-answers', function(req, res) {
  res.render('check-answers.njk');
});



module.exports = router;
