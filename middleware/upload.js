const multer = require("multer");

const moment = require("moment");

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 서버에 저장될 위치
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    // 서버에 저장될 때 파일 이름
    cb(null, `${req.body.tool_id}-rentaltool-${file.originalname}`);
  }
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
  // 프론트에서 넘겨울 params key 값, 오른쪽 같이 넘겨줘야함-> {photo: binary}
  "img_url"
);

module.exports = uploadFile;