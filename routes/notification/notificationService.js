const sequelize = require("../../models").sequelize;
const moment = require("moment");
const noti = require("../../noti")
const {
  Notification,
  User,
  Board,
  Friend,
  Sequelize: { Op },
} = require("../../models");
const friend = require("../../models/friend");
// sequelize.query("SET NAMES UTF8");
require("moment-timezone");

module.exports = {
  makeNotification: (body) => {


    console.log(body)
    console.log("body")

    if(body.board_id !=undefined){
      return new Promise((resolve)=>{
        Board.findOne({where:{board_id:body.board_id}}).then((result)=>{
       
          const date = moment().format("YYYY-MM-DD HH:mm:ss Z");

          Notification.create({
            notification_content: body.notification_content,
            notification_title: body.notification_title,
            notification_date: date,
            user_id: result.user_id,
            board_id: result.board_id,
            notification_confirm_check:0,
          })
            .then((results) => {
             const topic= result.user_id.replace('@', '.at.')
              noti.sendNotification(topic, body.notification_title,body.notification_content)
              resolve(true)
            })
            .catch((err) => {
              console.log(err);
              resolve(false);
            });
        }) .catch((err) => {
          console.log(err);
          resolve(false);
        });
      })
    }else if(body.friend_id !=undefined){
      const date = moment().format("YYYY-MM-DD HH:mm:ss Z");

      Notification.create({
        notification_content: body.notification_content,
        notification_title: body.notification_title,
        notification_date: date,
        user_id: body.user_id,
        friend_id: body.friend_id,
        notification_confirm_check:0
      }).then((result)=>{
        const topic= result.user_id.replace('@', '.at.')
        noti.sendNotification(topic, body.notification_title,body.notification_content)
        resolve(true)
      })
    }else{
      noti.sendNotification(topic, body.notification_title,body.notification_content)

    }
    
  },
  getNotification:(page, pageLimit,userId)=>{
    let limit = parseInt(pageLimit);
    let offset = 0;
    if (page > 1) {
      offset = limit * (page - 1);
    }
return new Promise((resolve)=>{
  Notification.findAll({
    offset: offset,
        limit: limit,
    where:{user_id:userId},
    include:[{model:Friend,separate:true},],
    order:[["notification_date","DESC"]]
  }).then((result)=>{
    console.log(result)
    Notification.update({notification_confirm_check: true},{where:{user_id:userId}})
    
    result != null ? resolve(result) : resolve(false);

  }).catch((err)=>{
    console.log(err);
resolve("err")
  })
})
  },
  notReadNotification:(userId)=>{
    return new Promise((resolve)=>{
      Notification.findAll({
        where:{user_id:userId,notification_confirm_check: false},
        order:[["notification_date","DESC"]]
      }).then((result)=>{
        result != null ? resolve(result.length) : resolve(false);
    
      }).catch((err)=>{
        console.log(err);
    resolve("err")
      })
    })
      },

  remakenotification: (body) => {
    return new Promise((resolve) => {
      notification.update(
        {
          notification_content: body.notification_content,
          notification_date: date,
          notification_state: "수정",
        },
        {
          where: {
            notification_id: body.notification_id,
          },
        }
      )
        .then((result) => {
          console.log(result);
          result == 1 ? resolve(true) : resolve(false);
          console.log(body);
        })
        .catch((err) => {
          logger.error("에러");
          console.log(err);
        });
    });
  },

  deletenotification: (del) => {
    return new Promise((resolve) => {
      notification.findOne({
        where: {
          notification_id: del,
        },
        include: [
          {
            model: Board,
        
          },

    
        ],

      })
        .then((result) => {
          
       notification.destroy({where:{notification_id:del}})
          Board.increment({board_notification_count:-1,board_score:-6},{where:{board_id:result.board_id}})

          result !== null ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve("err")
        });
    });
  },
};
