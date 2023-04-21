module.exports = {
    enc : (user_pw, salt) => {
        const sha256 = require('sha256');

        return sha256(user_pw + salt)
    },
}