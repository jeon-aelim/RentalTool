const schedule = require("node-schedule");
const moment = require("moment");
const noti = require("./noti")
const notiCode = require("./notiCode")
const mail = require('./middleware/mail');

const {
  Sequelize: { Op },
  Rental,
  User,
} = require("./models");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

//하루에 한번 모든 렌탈의 남은기간을 체크
// 반납 하루 남은 렌탈의 대여자에게 알림 보내기
// 당일 반납자에게 알림 보내기
//TODO:
const rentalNotiSend = () => {
  const j1 = schedule.scheduleJob({ hour: 23, minute: 35 }, () => {
    const date = moment().format("YYYY-MM-DD");
    console.log(date)
    Rental.findAll({
      where: {
        rental_due_date: date,
        rental_state: "대여",
      },
      include:[{
        model: User,
        attributes: ["user_email"],
      }]
    }).then((result) => {
      console.log(result)
      result.forEach((element) => {
        const topic = element.user.user_email.replace("@", ".at.");
        console.log(topic)
        noti.sendNotification(topic, notiCode.N01.title, notiCode.N01.content);

        console.log(element);

        mail.sendEmail(element.user.user_email, element.rental_due_date, "noti")
      });
    });
  });


};

module.exports = {
  rentalNotiSend,
};
