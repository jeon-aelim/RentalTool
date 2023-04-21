module.exports = db => {

    db.Tool.hasMany(db.Rental, {
        foreignKey : "tool_id",
        sourceKey : "tool_id"
    }),

    db.Tool.belongsTo(db.Department, {
        foreignKey: "department_id"
    })
}