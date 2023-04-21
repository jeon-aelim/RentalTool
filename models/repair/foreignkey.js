module.exports = db => {
    db.Repair.belongsTo(db.User, {
        foreignKey : "user_id"
    });

    db.Repair.belongsTo(db.Tool, {
        foreignKey : "tool_id"
    })
}