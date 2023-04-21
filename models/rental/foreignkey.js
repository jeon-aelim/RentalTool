module.exports = db => {
    db.Rental.belongsTo(db.User, {
        foreignKey : "user_id"
    });

    db.Rental.belongsTo(db.Tool, {
        foreignKey : "tool_id"
    })
}