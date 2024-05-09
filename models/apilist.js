
const mongoose = require('mongoose');


const selectedSchema = new mongoose.Schema({
   UserId: {
    type: String,

  },
  Username: {
    type:String, 
  
},
  apilist: {
    type: Array
  },
  id:{
    type:String
  }
});

const apilist = mongoose.model('apilist', selectedSchema);

module.exports = apilist;
