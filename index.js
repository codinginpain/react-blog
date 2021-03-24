//after express install
const express = require('express');
const app = express();
//after mongoose install
const mongoose = require("mongoose");
//after body-parser & cookieparser install
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

mongoose.connect('mongodb+srv://kee:blog123@react-blog-clone.asf65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true}).then(() => console.log('mongoDB connected'))
                            .catch(err => {console.error(err)});

app.use(bodyPaser.urlencoded({ extended : true })); //queryString 사용을 위해
app.use(bodyPaser.json()); // json
app.use(cookieParser()); // cookie

app.get('/', (req, res)=> {
    res.send("Hello World");
});



// node standard port = 5000
app.listen(5000);