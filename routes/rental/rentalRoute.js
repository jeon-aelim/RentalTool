const express = require('express');
const router = express.Router();
const rentalController = require('./rentalController');
const authUtil = require('../../middleware/authorization').checkToken;

// 기자재 대여
router.post('/rentalTool', /*authUtil,*/ rentalController.rentalTool);
// 기자재 반납
router.post('/returnTool', /*authUtil,*/  rentalController.returnTool);
// 기자재 연장
router.post('/extension', /*authUtil,*/  rentalController.extension);
//내 대여중인 기자재 조회
router.get('/myCurrentRentalList/:user_id/:page', rentalController.myCurrentRentalList);
// 내 역대 대여목록 조회
router.get('/myAllRentalList/:user_id/:page', rentalController.myAllRentalList);
// 장기 미반납 기자재 조회
// router.get('/notReturned/:department_id')
module.exports = router;