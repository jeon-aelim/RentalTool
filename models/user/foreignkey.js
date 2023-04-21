module.exports = db => {
    
    db.User.hasMany(db.Rental, {
        foreignKey: "user_id",
        sourceKey: "user_id"
    });

    db.User.belongsTo(db.Department, {
        foreignKey: 'department_id'
    })
}