import {Router} from 'express'
import {createPost} from "../controllers/posts.js";
import {checkAuth} from "../utils/checkAuth.js";


const router = new Router()

//create post
//http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);



export default router;