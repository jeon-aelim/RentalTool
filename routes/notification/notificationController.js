const notificationService = require('./notificationService');
const errorCode = require('../../errorCode')
module.exports = {
  makeNotification: (req, res) => {
       const body = req.body;   
        notificationService.makeNotification(body).then(result => {
            let obj = {};
        if (result == false) {
          obj["suc"] = false;
          obj["result"] = errorCode.E18.message;
          obj["code"] = "E18";

          res.send(obj);
        } else if (result == "err") {
          obj["suc"] = false;
          obj["result"] = errorCode.E05.message;
          obj["code"] = "E05";
          res.send(obj);
        } else {
          
          obj["suc"] = true;
          obj["result"] = result;
          res.send(obj);
        }
        })
    },
    getNotification: (req, res) => {
      const userId = req.params.user_id;   
     
      const page = req.params.page;
      const pageLimit = req.params.pageLimit;
       notificationService.getNotification(page, pageLimit,userId).then(result => {
           let obj = {};
       if (result == false) {
         obj["suc"] = false;
         obj["result"] = errorCode.E37.message;
         obj["code"] = "E37";

         res.send(obj);
       } else if (result == "err") {
         obj["suc"] = false;
         obj["result"] = errorCode.E05.message;
         obj["code"] = "E05";
         res.send(obj);
       } else {
         
         obj["suc"] = true;
         obj["result"] = result;
         res.send(obj);
       }
       })
   },notReadNotification: (req, res) => {
    const userId = req.params.user_id;   

     notificationService.notReadNotification(userId).then(result => {
         let obj = {};
     if (result == false) {
       obj["suc"] = false;
       obj["result"] = errorCode.E38.message;
       obj["code"] = "E38";

       res.send(obj);
     } else if (result == "err") {
       obj["suc"] = false;
       obj["result"] = errorCode.E05.message;
       obj["code"] = "E05";
       res.send(obj);
     } else {
       
       obj["suc"] = true;
       obj["result"] = result;
       res.send(obj);
     }
     })
 },
    // getLast:(req,res)=>{
    //     const userId = req.params.user_id;
    //     lastService.getLast(userId).then(result=>{
    //         res.send(result);
    //     })

    // }
}