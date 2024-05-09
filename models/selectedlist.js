
const mongoose = require('mongoose');


const selectedSchema = new mongoose.Schema({
   UserId: {
    type: String,

  },
  Username: {
    type:String, 
  
},
  selectedlist: {
    type: Array
  },
  _id:{
    type:String
  }
});

const selectedlist = mongoose.model('selectedlist', selectedSchema);

module.exports = selectedlist;
