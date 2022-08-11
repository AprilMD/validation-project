var express = require('express');
const fetch = require('node-fetch');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html');
});

/* GET nunjuck GOVUK page. */
router.get('/what-is-your-name', function(req, res) {
  res.render('what-is-your-name.njk');
});

/* POST nunjuck GOVUK page. */
router.post('/what-is-your-name', function(req, res) {

  var firstNameIsMissing = req.body["first-name"].length == 0;
  var surnameIsMissing = req.body["surname"].length == 0;

  if(firstNameIsMissing || surnameIsMissing) {
    res.render("what-is-your-name.njk", {
      firstNameIsMissing: firstNameIsMissing,
      surnameIsMissing: surnameIsMissing
    });
  } else {
    res.redirect('/what-is-your-postcode');
  }
});

router.get('/what-is-your-postcode', function(req, res) {
  res.render('what-is-your-postcode.njk');
});

router.post('/what-is-your-postcode', function(req, res) {
  const postcodeIsMissing = req.body['postcode'].length === 0;
  const postCode = req.body['postcode'];
  
  if (postcodeIsMissing) {
    res.render('what-is-your-postcode.njk', {
      postcodeIsMissing
    });
  } else {
    fetch(`https://api.getaddress.io/find/${postCode}?api-key=pww_urTjWEWGwnhLm8P4mQ36214`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const newArray = [];
        for (address of json.addresses) {
          const addressObj = {
            "value": address,
            "text": address
          };
          newArray.push(addressObj);
        }
        console.log(newArray);
        req.session.data['addresses'] = newArray;
        res.redirect('/address-look-up');
    })
  });
  
router.get('/address-look-up', function(req, res) {
  res.render('address-look-up.njk', {
    addresses: req.session.data['addresses']
  });
});

router.get('/how-to-upload', function(req, res) {
  res.render('how-to-upload.njk');
});

router.get('/check-answers', function(req, res) {
  res.render('check-answers.njk');
});


module.exports = router;
