const mongoose  = require('mongoose');

const udschema    = new mongoose.Schema({
    name :{
        type : String 
    },
    dept :{
        type :String
    },
    password :{
        type :String
    },
    date :{
        type : Date ,
        default : Date.now 
    }
}
)

module.exports = mongoose.model('Ud',udschema);