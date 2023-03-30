import { DataTypes } from "sequelize"
import sequelize from "../db.js"
import ProductsCategoriesModel from "./productsCategoriesModel.js"
import CategoriesModel from "../categories/model.js"

const ProductsModel = sequelize.define(
    "product",
    {
        productID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER(7),
            allowNull: false,
        },
    }
)

//Many to many
ProductsModel.belongsToMany(CategoriesModel, {
    through: ProductsCategoriesModel,
    foreignKey: { name: "productID", allowNull: false },
})

CategoriesModel.belongsToMany(ProductsModel, {
    through: ProductsCategoriesModel,
    foreignKey: { name: "categoryID", allowNull: false },
})



export default ProductsModel
