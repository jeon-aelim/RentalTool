const repairService = require('./repairService');
const errorCode = require('../../config/errorCode');

module.exports = {
    requestRepair: (req, res) => {
        const body = req.body;

        repairService.requestRepair(body)
        .then(result => {
            let obj = {};

            if (result == false) {
              obj["suc"] = false;
              obj["error"] = errorCode.E09.message;
              res.send(obj);
            } else if (result == "err") {
              obj["suc"] = false;
              obj["error"] = errorCode.E06.message;
              res.send(obj);
            } else {
              obj['suc'] = true;
              obj['result'] = result;
              res.send(obj);
            }
          })
    }
}