const mongoose = require('mongoose')

const userSceham = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
        min:8
    },
    isAvatarImageSet : {
        type:Boolean,
        default:false
    },
    avatarImage : {
        type:String,
        default:""
    }
})

module.exports = mongoose.model("User", userSceham);