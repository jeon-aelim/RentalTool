const jwt = require("../jwt/jwt");
const errorCode = require("../config/errorCode");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
// const MASTER_IDX = require("../config/config.json").master_idx;

// check user's authority by verifying Token
const verifyToken = {

    // // check token to confirm next route
    // checkToken: async (req, res, next) => {

    //     var token = req.headers.token;
    //     console.log("token " + token);

    //     // if token does not exist, return 400 error(message: "not have token")
    //     if (!token) {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E01",
    //             message: errorCode.E01.message,
    //         });
    //     } else { // if token is exist

    //         const user = await jwt.verify(token); // verify token
    //         console.log(user.user_id);                // check user's id

    //         // if token is expired, return 400 error(message: "expired token")
    //         if (user === TOKEN_EXPIRED) {
    //             return res.status(400).json({
    //                 result: false,
    //                 code: "E02",
    //                 message: errorCode.E02.message,
    //             });
    //         }

    //         // if token is invaild, return 400 error(message: "invalid token")
    //         else if (user === TOKEN_INVALID) {
    //             return res.status(400).json({
    //                 result: false,
    //                 code: "E03",
    //                 message: errorCode.E03.message,
    //             });
    //         }

    //         // if user's id in payload is not exist, return 400 error(message: "invalid token")
    //         else if (user.user_id === undefined) {
    //             return res.status(400).json({
    //                 result: false,
    //                 code: "E03",
    //                 message: errorCode.E03.message,
    //             });
    //         }

    //         // if token is vaild
    //         else {
    //             req.user_id = user.user_id; // to pass user_id to next function
    //             next();
    //         }

    //     }
    // },

    // master: 1, manager:2, user: 3
    // return users license by vertifying TOKEN`
    checkToken: async (req, res, next) => {

        var token = req.headers.token;
        console.log("token " + token);

        // if token does not exist, return 400 error(message: "not have token")
        if (!token) {
            return res.status(400).json({
                result: false,
                code: "E01",
                message: errorCode.E01.message,
            });
        }
        // if token is exist
        else {

            const user = await jwt.verify(token);     // verify token
            console.log("success verify token of "+ user.user_id);                // check user's id

            // if token is expired, return 400 error(message: "expired token")
            if (user === TOKEN_EXPIRED) {
                return res.status(400).json({
                    result: false,
                    code: "E02",
                    message: errorCode.E02.message,
                });
            }

            // if token is invaild, return 400 error(message: "invalid token")
            else if (user === TOKEN_INVALID) {
                return res.status(400).json({
                    result: false,
                    code: "E03",
                    message: errorCode.E03.message,
                });
            }

            // if user's id in payload is not exist, return 400 error(message: "invalid token")
            else if (user.user_id === undefined) {
                return res.status(400).json({
                    result: false,
                    code: "E03",
                    message: errorCode.E03.message,
                });
            }

            // if token is vaild, return next
            else {
                req.user_id = user.user_id;           // to pass user_id to next function
                req.user_license = user.user_license; // to pass user_license to next function
                next();
            }

        }
    },

    // checkMaster: async (req, res, next) => {
    //     var token = req.headers.token;

    //     // if token does not exist, return 400 error(message: "not have token")
    //     if (!token) {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E01",
    //             message: errorCode.E01.message,
    //         });
    //     }
    //     const user = await jwt.verify(token);

    //     console.log(user);
    //     if (user.user_license == 3) {
    //         next();
    //     } else {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E04",
    //             message: errorCode.E04.message,
    //         });
    //     }
    // },

    // checkManagerToken: async (req, res, next) => {

    //     // if token does not exist, return 400 error(message: "not have token")
    //     if (!token) {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E01",
    //             message: errorCode.E01.message,
    //         });
    //     }
    //     const user = await jwt.verify(token);

    //     console.log(user.user_license);
    //     if (user.user_license <= 2) {
    //         req.user_license = user.user_license

    //         next();
    //     } else {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E04",
    //             message: errorCode.E04.message,
    //         });
    //     }
    // },

    // checkUserToken: async (req, res, next) => {

    //     var token = req.headers.token;
    //     console.log("token " + token);

    //     // if token does not exist, return 400 error(message: "not have token")
    //     if (!token) {
    //         return res.status(400).json({
    //             result: false,
    //             code: "E01",
    //             message: errorCode.E01.message,
    //         });
    //     } else { // if token is exist

    //         const user = await jwt.verify(token);     // verify token
    //         console.log(user.user_id);                // check user's id

    //         if (0 < user.user_license <= 3) {
    //             next();
    //         } else {
    //             return res.status(400).json({
    //                 result: false,
    //                 code: "E03",
    //                 message: errorCode.E03.message,
    //             });
    //         }
    //     }
    // }
};
module.exports = verifyToken;
