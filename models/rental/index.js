module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'rentals',
        {
            rental_id : {
                primaryKey : true,
                autoIncrement: true,
                type : DataTypes.INTEGER
            },

            rental_date : {
                allowNull: false,
                type : DataTypes.DATE
            },

            rental_due_date : {
                allowNull: false,
                type : DataTypes.DATE
            },

            rental_state : {
                allowNull: false,
                type : DataTypes.STRING(255)
            }
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}