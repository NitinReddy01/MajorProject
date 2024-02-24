import express from "express"
import dotenv from 'dotenv';
import connectToDb from "./config/db";
import router from "./routes";
import { corsConfig } from "./config/corsConfig";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(corsConfig))
app.use(cookieParser());
connectToDb();

app.use('/api',router);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
})
