const { Tool, User } = require('../../models');

module.exports = {
    checkTool: (toolId) => {
        return new Promise((resolve) => {
            Tool.findOne({
                where: {
                    tool_id: toolId
                },
                attributes: ["tool_id", "tool_state"]
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                })
        })
    },
    rentalTool: (body) => {
        return new Promise((resolve) => {
            Tool.update({
                tool_state: body.tool_state
            },
                {
                    where: { tool_id: body.tool_id }
                }
            )
                .then((result) => {

                })
                .catch((err) => {

                })
        })
    },

    token: (userId) => {
        return new Promise((resolve) => {
            User.findOne({
                where: { user_id: userId },
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                })
        })
    }
}