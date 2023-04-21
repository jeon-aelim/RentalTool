const sequelize = require("./models").sequelize;
const methodOverride = require("method-override");
const express = require("express");
const router = require("./routes");
const http = require("http");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const admin = require("firebase-admin"); 
const rentalCheck = require("./rentalCheck");

const serviceAccount = require("./config/rental-tool-2d7b4-firebase-adminsdk-u9z91-c8bfc7a7e0.json"); 
admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount), 
});
sequelize.sync();

rentalCheck.rentalNotiSend()

app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token"
    );
    next();
});

const whitelist = [process.env.FRONTEND_SERVER_ORIGIN];
const corsOptions = {
    credentials: false,
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    },

    optionsSuccessStatus: 200
}

sequelize.sync();
app.use("/", router);

app.use(cors(corsOptions));


const mail = require('./middleware/mail');
const generateRandom = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}
app.get('/authEmail', (req, res) => {
    const email = req.body.user_email; // 이메일 받기
    const code = generateRandom(111111, 999999); // 랜덤함수 생성
    
    let obj = {};
    
    // mjc 메일이 아닐 경우, 메일을 송신하지 않음.
    if(email.indexOf("@mjc.ac.kr") === -1){
        obj['suc'] = false;
        obj['err'] = "해당 학교의 메일이 아닙니다. ";
        console.log("해당 학교의 메일이 아닙니다. ");
        res.send(obj);
    }

    // 입력받은 email에 code를 보냄.
    mail.sendEmail(email, code, "auth")
    .then((result) => {

        if(result == true){ // 이메일 송신 성공.
            let obj = {};
            obj["suc"] = true;
            obj["code"] = code; // 프론트엔드에 code를 보냄
            res.send(obj);
        }else{ // 이메일 송신 실패.
            res.send("정확한 이메일을 작성해주세요");
        }

    })

})

http.createServer(app).listen(5080, () => {
    console.log("Express Server Start");
});