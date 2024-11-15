const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
app.use(express.json());

//Routes
app.use('/products', productRoutes);
app.use('/cart',authMiddleware, cartRoutes);
app.use('/auth', authRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        msg: err.message
    })
})

// connection to MongoDB and server
const port  = process.env.port;
const url = process.env.url;
mongoose.connect(url)
.then(() => console.log("Connect to DataBase"))
.catch(()=> console.log("Error in connecting DataBase"))

app.listen(port, ()=>{
    console.log("Server Started");
})