const express = require('express')
const router = express.Router()

const joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const authentication = require('../middleware/authentication')

const registerSchema = joi.object({
    name : joi.string().min(3).max(12).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required()
})

const loginSchema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().min(6).required()
})

const authControllers = require('../controllers/authControllers')
const Joi = require("joi");
const {StatusCodes} = require("http-status-codes");

router.post('/register', validator.body(registerSchema), authControllers.register)

router.post('/login', validator.body(loginSchema), authControllers.login)

router.get('/test', authentication.verifyToken, (req, res) => {
    res.status(StatusCodes.OK).send('Authentication was successful')
})

module.exports = router