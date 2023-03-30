import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const ProductsModel = sequelize.define(
    "product",
    {
        productID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
        },
        name: {
            type: DataTypes.STRING(50), // VARCHAR(50)
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(50), // VARCHAR(50)
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(50), // VARCHAR(50)
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING(50), // VARCHAR(50)
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER(7), // VARCHAR(50)
            allowNull: false,
        },
    }
    //{ timestamps: false }
    // TIMESTAMPS ARE TRUE BY DEFAULT
)

export default ProductsModel
