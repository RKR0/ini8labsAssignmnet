import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import createRegistrationTable from './model/Register.js';
import RegisterRouter from './routes/RegisterRoute.js';




dotenv.config();
const app = express()
const PORT = process.env.PORT


// JSON
app.use(express.json())

// CORS Policy
app.use(cors())

//connectDB;

createRegistrationTable();


app.use("/api/user",RegisterRouter)




app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );