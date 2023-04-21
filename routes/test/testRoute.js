const express = require('express');
const router = express.Router();
const testController = require('./testController');
const authUtil = require('../../middleware/authorization').checkToken;

router.get('/checkTool/:tool_id', testController.checkTool);
router.get('/rentalTool', testController.rentalTool);


router.get('/token/:user_id', authUtil, testController.token); 


module.exports = router;