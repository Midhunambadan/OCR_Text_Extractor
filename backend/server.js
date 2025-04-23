
import express from 'express'
const app= express()
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT || 3000

import userRoute from './router/userRoute.js'

app.set('view engine','ejs')
app.use(cors());
app.use(express.json())

app.use('/',userRoute)



app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`);
    
})