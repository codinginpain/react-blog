
여기는 몽구스까지 연결을 마친 후에
몽고 db에 들어갈 서로다른 data type들을 명시해주는 곳.



-- 가장 초기의 user schema 모양. 
-- 추후에 passport등을 사용 할 때 여기서 더 추가 할것
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