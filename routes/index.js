var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET html template page. */
router.get('/html', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.redirect('html-view.html'); 
  res.render('html-view.html');
});

/* GET nunjuck template page. */
router.get('/nunjuck', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.redirect('html-view.html'); 
  res.render('nunjuck-view.html');
});

router.get('/spacecats', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.redirect('html-view.html'); 
  res.render('nunjuck-view.html');
});

router.get('/what-is-your-name', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.redirect('html-view.html'); 
  res.render('what-is-your-name.html');
});

/* GET nunjuck GOVUK page. */
router.get('/what-is-your-name', function(req, res, next) {
  res.render('what-is-your-name.html');
});

/* POST nunjuck GOVUK page. */
router.post('/what-is-your-name', function(req, res, next) {
  var firstNameIsMissing = req.body["first-name"].length == 0;
  var surnameIsMissing = req.body["surname"].length == 0;
  if(firstNameIsMissing || surnameIsMissing) {
    res.render("what-is-your-name.html", {
      firstNameIsMissing: firstNameIsMissing,
      surnameIsMissing: surnameIsMissing
    });
  } else {
    res.render('what-is-your-postcode.html');
  }
});



module.exports = router;
