const express = require('express');
const router = express.Router();
const notificationController = require('./notificationController');
//댓글 쓰기
router.post('/makeNotification', notificationController.makeNotification);

//댓글 수정
router.get('/getNotification/:page/:pageLimit/:user_id', notificationController.getNotification);

router.get('/getNotification/:user_id', notificationController.notReadNotification);

// router.post('/remakenotification', /*authUtil,*/notificationController.remakenotification);
TODO:
 //댓글 삭제
//  router.get('/deletenotification/:notification_id', /*authUtil,*/notificationController.deletenotification);

module.exports = router;
