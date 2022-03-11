const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email: email.toLowerCase()})

        if (!user) return res.status(StatusCodes.UNAUTHORIZED).send('User does not exist')

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials')

        res.status(StatusCodes.OK).json({user})
    }catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong...Please try again')
    }
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const userExists = await userModel.exists({email: email.toLowerCase()})

        if (userExists) return res.status(StatusCodes.CONFLICT).send('email already in use')

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        res.status(StatusCodes.CREATED).json({user})
    }catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong...Please try again')
    }
}

module.exports = {
    login,
    register
}