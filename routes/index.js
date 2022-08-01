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




module.exports = router;
