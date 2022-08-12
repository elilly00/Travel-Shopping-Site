const mongoose = require("mongoose");  // 몽구스 불러옴
const bcrypt = require("bcrypt"); // bcrypt 불러옴
const saltRounds = 10; // slat 값이 몇자리인지 나타냄
const jwt = require("jsonwebtoken"); // jsonwebtoken 라이브러리 불러옴

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
      },
      email: {
        type: String,
        trim: true, // 띄어쓰기 제거
        unique: 1,  // 같은 이메일 사용 X
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: { //유저의 lastname
        type: String,
        maxlength: 50,
      }, 
      role: {
        type: Number, // 0: 일반사용자, 1: 관리자
        default: 0,
    },
    Image: String,
    token: {    // token을 이용해 유효성 관리
        type: String,
    },
    tokenExp: { // token 사용기한 설정
        type: Number,
    }
});

// user 정보를 저장하기전에 
userSchema.pre("save", function(next) {
    let user = this;

    if(user.isModified("password")) { // 비밀번호를 바꿀 때만
        // 비밀번호 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;  
                // user.password : plainPassWord
                // hash : 암호화된 비밀번호
                next(); // 전저리가 끝난 후 후작업하기 위해 넘겨준다.
            });
        });
    } else { // 비밀번호가 아닌 다른 데이터를 변경한다면 바로 넘겨준다.
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) { // (plainPassWord, callback)
    // plainPassword: 1234567 / 암호화된 password: $2b$Z..
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err), // 비밀번호가 일치하지 않아 에러가 발생하면 callback도 에러가 뜸
        cb(null, isMatch); //  비밀번호가 일치한다면 에러엔 null, isMatch는 true
    });
};

userSchema.methods.generateToken = function(cb) {
    let user = this;

    // jsonwebtoken을 이용해 token 생성
    let token = jwt.sign(user._id.toHexString(), "secretToken");

    user.token = token;
    user.save(function(err, user) {
      if(err) return cb(err);
        cb(null, user);
    });
  };

userSchema.statics.findByToken = function(token, cb) {
    let user = this;
    
    // user._id + " " = token => secretToken
    // token을 decode함
    jwt.verify(token, "secretToken", function(err, decode) {
        // user id를 이용해 user를 찾은 후
        // client에서 가져온 token과 DB에 보관된 token이 일치하는지 확인함
        user.findOne({"_id": decode, "token": token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model("User", userSchema);  // 해당 스키마를 Model로 감싸줌

module.exports = { User }; // 다른 곳에서도 사용할 수 있도록 함