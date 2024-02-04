import express from "express"
import dotenv from 'dotenv';
import connectToDb from "./config/db";
import router from "./routes";

const app = express();
dotenv.config();
app.use(express.json());
connectToDb();

app.use('/api',router);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
})
