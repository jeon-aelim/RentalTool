const {
    Tool, Img, Department, Rental, User
} = require('../../models');

const moment = require("moment");
const tool = require('../../models/tool');

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

module.exports = {
    addTool: (body) => {
        return new Promise((resolve) => {
            Tool.create({
                tool_id: body.tool_id,
                tool_use_division: body.tool_use_division,
                tool_code: body.tool_code,
                tool_name: body.tool_name,
                tool_purchase_division: body.tool_purchase_division,
                tool_purchase_date: body.tool_purchase_date,
                tool_standard: body.tool_standard,
                tool_condition: body.tool_condition,
                tool_update_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                tool_state: "대여가능",
                tool_change_date: moment().format("YYYY-MM-DD hh:mm:ss"),
                department_id: body.department_id
            })
                .then(async result => {
                    let obj = {};
                    let results = [];
        
                    console.log(imgData)
                    if (imgData != null) {
                      const promises = imgData.map(
                        async (value, index, array) =>
                          await Img.create({
                            img_url: array[index].location,
                            tool_id: result.tool_id,
                          })
                            .then((res) => results.push(res))
                            .catch((err) => {
                              resolve("err");
                              console.log(err);
                            })
                      );
                      await Promise.all(promises);
                    }
          
                    obj["board"] = result;
                    obj["img"] = results;
          
                    obj !== null ? resolve(obj) : resolve(false);
                })
                .catch((err) => {
                    resolve(err)
                })

        })
    },

    viewToolList: (departmentId, offset) => {
      return new Promise ((resolve) => {
        Tool.findAll({
            where : { department_id: departmentId },
            attributes: ['tool_use_division', 'tool_name', 'tool_id', 'tool_state'],
            order: [['tool_state', 'ASC']],
            include : {
              model: Department,
              attributes : ['department_name']
            },
            offset: offset,
            limit: 12
        })
        .then((result) => {
          // let obj = {};
          // obj['result'] = result;
          // obj['result'] = 
          result != null ? resolve(result): resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve("err");
        })
      })
    },
    
    viewTool :  (toolId) =>{
      return new Promise((resolve) => {
        Tool.findOne({
          where : {tool_id : toolId},
          attributes: {exclude:['tool_change_date', 'department_id', 'tool_state']},
        })
        .then((result) => {
          result != null ? resolve(result): resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve("err");
        })
      })
    },

    managerViewTool : (toolId) =>{
      return new Promise((resolve) => {
        Rental.findAll({
          where : {tool_id : toolId},
          order: [['rental_id', 'DESC']],
          limit: 1,
          include : [{
            model: Tool,
            attributes : {exclude:['tool_change_date', 'department_id', 'tool_state']},
          },
          {
            model: User,
            attributes : ['user_name']
          }]
        })
        .then((result) => {
          result != null ? resolve(result): resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve("err");
        })
      })
    },

    cannotRental: (toolId) => {
      return new Promise((resolve) => {
        Tool.update({
            tool_state: "대여 불가"
        },
        {
          where: {tool_id: toolId}
        }
        )
        .then((result) => {
          result != null ? resolve(result): resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve("err");
        })
      })
    }
}