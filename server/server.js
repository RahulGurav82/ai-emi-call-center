const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();


app.use(
    cors({
        origin : process.env.FRONTEND_URL,
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"        
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Work");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});