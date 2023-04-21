module.exports = db => {

    db.User.belongsTo(db.Department, {
        foreignKey: 'department_id'
    })
}