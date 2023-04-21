module.exports = db => {

    db.Img.belongsTo(db.Tool, {
        foreignKey : "tool_id"
    });

}