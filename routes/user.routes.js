import {Router} from 'express';

import authorize from '../middlewares/auth.middleware.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import { getUser, getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', authorize, errorMiddleware, getUser)
userRouter.post('/', (req, res) => {res.send({title: 'CREATE new user'});}) 
userRouter.put('/', (req, res) => {res.send({title: 'UPDATE User'});})
userRouter.delete('/', (req, res) => {res.send({title: 'DELETE user'});})

export default userRouter;