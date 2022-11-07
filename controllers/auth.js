import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        const salt = bcrypt.genSaltSync(10);
        //const salt = password;
        const hash = bcrypt.hashSync(password, salt);
        //const hash = password;

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
        const {username, password} = req.body;

        //check if user exist in DB
        const user = await User.findOne({username})
        if (!user) {
            return res.json({
                message: 'User not exist'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Password incorrect!'
            })
        }

        //for check if user is logined or disable some routes
        const token = jwt.sign({
                id: user.id,
            },
            //secret key from .env file
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            token, user, message: 'You logged'
        })
    }
    catch (error) {
        res.json({
            message: 'Login error.'
        })
    }
}

export const getMe = async  (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'User not exist'
            })
        }

        const token = jwt.sign({
                id: user.id,
            },
            //secret key from .env file
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            user,
            token
        })
    }
    catch (error) {
        res.json({
            message: 'Access denied'
        })
    }
}
