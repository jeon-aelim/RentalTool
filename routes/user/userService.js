const {
    User
} = require("../../models");
const moment = require("moment");
const hashing = require("../../config/hashing");

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

module.exports = {
    login: (body,hash) => {
        return new Promise((resolve) => {
            User.findOne({
                where: {
                    user_id: body.user_id,
                    user_pw: hash
                }
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    console.log(err);
                });
        })
    },

    signUp: (body, hash) => {
        return new Promise((resolve) => {
            User.findOrCreate({
                where:
                {
                    user_id: body.user_id
                },
                defaults: {
                    user_id: body.user_id,
                    user_pw: hash,
                    user_email: body.user_email,
                    user_student_number: body.user_student_number,
                    user_name: body.user_name,
                    user_phone_number: body.user_phone_number,
                    user_created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                    user_license: body.user_license,
                    department_id: body.department_id
                },
                raw: true
            })
                .then((result) => {
                    if (result[1]) {
                        resolve(result);
                        console.log(result);
                    } else if (!result[1]) {
                        resolve(body.user_id);
                    } else {
                        console.log(false);
                        resolve(false);
                    }
                })
                .catch((err) => {
                    resolve(false);
                    console.log(err);
                });
        });
    },

    deleteUser: (userId) => {
        return new Promise((resolve) => {
            User.destroy({
                where: {
                    user_id: userId
                },
            })
                .then((result) => {
                    console.log(result);
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    console.log(err);
                });
        });
    },

    findId: (Email) => {
        return new Promise((resolve) => {
            User.findOne({
                where: {
                    user_email: Email,
                },
                attributes: ["user_id", "user_name"]
            })
            .then((result) => {
                console.log(result);
                result !== null ? resolve(result) : resolve(false);
              }).catch((err) => {
                resolve("err");
                console.log(err);
              });
        })
    },

    changePw: (body, hash) => {
        return new Promise((resolve) => {
            User.update(
                { user_pw: hash },
                {
                    where: {
                        user_email: body.user_email,
                    },
                })
                .then((result) => {
                    console.log(result);
                    result !== null ? resolve(result) : resolve(false);
                }).catch((err) => {
                    resolve("err");
                    console.log(err);
                });
        })
    },

    changeInfo: (body, hash) => { // hash -> 정보 변경 시, 비밀번호 입력
        return new Promise((resolve) => {
            User.update(
                {
                    user_id: body.user_id,
                    email: body.user_email
                },
                {
                    where: {
                        user: body.user_id,
                        password: hash
                    }
                }
            )
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    console.log(err);
                });
        })
    },

    inquireMyInfo: (body, hash) => {
        return new Promise((resolve) => {
            User.findOne({
                where: {
                    user_id: body.user_id,
                    user_pw: hash
                }
            }
            )
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    console.log(err);
                });
        })
    }
}