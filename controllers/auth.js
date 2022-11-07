import User from '../models/User.js'
import bcrypt from 'bcryptjs'

//Register user
//req request from frontEnd
export const register = async (req, res) => {
    try {
        const {username, password} = req.body

        //check if user exist
        const isUsed = await User.findOne({
            username
        })

        if (isUsed) {
            return res.json({
                message: 'Username is existing'
            })
        }

        //encrypt pass
        //const salt = bcrypt.hash(user.password, salt);
        const salt = password;
        //const hash = bcrypt.hashSync(password, salt);
        const hash = password;

        const newUser = User({
            username,
            password: hash
        })

        await newUser.save();

        res.json({
            newUser, message: 'Registration success'
        })
    }
    catch (error) {
        res.json({
           message: 'User creating error.'
        })
    }
}

export const login = async  (req, res) => {
    try {

    }
    catch (e) {

    }
}

export const getMe = async  (req, res) => {
    try {

    }
    catch (e) {

    }
}
