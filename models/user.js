const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //암호화 공식문서 참조
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})


//hash암호화를 위해 save전에 암호화실행
userSchema.pre("save", function(next) { //next 함수를 호출하면 pre함수 실행중에 바로 원래 진핼되어야 할 다음 함수로 넘어가게끔함 pre.save -> save
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else {
        next();
    }
})

//로그인시 암호 일치 비교
userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword를 다시 암호화 해야 db에있는 암호화된 password랑 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

//로그인 시 토큰 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jsonwebtoken을 이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //몽고디비에서 자동 생성해주는 _id를 의미함
    // token = user_id + "secretToekn"
    user.token = token;
    user.save(function(err, user) {
        if(err) {return cb(err)};
        cb(null, user);
    })
}

//토큰 가져오기
userSchema.statics.findByToken = function(toekn, cb) {
    var user = this;

    //token을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //decoded에 userId가 나옴 -> 토큰 생성시 userId+"secretToken"을 사용했으므로 "secretToken"을 던지면 decoded된 userId를 반환함

        //userId를 이용해서 유저를 찾은다음
        //클라이언트에서 가져온 token과 DB에 보관 된 token이 일치하는지 확인 
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    }) 
}

//schema 작성후 모델 자체를 만들기위해 mongoose.model 사용
//param은 name of collection(User), scheam(User에 저장 될 userSchema)
const User = mongoose.model('User', userSchema);

//module export
module.exports = { User };