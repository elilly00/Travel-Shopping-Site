const express = require("express");  // 다운받은 모듈 불러옴
const app = express();   // function을 이용해 새로운 express app 생성
const config = require("./config/key");  // config.js를 가져옴

const bodyParser = require("body-parser"); // body-parser을 가져옴
const cookieParser = require("cookie-parser"); // cookie-parser을 가져옴

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");  // User Model을 가져옴

// 'application/x-www-from-urlencoded'로 된 데이터를 분석해 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));

// 'application/json'로 된 데이터를 분석해 json형식으로 parsing해 가져올 수 있게 함
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI) // MongoDB 연결
  .then(() => console.log("MongoDB Connected..."))  // 연결 성공 시 출력
  .catch((err) => console.log(err));  // 에러 발생 시 출력

  // root directory에 오면 다음과 같은 문자가 출력됨
  app.get("/", (req, res) => {
    res.send('Hello World!!!');
  });

  app.get("/api/hello", (req, res) => {
    res.send("요청 테스트");
  });
  
// Register Route
app.post("/api/users/register", (req, res) => {
  
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다

  const user = new User(req.body); // request.body(json형식의 파일)로 client에서 보내는 정보를 받아준다.

  user.save((err, userInfo) => { // 'save()' : mongoDB에서 오는 정보 method(client에서 보낸 정보들이 user model에 저장됨)
    if(err) return res.json({ success: false, err });
		// 성공 시 status(200) (json형식으로 정보 전달함) 
    return res.status(200).json({  
      success: true,
    });
  });
});

// Login Route
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일이 DB에서 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) { // 유저가 없다면
      return res.json({
        loginSucess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    // 2. 요청된 이메일이 DB에 있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => { // comparePassword 메소드 생성 (User.js에서 생성함)
      if(!isMatch) 
        return res.json({ 
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다." 
        });
      });
      // 3. 비밀번호가 일치하다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
    
        // token을 저장한다. 어디에? 쿠키, 로컬스토리지 등
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
    });
  });
});

app.get("/api/users/auth", auth, (req,res) => {
  // index.js까지 미들웨어를 통과해 왔다는 것은 Authentication이 True라는 의미
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

// logout route
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    });
});

const port = 5000;       // port는 아무거나 설정해도 됨

// 5000번 port에서 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
