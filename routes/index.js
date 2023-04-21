const express = require('express');
const router = express.Router();

const userRoute = require('./user/userRoute');
const toolRoute = require('./tool/toolRoute');
const rentalRoute = require('./rental/rentalRoute');
// const repairRoute = require('./repair/repairRoute');
// const universityRoute = require('./university/universityRoute');
// const departmentRoute = require('./department/departmentRoute');
const testRoute = require('./test/testRoute');

router.use('/user', userRoute);
router.use('/tool', toolRoute);
router.use('./rental', rentalRoute);
// router.use('./repair', repairRoute);
// router.use('./university', universityRoute);
// router.use('./department', departmentRoute);
router.use('/test', testRoute);


module.exports = router;