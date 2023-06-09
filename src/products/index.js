import express from "express"
import createHttpError from "http-errors"
import { Op } from "sequelize"
import ProductsModel from "./model.js"
import ProductsCategoriesModel from "./productsCategoriesModel.js"
import CategoriesModel from "../categories/model.js"
import ReviewsModel from "../reviews/model.js"
import UsersModel from "../users/model.js"

const ProductsRouter = express.Router()

//POST a product
ProductsRouter.post("/", async (req, res, next) => {
    try {
        const { productID } = await ProductsModel.create(req.body)
        if (req.body.categories) {
            await ProductsCategoriesModel.bulkCreate(
                req.body.categories.map(category => {
                    return { productID: productID, categoryID: category }
                })
            )
        }
        res.status(201).send({ productID })
    } catch (error) {
        next(error)
    }
})

//GET all products
ProductsRouter.get("/", async (req, res, next) => {
    try {
        const query = {}
        const url = req.protocol + "://" + req.get("host") + req.originalUrl;
        let links = []
        const { count, rows } = await ProductsModel.findAndCountAll({
            where: { ...query },
            limit: req.query.limit,
            offset: req.query.offset,
            order: [
                ["name", "ASC"],
            ],
            attributes: ["name", "price", "description", "productID"],
            include: [
                { model: CategoriesModel, attributes: ["name"], through: { attributes: [] } },
                {
                    model: ReviewsModel,
                    attributes: ["reviewID", "content", "userID"],
                    include: [{ model: UsersModel, attributes: ["firstName", "lastName"] }]
                }
            ],
        })
        if (req.query.offset && req.query.limit) {
            let prevlinkAsNumber = parseInt(req.query.offset) - parseInt(req.query.limit)
            let prevLink = url.replace(`offset=${req.query.offset}`, `offset=${prevlinkAsNumber.toString()}`)

            let nextLinkAsNumber = parseInt(req.query.limit) + parseInt(req.query.offset)
            let nextLink = url.replace(`offset=${req.query.offset}`, `offset=${nextLinkAsNumber.toString()}`)
            links = [{ prev: prevLink }, { next: nextLink }]
        }
        if (req.query.minPrice) {
            query.price = { [Op.gte]: req.query.minPrice }
        }
        if (req.query.maxPrice) {
            query.price = { [Op.lte]: req.query.maxPrice }
        }
        if (req.query.minPrice && req.query.maxPrice) {
            query.price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] }
        }
        if (req.query.category) {
            query.category = { [Op.iLike]: req.query.category }
        }
        if (req.query.name) {
            query.name = { [Op.iLike]: req.query.name }
        }
        if (req.query.description) {
            query.description = { [Op.iLike]: req.query.description }
        }
        res.send({ count, rows, links })
    } catch (error) {
        next(error)
    }
})

//GET a product
ProductsRouter.get("/:productID", async (req, res, next) => {
    try {
        const product = await ProductsModel.findByPk(req.params.productID) //{ attributes: { exclude: ["createdAt", "updatedAt"] } } ---> to omit the unwanted attributes
        if (product) {
            res.send(product)
        } else (
            next(createHttpError(404, `Product with id ${req.params.productID} not found!`))
        )
    } catch (error) {
        next(error)
    }
})

//PUT a product
ProductsRouter.put("/:productID", async (req, res, next) => {
    try {
        const [numberOfUpdatedRows, updatedRecords] = await ProductsModel.update(req.body, { where: { productID: req.params.productID }, returning: true })
        if (numberOfUpdatedRows === 1) {
            res.send(updatedRecords[0])
        } else {
            next(createHttpError(404, `Product with id ${req.params.productID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

//DELETE a product
ProductsRouter.delete("/:productID", async (req, res, next) => {
    try {
        const numberOfDeletedRows = await ProductsModel.destroy({ where: { productID: req.params.productID } })
        if (numberOfDeletedRows === 1) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Product with id ${req.params.productID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default ProductsRouter