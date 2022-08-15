var express = require('express');
var axios = require('axios');
var dotenv = require('dotenv').config();

var userData = require("../models")

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
    axios
    .get(`https://api.getaddress.io/find/${postCode}?api-key=${process.env.API_KEY}&sort=true`)
    .then(res => {
      const addresses = res.data.addresses;
      // console.log(addresses);
      let newArray = [];
      for (let address of addresses) {
        address = trimAddress(address);
        const addressObj = {
          "value": address,
          "text": address
        };
        newArray.push(addressObj);
      }
      // console.log(newArray);
      req.session.data['addresses'] = newArray;
    })
    .then(() => {
      res.redirect('/address-look-up')
    })
    .catch((err) => {
      console.log(err);
    });
  }
});
  
router.get('/address-look-up', function(req, res) {
  res.render('address-look-up.njk', {
    addresses: req.session.data['addresses']
  });
});

router.post('/address-look-up', function(req,res) {
  res.redirect('/how-to-upload');
})

router.get('/how-to-upload', function(req, res) {
  res.render('how-to-upload.njk');
});

router.get('/upload-photo-id', function(req, res) {
  res.render('upload-photo-id.njk');
});

router.post('/upload-photo-id', function(req, res) {
  const dateArray = [req.body['expiration-date-day'],req.body['expiration-date-month'],req.body['expiration-date-year']];
  const date = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);

  const sameDay = date.getUTCDate() - parseInt(dateArray[0]) == 0;
  const sameMonth = date.getMonth() - (parseInt(dateArray[1]) - 1) == 0;
  const sameYear = date.getFullYear() - parseInt(dateArray[2]) == 0;
  const valid = sameDay && sameMonth & sameYear ? true : false;


  if (req.body['photo-id-type'] == "") {
    res.render('upload-photo-id.njk', {
      errorIdType: true
    });
  } else if (req.body['photo-ID'] == "") {
    res.render('upload-photo-id.njk', {
      errorNoIdFile: true
    });
  } else if (dateArray.includes("")) {
    res.render('upload-photo-id.njk', {
      errorNoDate: true
    });
  } else if (!valid)  {
    res.render('upload-photo-id.njk', {
      errorInvalidDate: true
    });
  } else if (date - Date.now() < 0){
    res.render('upload-photo-id.njk', {
      errorPastDate: true
    });
  } else {
    res.redirect('/check-answers');
  }
});

router.get('/check-answers', function(req, res) {
  res.render('check-answers.njk');
});

router.post('/check-answers', async function(req,res) {
  const data = req.session.data
  const newUserData = new userData({
    name: {
      'first-name': data['first-name'],
      'middle-name': data['middle-name'],
      'surname': data['surname']
    },
    address: {
      'address': data['address-look-up'],
      'postcode': data['postcode']
    },
    photo_id: {
      'photo-id-type': data['photo-id-type'],
      'photo-ID': data['photo-ID'],
      'expiration-date': `${data['expiration-date-day']}-${data['expiration-date-month']}-${data['expiration-date-year']}`
    }
  })

  try {
    await newUserData.save();
    res.redirect('/thank-you-for-submitting');
    
  } catch (err) {
    res.status(500).send(err);
  }

})

router.get('/thank-you-for-submitting', function(req,res) {
  res.render('thank-you-for-submitting.njk');
})

module.exports = router;

function trimAddress(address){
  address = address.replace(', ,',',');
  if (!address.includes(', ,')) {
    return address;
  } else {
    return trimAddress(address);
  }
}
