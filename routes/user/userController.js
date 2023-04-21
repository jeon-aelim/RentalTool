const userService = require('./userService');
const path = require('path');
const salt = require('../../config/config.json').salt;
const hashing = require(path.join(__dirname, '../../config', 'hashing.js'));
const issueToken = require('../../jwt/jwt').sign;
const errorCode = require('../../config/errorCode');

module.exports = {
    login: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_pw, salt);

        userService.login(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    console.log(result)
                    obj['suc'] = true;
                    obj['login'] = result;
                    obj['token'] = issueToken(result);
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "login err";
                    res.send(false);
                }
            })
    },

    deleteUser: (req, res) => {
        const userId = req.params.user_id;

        userService.deleteUser(userId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['deleteUser'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "delete user err";
                }
            })
    },

    signUp: (req, res) => {
        const body = req.body;
        const userId = req.body.user_id;
        const hash = hashing.enc(body.user_pw, salt);

        userService.signUp(body, hash)
            .then(result => {
                let obj = {};
                if (result == userId) {
                    console.log(result);
                    obj['suc'] = false;
                    obj['err'] = "Is the ID that already exists.";
                    res.send(obj);
                } else if (result) {
                    console.log(result);
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "sign up error";
                    res.send(false);
                }
            })
    },

    findId : (req, res) => {
        const Email =  req.query.user_email;
        
        userService.findId(Email)
        .then((result) => {
            let obj = {}
            if (result == false) {
                obj["suc"] = false;
                obj["error"] = errorCode.E08.message;
                res.send(obj);
            } else if (result == "err"){
                obj["suc"] = false;
                obj["error"] = errorCode.E06.message;
                res.send(obj);
            } else{
                obj['suc'] = true;
                obj['result'] = result;
                res.send(obj);
            }
        })
    },


    changePw: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_pw, salt);

        userService.changePw(body, hash)
            .then(result => {
                let obj = {};
                if (result == false) {
                    obj["suc"] = false;
                    obj["error"] = errorCode.E10.message;
                    res.send(obj);
                } else if (result == "err"){
                    obj["suc"] = false;
                    obj["error"] = errorCode.E06.message;
                    res.send(obj);
                } else{
                    obj['suc'] = true;
                    res.send(obj);
                }
            })
    },

    changeInfo: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_pw, salt);

        userService.changeInfo(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['changeInfo'] = result;
                    res.send(obj);
                }
                else {
                    obj['suc'] = false;
                    obj['err'] = "change user`s information err"
                }
            })
    },

    inquireMyInfo: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.user_pw, salt);

        userService.inquireMyInfo(body, hash)
        .then(result => {
            let obj = {};
            if (result) {
                obj['suc'] = true;
                obj['inquireMyInfo'] = result;
                res.send(obj);
            }
            else {
                obj['suc'] = false;
                obj['err'] = "inquire user`s information err"
            }
        })
    }

}