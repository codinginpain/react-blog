//after express install
const express = require('express');
const app = express();
//after mongoose install
const mongoose = require("mongoose");
//after body-parser & cookieparser install
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require('./config/key'); //config 폴더 추가후 사용
const { auth } = require("./middleware/auth");

//mongodb의 데이터와 api register비교를 위해
const { User } = require('./models/User');

mongoose.connect(config.mongoURI,
    {useNewUrlParser: true}).then(() => console.log('mongoDB connected'))
                            .catch(err => {console.error(err)});


app.use(bodyParser.urlencoded({ extended : true })); //queryString 사용을 위해 extended ture를 해서 duplication 알림을 안뜨게함
app.use(bodyParser.json()); // json
app.use(cookieParser()); // cookie

app.get("/", (req, res) => {
    res.json({"hello~" : "Hi World!!!"});
})

//register를 위한 routing
app.post("/api/users/register", (req, res) => {
    const user = new User(req.body); //위에서 import한 {User} 몽고디비에 BodyPaser를 이용한 req.body를 전송

    //아래 save 실행되기전에 pre("save")를 user에 정의해놓았음(패스워드 암호화)
    user.save((err, doc) => { //mongodbd에 저장 후 err와 userData 리턴 받음
        if(err) {
            return res.json ({ success: false, err}) //에러 있으면   
        }
        return res.status(200).json({
            success: true,
            userData: doc
        });
    }); 
})


app.post("/api/users/login", (req, res) => {
    //요청 된 이메일을 데이터베이스에서 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 하는 유저는 등록되어 있지 않습니다."
            })
        }

        //요청 된 이메일의 비밀번호가 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSucess: false, message: "wrong password!"});


            //비밀번호가 일치한다면 유저를 위한 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                //token을 저장한다. 어디에? 쿠키, 로컬스토리지 등
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
            });
        })
    })
})

//auth function 

app.get('/api/users/auth', auth, (req, res) => { //middleware auth추가 route를 타면 callback을 싱해하기전에 auth middleware를 먼저 실행함
    //여기 들어왔단 말은 middleware를 통과 했다는 뜻 -> Authentication이 true라는 뜻
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user.id}, {token: ""}, (err, user) => {
        if(err) return res.json({sucess: false, err});
        return res.status(200).send({sucess: true});
    })
})


// node standard port = 5000
app.listen(5000);