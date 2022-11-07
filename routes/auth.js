import {Router} from 'express'
import {register, login, getMe} from '../controllers/auth.js'
import {checkAuth} from "../utils/checkAuth.js";
//import checkAuth from '../utils/checkAuth'

const router = new Router()

//Register
router.post('/register', register);

//Login
router.post('/login', login);

//Get me
//checkAuth - middleware that is checking token
router.get('/me', checkAuth, getMe);
//router.get('/me', getMe);

export default router;