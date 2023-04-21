module.exports = db => {
    db.University.hasMany(db.Department, {
        foreignKey: "university_id",
        sourceKey: "university_id"
    })
}