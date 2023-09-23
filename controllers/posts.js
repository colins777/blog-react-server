import Post from "../models/Post.js";
import User from "../models/User.js";
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body;
        //find user in DB by id in request
        const user = await User.findById(req.userId)


        //for post with image
        if(req.files) {
            //for file name
            let fileName = Date.now().toString() + req.files.image.name;
            //get path of current folder - controllers
            const __dirname = dirname(fileURLToPath(import.meta.url))

            //remove file to uploads folder
            req.files.image.nv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            //saveImage in DB
            await newPostWithImage.save();
            //add post to User
            await User.findByIdAndUpdate(req.userId, {
                $push: {
                    posts: newPostWithImage
                }
            })

            return res.json({
                newPostWithImage
            })
        }

        //post without image
        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })

        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: {
                posts: newPostWithoutImage
            }
        })
        return res.json(newPostWithoutImage);

    } catch (e) {
        res.json('Something gone wrongю');
    }
}