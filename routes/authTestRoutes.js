import {Router} from 'express'
import * as user from '../controllers/userAuthTest.js'
import { decodeTokenAndCheck } from '../middleware/auth.js'

const router = Router()

router.get('/users',decodeTokenAndCheck,user.getAllUsers )

router.post('/create',user.createUser)

router.post('/login', user.login)

export{router}