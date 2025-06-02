import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from "./config/env.js";

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json()); // This allows your app to handle JSON data sent in requests
app.use(express.urlencoded({ extended: false })); // This allows your app to handle URL-encoded data sent in requests
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send("Welcome to subscription tracker app");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    connectToDatabase();
})

export default app;