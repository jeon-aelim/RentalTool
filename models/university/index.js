module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'universities',
        {
            university_id : {
                primaryKey: true,
                autoIncrement: true,
                type : DataTypes.INTEGER
            },

            university_name : {
                allowNull : false,
                unique: true,
                type: DataTypes.STRING(255)
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}