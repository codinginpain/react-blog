const mongoose = require('mongoose');

//mongoose schema 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim:true,
        unique: 1 //1=true, 0=false
    },
    password: {
        type: String,
        minglenght: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //ex) admin, normalUser
        type: Number,
        default: 0 //0 normal user
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

//schema 작성후 모델 자체를 만들기위해 mongoose.model 사용
//param은 name of collection(User), scheam(User에 저장 될 userSchema)
const User = mongoose.model('User', userSchema);

//module export
module.exports = { User };