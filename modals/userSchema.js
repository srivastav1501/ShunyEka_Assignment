const mongoose = require('mongoose');
const validator = require('validator');


const userSchema= new mongoose.Schema({
    name:{
        type:String, 
        required : true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not valid email address')
            }
        }
    },
    mobile:{
        type:String, 
        required : true,
        unique: true,
        maxLength:10
    },
})

const Users = new mongoose.model('users',userSchema);

module.exports = Users;