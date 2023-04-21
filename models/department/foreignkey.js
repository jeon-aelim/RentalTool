module.exports = db => {

    db.Department.belongsTo(db.University, {
        foreignKey : "university_id"
    });

    db.Department.hasMany(db.User, {
        foreignKey : "department_id",
        sourceKey : "department_id"
    });

    db.Department.hasMany(db.Tool, {
        foreignKey : "department_id",
        sourceKey : "department_id"
    });

}