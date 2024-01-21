import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

const decodeTokenAndCheck = (req, res, next) => {
    let token = req.get('Authorization') || req.query.token || req.body.token

    if (token) {
        token = token.replace('Bearer ', '')

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                next(err)
            } else {
                req.user = decoded.user
                if (req.user) {
                    next()
                } else {
                    res.status(401).json({ msg: 'Not Authorized' }) // Corrected typo here
                }
            }
        })
    } else {
        res.status(401).json({ msg: 'Not Authorized' })
    }
}

export {decodeTokenAndCheck}