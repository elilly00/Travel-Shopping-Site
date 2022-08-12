const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 1. client의 cookie에서 token을 가져옴 (cookieparser 이용)
    let token = req.cookies.x_auth;
    
    // 2. token을 복호화 한 후 user를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next(); // 미들웨어의 역할이 끝나면 다음 단계로 넘어갈 수 있도록 next()를 넣어준다.
    });

    // 3. user가 있으면 인증 Okay
    // 4. user가 없으면 인증 No
};  

module.exports = { auth }; 