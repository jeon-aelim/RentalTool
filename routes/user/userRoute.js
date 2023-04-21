const express = require('express');
const router = express.Router();
const userController = require('./userController');

//로그인
router.post('/login', userController.login);
//회원가입
router.post('/signUp', userController.signUp);
//회원 탈퇴
router.get('/deleteUser/:user_id', userController.deleteUser);
// 아이디 찾기
router.get('/findId', userController.findId);
//비밀번호 변경
router.post('/changePw', userController.changePw);
//개인정보 수정
router.post('/changeInfo', userController.changeInfo);
//개인정보 조회
router.post('/inquireMyInfo', userController.inquireMyInfo);

module.exports = router;
