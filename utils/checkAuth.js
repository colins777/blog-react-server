import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    //get token
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    
    if (token) {
        try {
            //need to decode header string
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            //next() func is showing that all is success
            next()
        } catch (e) {
            return res.json({
                message: 'No access'
            })
        }
    } else {
        return res.json({
            message: 'No access'
        })
    }
}