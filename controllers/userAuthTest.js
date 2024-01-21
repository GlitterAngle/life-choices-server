import jwt from 'jsonwebtoken'
import {User} from '../model/authTestModel.js'


function createToken(user){
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}

const getAllUsers= async (req, res)=>{
    console.log(req,res)
    try {
       const allUsers = await User.find({})
        return res.status(200).json({
            allUsers
        })
    } catch (error) {
        console.error('Error fetching all users: this message comes from your user auth test controller')
    }
}

const login = async (req, res)=>{
    try{
        const user = await User.findOne({name: req.body.name})
        console.log(user.name)
        if(!user){
            return res.status(401).json({err: 'User not found'})
        }

        user.comparePassword(req.body.pw, (err, isMatch)=>{
            if(err){
                return res.status(500).json(err)
            }
            if(isMatch){
                const token = createToken(user)
                res.json({token})
            }else{
                res.status(401).json({err: 'Inccorect password'})
            }
        })
    } catch (err){ 
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message })

    }
}

const createUser = async (req, res) =>{
    console.log(req,res)
    try {
        
        const newUser = await User.create(req.body)
        res.status(200).json({
            newUser
        })
    } catch (error) {
        console.error('Error creating new user: this message comes from your user auth test controller')
    }
}

export {getAllUsers,createUser, login}