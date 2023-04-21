const toolService = require('./toolService');
const fs = require('fs');
const path = require('path')
const errorCode = require('../../config/errorCode');

module.exports = {
  addTool: async (req, res) => {
    const body = req.body;
    const imgData = fs
      .readFileSync(`app${req.file.path.split("app")[1]}`)
      .toString("base64");

    console.log(imgData)
    toolService.addTool(body, imgData)
      .then(result => {
        let obj = {};
        if (result) {
          obj["suc"] = true;
          obj["result"] = result
          res.send(obj);
        } else {
          obj["suc"] = false;
          res.send(obj);
        }
      })
  },

  viewToolList: (req, res) => {
    const departmentId = req.params.department_id;
    const page = req.params.page;

    // offset: 이전 item 12개를 skip
    let offset;
    if (page > 0) {
      offset = 12 * (page - 1);
    }

    toolService.viewToolList(departmentId, offset)
      .then((result) => {
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
  },

  viewTool: (req, res) => {
    const toolId = req.params.tool_id;
    const license = req.user_license;

    if (license > 2) {
      toolService.viewTool(toolId)
        .then((result) => {
          let obj = {};

          if (result == false) {
            obj["suc"] = false;
            obj["error"] = errorCode.E07.message;
            res.send(obj);
          } else if (result == "err") {
            obj["suc"] = false;
            obj["error"] = errorCode.E06.message;
            res.send(obj);
          } else {
            obj['suc'] = true;
            obj['tool'] = result;
            res.send(obj);
          }
        })
    } else if (license > 0) {
      toolService.managerViewTool(toolId)
        .then((result) => {
          let obj = {};

          if (result == false) {
            obj["suc"] = false;
            obj["error"] = errorCode.E07.message;
            res.send(obj);
          } else if (result == "err") {
            obj["suc"] = false;
            obj["error"] = errorCode.E06.message;
            res.send(obj);
          } else {
            obj['suc'] = true;
            obj['tool'] = result[0].tool;
            obj['user'] = result[0].user.user_name;
            obj['rental_date'] = result[0].rental_date;
            obj['rental_due_date'] = result[0].rental_due_date;

            // = {
            //   rental_date: result[0].rental_date,
            //   rental_due_date: result[0].rental_due_date
            // };
            res.send(obj);
          }
        })
    } 
  },

  // 관리자가 대여 목록에서 '기자재 자세히 보기'를 눌렀을 경우, 
  // 대여자의 이름과 대여 일자가 포함되어야 함.
  managerViewTool: (req, res) => {
    const toolId = req.params.tool_id;

    toolService.managerViewTool(toolId)
      .then((result) => {
        let obj = {};

        if (result == false) {
          obj["suc"] = false;
          obj["error"] = errorCode.E07.message;
          res.send(obj);
        } else if (result == "err") {
          obj["suc"] = false;
          obj["error"] = errorCode.E06.message;
          res.send(obj);
        } else {
          obj['suc'] = true;
          obj['tool'] = result[0].tool;
          obj['user'] = result[0].user.user_name;
          obj['rental_date'] = result[0].rental_date;
          obj['rental_due_date'] = result[0].rental_due_date;

          // = {
          //   rental_date: result[0].rental_date,
          //   rental_due_date: result[0].rental_due_date
          // };
          res.send(obj);
        }
      })
  },

  cannotRental : (req, res) => {
    const toolId = req.params.tool_id;

    toolService.cannotRental(toolId)
    .then(result => {
      let obj = {};
      if (result) {
        obj["suc"] = true;
        res.send(obj);
      } else {
        obj["suc"] = false;
        res.send(obj);
      }
    })
  }
}