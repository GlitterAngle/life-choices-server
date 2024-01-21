import jwt from 'jsonwebtoken'
import User from '../model/authTestModel.js'

//come back to import users and profile

function createToken(user){
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}

export {createToken}