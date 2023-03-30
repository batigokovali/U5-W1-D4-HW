import express from "express"
import createHttpError from "http-errors"
import { Op } from "sequelize"
import UsersModel from "./model.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
    try {
        const { userID } = await UsersModel.create(req.body)
        res.status(201).send({ userID })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await UsersModel.findAll()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

export default usersRouter