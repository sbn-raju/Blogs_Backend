//Jai Sree Ram.
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { connectToDatabase } = require('./database/db.connect');
const authRouter = require('./routes/auth.routes');
const blogRouter = require('./routes/blogs.routes');
const publishRouter = require('./routes/publish.routes');
const cors = require("cors");




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//Connecting to the Database
connectToDatabase();

app.use("/api/v1.collasyn/auth", authRouter);

app.use("/api/v1.collasyn/blogs", blogRouter);

app.use("/api/v1.collasyn/", publishRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
})