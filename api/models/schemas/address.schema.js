// importing required packages & modules
const mongoose = require(`mongoose`);



// defining Address Schema
const addressSchema = new mongoose.Schema({

  unitNo: {
    type: String,
    trim: true,
    uppercase: true
  },
  street: {
    type: String,
    trim: true,
    uppercase: true
  },
  city: {
    type: String,
    trim: true,
    uppercase: true
  },
  zip: [String],
  state: {
    type: String,
    trim: true,
    uppercase: true
  }

}, {

  _id: false

});



// exporting schema as module
module.exports = {

  addressSchema

};