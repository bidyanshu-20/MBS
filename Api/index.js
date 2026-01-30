import express from 'express';  // Import the Express module
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import billingRouter from "./routes/messbill.route.js";
import messdataRouter from './routes/messdata.route.js';
import cors from 'cors'
import env from 'dotenv';
env.config();

mongoose.connect(process.env.MONGOURI).then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());



// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.send("I am SERVER...");  // Send a response to the client
});
// Start the server on port 3000
app.use('/api', userRouter);
app.use('/api/auth', authRouter);
app.use('/api', billingRouter);
app.use('/api',messdataRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error.';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})



app.listen(3400, () => {
    console.log('server is running on port 3400!!!');
});
