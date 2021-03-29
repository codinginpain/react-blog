const { User } = require('../models/User');

let auth = (req, res) => {
    //인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다. (cookiePaser 이용)
    let token = req.cookieParser.x_auth;

    //토큰을 복호화 한 후 유저를 찾는다.
    //유저가 있으면 인증 OK
    //유저가 없으면 인증 No
    User.findByToken(toekn, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true});

        req.token = token; //req에 넣어 주는 이유는 auth호출 된곳에서 req에 담긴 user와 token을 바로 쓸 수 있게 만들어주기 위함
        req.user = user;
        next();
    });
    
} 

module.export = { auth };