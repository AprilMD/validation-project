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
    }
})

var userData = mongoose.model("userData", UserDataSchema);

module.exports = userData;