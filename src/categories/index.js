import express from "express"
import CategoriesModel from "./model.js"

const categoriesRouter = express.Router()

//POST a category
categoriesRouter.post("/", async (req, res, next) => {
    try {
        const { categoryID } = await CategoriesModel.create(req.body)

        res.status(201).send({ categoryID })
    } catch (error) {
        next(error)
    }
})

//GET a category
categoriesRouter.get("/", async (req, res, next) => {
    try {
        const categories = await CategoriesModel.findAll({
            attributes: ["categoryID", "name"],
        })
        res.send(categories)
    } catch (error) {
        next(error)
    }
})

// categoriesRouter.get("/:id", async (req, res, next) => {
//     try {
//     } catch (error) {
//         next(error)
//     }
// })

export default categoriesRouter