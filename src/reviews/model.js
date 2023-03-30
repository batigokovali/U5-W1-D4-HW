import { DataTypes } from "sequelize"
import sequelize from "../db.js"
import ProductsModel from "../products/model.js"

const ReviewsModel = sequelize.define("reviews", {
    reviewID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

//ONE product with MANY reviews
ProductsModel.hasMany(ReviewsModel, { foreignKey: { name: "productID", allowNull: false } })
ReviewsModel.belongsTo(ProductsModel, { foreignKey: { name: "productID", allowNull: false } })

export default ReviewsModel
