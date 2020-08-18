const mongoose  = require('mongoose');

const requestschema    = new mongoose.Schema({
    created_by :{
        type : String ,
        max:255
    },
    to_dept :{
        type :String,
        max : 255
    },
    to_user :{
        type :String,
        max : 255
    },
    date :{
        type : String,
        max :100
    },
    message :{
        type :String,
        max : 255
    },
    status:{
        type :String,
        max:255
    }
}
)


module.exports = mongoose.model('request',requestschema);