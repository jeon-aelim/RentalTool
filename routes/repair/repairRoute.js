const express = require('express');
const router = express.Router();
const repairController = require('./repairController');
// 수리 요청
router.post('/requestRepair', repairController.requestRepair);

module.exports = router;