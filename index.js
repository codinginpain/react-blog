//after express install
const express = require('express');
const app = express();
//after mongoose install
const mongoose = require("mongoose");
//after body-parser & cookieparser install
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require('./config/key'); //config 폴더 추가후 사용

//mongodb의 데이터와 api register비교를 위해
const { User } = require('./models/user');

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
    const user = new User(req.boidy); //위에서 import한 {User} 몽고디비에 BodyPaser를 이용한 req.body를 전송
    user.save((err, doc) => { //mongodbd에 저장 후 err와 userData 리턴 받음
        if(err) return res.json ({ success: false, err}) //에러 있으면
        res.status(200).json({
            success: true,
            userData: doc
        });
    }); 
})



// node standard port = 5000
app.listen(5000);