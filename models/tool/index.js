module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'tools',
        {
            tool_id : {
                primaryKey: true,
                unique: true,
                type : DataTypes.STRING(255)
            },

            tool_use_division : {
                allowNull : false,
                type: DataTypes.STRING(255)
            },

            tool_code : {
                allowNull : false,
                unique: true,
                type: DataTypes.STRING(255)
            },

            tool_name : {
                allowNull : false,
                type: DataTypes.STRING(255)
            },

            tool_purchase_division : {
                allowNull : false,
                type: DataTypes.STRING(255)
            },

            tool_purchase_date : {
                allowNull : false,
                type: DataTypes.DATE
            },

            tool_standard : {
                allowNull : false,
                type: DataTypes.STRING(255)
            },

            tool_state : {
                allowNull : false,
                type: DataTypes.STRING(255)
            },

            tool_update_at : {
                allowNull : false,
                type: DataTypes.DATE
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}