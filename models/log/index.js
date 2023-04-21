// 대여, 반납, 연장 시 생성.
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'logs',
        {
            log_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },

            log_title: {
                allowNull: false,
                type: DataTypes.STRING(255)
            },

            log_content: {
                allowNull: false,
                type: DataTypes.STRING(255)
            },

            log_create_at: {
                allowNull: false,
                type: DataTypes.DATE
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}