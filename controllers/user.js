const User = require('../models/user')
const bcrypt = require('bcryptjs')
class UserController {
    constructor() { }


    async singUp(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body
            console.log(req.body)
            console.log(password)
            if (!req.body) {
                res.status(400).send("please fill the above detail")
            }

            // const findEmail = await User.findOne({ email })
            // console.log(findEmail)
            // if (findEmail) {
            //     return res.status(400).send(`${email} is already used please another email`)
            // }
            const salt = await bcrypt.genSalt(10)
            console.log(salt)
            const encryptedPassword = await bcrypt.hash(password, salt)
            console.log(encryptedPassword)
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPassword
            })
            // console.log(user)
            res.status(200).json({ success: true, data: user, message: "singup successfully" })
        } catch (error) {
            return error.message
        }
    }

    async logIn(req, res) {
        try {
            const { email, password } = req.body;

            if (!req.body) {
                req.status(400).send("Please enter the email and password")
            }
            const user = await User.findOne({ email},{_id:0})

            if (!user) {
                return res.status(400).json({ message: "please veriry your email" })
            }
            if (user && (await bcrypt.compare(password, user.password))) {
                return res.status(200).json({ success: true, data: user, message: "login successfully" })
            }
            else {
                return res.status(400).json({ message: "please veriry your password" })

            }
        } catch (error) {
            return error.message
        }
    }

    async delete(req, res) {
        let remove = await User.deleteOne(req.body)
        return res.status(200).json({ success: true, data: remove, message: "deleted successfully" })

    }

}

module.exports = UserController