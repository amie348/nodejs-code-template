const mongoose = require(`mongoose`);

const { addressSchema } = require(`./schemas/address.schema`)

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    uppercase: true
  },
  lastName: {
    type: String,
    uppercase: true
  },
  gender: {
    type: String,
    uppercase: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: addressSchema
  }

}, {
  _id: true,
  timeStamp: true
});

module.exports = mongoose.model(`dummyUser`, userSchema);