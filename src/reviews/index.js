import express from "express"
import createHttpError from "http-errors"
import { Op } from "sequelize"
import ReviewsModel from "../reviews/model.js"

const ReviewsRouter = express.Router()

ReviewsRouter.post("/:productID/reviews", async (req, res, next) => {
    try {
        const { reviewID } = await ReviewsModel.create({
            ...req.body,
            productID: req.params.productID
        })
        res.status(201).send({ reviewID })
    } catch (error) {
        next(error)
    }
})

export default ReviewsRouter