const User = require('../models/user.model')

const logger = require('../logger/logger')


exports.findAll = async (req, res) => {
    console.log("Find all users")

    try {
        const result = await User.find()
        res.status(200).json({status: true, data: result})
        logger.info("Log Info success in reading all users")


    } catch (err) {
        logger.error("Problem in reading all users")
        res.status(400).json({status: true, data: err})
    }

}

exports.findOne = async (req, res) => {
    const username = req.params.username
    console.log("Find user with username ", username )
    try {
        const result = await User.findOne({username: username})
        res.status(200).json({ status: true, data: result })
        logger.log("Success")
    } catch (err) {
        res.status(400).json({status: false, data: err})
        logger.log("Error reading a user")
    }

}

exports.create = async(req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    try {
        const result = await newUser.save();
        res.status(200).json({status: true, data: result})
        logger.log("Success in inserting user with username", req.body.username)
    } catch (err) {
        res.status(400).json({status: false, data: err})
        logger.error("Error in creating user")
    }





}

exports.update = async (req, res) => {
    const username = req.body.username

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        result = await User.findOneAndUpdate({username: username}, updateUser, {new: false})
        res.status(200).json({status: true, data: result})
        logger.log(
            "Success in updating user"
        )
    } catch (error) {
        res.status(400).json({status: false, data: error})
        logger.error("Error in updating user")
    }
}

exports.delete = async (req, res) => {

    const username = req.params.username

    try {
        const result = await User.findOneAndRemove({username: username})
        res.status(200).json({status: true, data: result})
        logger.log("Delete user")
    } catch (error) {
        res.status(400).json({status: false})
        logger.error("Error", error)
    }

}
