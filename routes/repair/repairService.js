const {
    Rental, Tool, Log, Department
} = require("../../models");
const { Op } = require("sequelize");

const moment = require("moment");

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const errorCode = require('../../config/errorCode');
const { resolve } = require("path");

// node-schedule을 사용해 board_score 점수를 리셋.
const schedule = require('node-schedule');
// update at am 4:00
schedule.scheduleJob('10 * * * *', function () {
    const currentTime = moment().format("YYYY-MM-DD hh:mm:ss");
    
    Rental.findAll({
        where: { 
            rental_state: "대여",
            rental_due_date : {
                [Op.lt]: currentTime
            }
        }
    })
        .then((result) => {
            console.log(result)

            for (let i = 0; i < result.length; i++) {
                Rental.update({
                    rental_state: "미반납"
                },
                    {
                        where: { rental_id: result[i].rental_id }
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = {

    // RENTAL TOOL
    rentalTool: (body) => {
        return new Promise((resolve) => {
            // find the tool
            Tool.findOne({
                where: { tool_id: body.tool_id }
            })
                .then((result) => {
                    // if the tool could be rentaled
                    console.log(result.tool_state)
                    if (result.tool_state == "대여가능") {
                        const dueDate = moment().add(7, 'days');
                        // create rentalDB
                        Rental.create({
                            tool_id: body.tool_id,
                            user_id: body.user_id,
                            rental_date: moment().format("YYYY-MM-DD hh:mm:ss"), // now
                            rental_due_date: dueDate.format("YYYY-MM-DD 18:00:00"),
                            // in 7 days from now
                            rental_state: "대여",
                            rental_is_extended: false
                        })
                            .then((createResult) => {
                                console.log(createResult)
                                // LOG DB 생성
                                Log.create({
                                    log_title: "대여",
                                    log_content: `${createResult.user_id}님께서 ${createResult.tool_id} 기자재를 대여했습니다. `,
                                    log_create_at: createResult.rental_date,
                                    department_id: body.department_id
                                })
                                    .then((logResult) => {
                                        // change tool_state "대여가능" to "대여중"
                                        Tool.update({
                                            tool_state: "대여중"
                                        },
                                            { where: { tool_id: createResult.tool_id }, }
                                        )
                                            .then((updateResult) => {
                                                console.log(createResult.rental_id)
                                                console.log("******update OK*******");
                                                updateResult !== null ? resolve(logResult.log_content) : resolve("err");

                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                resolve("err");
                                            });
                                        console.log("create Log");
                                        console.log(logResult);
                                    })
                                    .catch((err) => {
                                        console.log("create Log failed");
                                        console.log(err);
                                        resolve("err");
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                                resolve("err");
                            });
                    } else { // the tool has already been rentaled
                        resolve(errorCode.E05.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        })
    },

    // RETURN TOOL
    returnTool: (body) => {

        return new Promise((resolve) => {
            Tool.findOne({
                include: [
                    {
                        model: Rental,
                        attributes: ['user_id']
                    },

                ],
                where: { tool_id: body.tool_id }
            },
            )
                .then((result) => {
                    // if the tool has been rentaled
                    if (result.tool_state == "대여중") {
                        // change rental_state "대여" to "반납"
                        Rental.update({
                            rental_state: "반납"
                        },
                            {
                                where: {
                                    tool_id: result.tool_id,
                                    rental_state: "대여"
                                }
                            })
                            .then(() => {
                                // LOG DB 생성
                                console.log(result);
                                Log.create({
                                    log_title: "반납",
                                    log_content: `${result.tool_id} 기자재가 반납되었습니다. `,
                                    log_create_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                                    department_id: result.department_id
                                })
                                    .then((logResult) => {
                                        // change tool_state "대여중" to "대여가능"
                                        Tool.update({
                                            tool_state: "대여가능"
                                        },
                                            { where: { tool_id: result.tool_id }, }
                                        )
                                            .then((toolUpdateResult) => {
                                                toolUpdateResult !== null ? resolve(logResult.log_content) : resolve("err");

                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                resolve("err");
                                            });

                                    })
                                    .catch((err) => {
                                        console.log("create Log failed");
                                        console.log(err);
                                        resolve("err");
                                    });

                            })
                            .catch((err) => {
                                console.log(err);
                                resolve("err");
                            });
                    } else {
                        resolve(errorCode.E05.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        })
    },

    extension: rentalId => {
        return new Promise((resolve) => {
            Rental.findOne({
                where: { rental_id: rentalId }
            })
                .then((result) => {
                    const dueDate = moment(result.rental_due_date).add(7, 'days');
                    Rental.update({
                        rental_due_date: dueDate,
                        rental_is_extended: true
                    },
                        { where: { rental_id: result.rental_id }, }
                    )
                        .then(() => {
                            Log.create({
                                log_title: "연장",
                                log_content: `${result.user_id}님께서 ${result.tool_id} 기자재 반납 기간을 ${dueDate}까지 연장했습니다. `,
                                log_create_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                                department_id: result.department_id
                            })
                                .then((logResult) => {
                                    resolve(logResult.log_content);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    resolve("err");
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                            resolve("err");
                        });
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                })
        })
    },


    myCurrentRentalList: (userId, offset) => {
        return new Promise((resolve) =>{
            Rental.findAll({
                where: 
                {
                    user_id: userId,
                    rental_state: "대여"
                },
                attributes: ['rental_date', 'rental_due_date'],
                include: {
                    model: Tool,
                    attributes: ['tool_use_division', 'tool_name', 'tool_id'],
                    include: {
                        model: Department,
                        attributes: ['department_name']
                    }
                },
                limit: 12,
                offset: offset
            })
            .then((result) => {

                let objs = [];
                
                let days = moment(result[0].rental_due_date).diff(moment(),'days');
                let Dday;

                for(i = 0; i < result.length; i++){

                    let obj = {};
                    days =  moment(result[i].rental_due_date).diff(moment(),'days');
                    
                    if(days > 0){
                        Dday = "D - " + days;    
                    }else if( days == 0) {
                        Dday = "TODAY"
                    }else {
                        Dday = "미반납"
                    }
                    
                    obj['D-day'] =  Dday;
                    obj['result'] = result[i];
                    objs.push(obj);
    
                }
                

                result !== null ? resolve(objs) : resolve(false);
                
              })
              .catch((err) => {
                console.log(err);
                resolve("err");
              })
        })
    },

    myAllRentalList : (userId, offset) => {
        return new Promise((resolve) => {
            Rental.findAll({
                where: { user_id : userId},
                order: [['rental_state', 'ASC']],
                attributes : ['rental_date', 'rental_state'],
                include : {
                    model : Tool,
                    attributes : ['tool_use_division', 'tool_name', 'tool_id']
                },
                limit: 12,
                offset: offset
            })
            .then((result) => {
                result !== null ? resolve(result) : resolve(false);
                
              })
              .catch((err) => {
                console.log(err);
                resolve("err");
              })
        })
    },

    testNotReturn : () => {
        const currentTime = moment().format("YYYY-MM-DD hh:mm:ss");
    
        Rental.findAll({
            where: { 
                rental_state: "대여",
                rental_due_date : {
                    [Op.lt]: currentTime
                }
            }
        })
            .then((result) => {
                console.log(result)
    
                for (let i = 0; i < result.length; i++) {
                    Rental.update({
                        rental_state: "미반납"
                    },
                        {
                            where: { rental_id: result[i].rental_id }
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
            .catch(err => {
                console.log(err);
            })
    }
    // notReturned : (departmentId, offset) => {
    //     return new Promise((resolve) => {
    //         Rental.findAll({
    //             where: {
    //                 department_id : departmentId,

    //             },
    //             limit: 12,
    //             offset: offset
    //         })
    //     })
    // }
}