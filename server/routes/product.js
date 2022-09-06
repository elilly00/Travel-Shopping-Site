const express = require('express');
const router = express.Router();
const multer = require('multer');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    // 파일 저장 위치
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    // 파일 이름 설정
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
const upload = multer({ storage: storage });

router.post('/image', (req, res) => {

    // 프론트에서 가져온 이미지 저장
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err });
        }
        return res.json({ 
            success: true, 
            filePath: res.req.file.path, 
            fileName: res.req.file.filename 
        });
    });
});
module.exports = router;
