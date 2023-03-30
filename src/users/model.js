import { DataTypes } from "sequelize"
import sequelize from "../db.js"
import ReviewsModel from "../reviews/model.js"

const UsersModel = sequelize.define(
    "user",
    {
        userID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }
)

//1 user to MANY reviews
UsersModel.hasMany(ReviewsModel, { foreignKey: { name: "userID", allowNull: false } })
ReviewsModel.belongsTo(UsersModel, { foreignKey: { name: "userID", allowNull: false } })

export default UsersModel
