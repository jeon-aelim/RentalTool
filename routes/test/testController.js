const errorCode = require('../../config/errorCode');
const testService = require('./testService');

module.exports = {
    checkTool: (req, res) => {
        const toolId = req.params.tool_id;

        if (toolId[0] === "0") {
            toolId = "2" + toolId;
        }

        testService.checkTool(toolId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj["suc"] = true;
                    obj["result"] = result
                    res.send(obj);
                } else {
                    obj["suc"] = false;
                    res.send(false);
                }
            })
    },

    rentalTool: (req, res) => {
        const body = req.body;

        testService.rentalTool(body)
            .then(result => {
                let obj = {};

                if (result) {
                    obj["suc"] = true;
                    obj["result"] = result
                    res.send(obj);
                } else {
                    obj["suc"] = false;
                    res.send(false);
                }
            })
    },

    token: (req, res) => {
        const userId = req.params.user_id;
        const license = req.user_license;
        let obj = {};
        
        if(req.user_id != userId){
            obj["suc"] = false;
            obj['code'] = "wrong request";
            res.send(obj)

        }
        else if (license == 3) {
            testService.token(userId)
                .then(result => {
                    if (result) {
                        obj["suc"] = true;
                        obj["result"] = result;
                        obj["license"] = "this user has authority of student"
                        res.send(obj);
                    } else {
                        obj["suc"] = false;
                        res.send(obj);
                    }
                })
        } else if (license == 2) {
            testService.token(userId)
                .then(result => {
                    if (result) {
                        obj["suc"] = true;
                        obj["result"] = result;
                        obj["license"] = "this user has authority of professor(or assistant)"
                        res.send(obj);
                    } else {
                        obj["suc"] = false;
                        res.send(obj);
                    }
                })
        } else if (license == 1) {
            testService.token(userId)
                .then(result => {
                    if (result) {
                        obj["suc"] = true;
                        obj["result"] = result;
                        obj["license"] = "this user has authority of master)"
                        res.send(obj);
                    } else {
                        obj["suc"] = false;
                        res.send(obj);
                    }
                })
        } else {
            obj["suc"] = false;
            obj['code'] = errorCode.E04.message
            res.send(obj)
        }
    }
}