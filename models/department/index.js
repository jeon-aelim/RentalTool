module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'departments',
        {
            department_id : {
                primaryKey: true,
                autoIncrement: true,
                type : DataTypes.INTEGER
            },

            department_name : {
                allowNull : false,
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