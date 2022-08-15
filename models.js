var mongoose = require('mongoose');

var UserDataSchema = new mongoose.Schema({
    name: {
        'first-name': String,
        'middle-name': String,
        'surname': String
    },
    address: {
        'address': String,
        'postcode': String
    },
    photo_id: {
        'photo-id-type': String,
        'photo-ID': String,
        'expiration-date': String
    }
})

var userData = mongoose.model("userData", UserDataSchema);

module.exports = userData;