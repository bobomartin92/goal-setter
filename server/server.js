 const express = require('express')
 const mongoose = require('mongoose')
 const dotenv = require('dotenv').config()
 const {errorHandler} = require('./middleware/errorMiddleware')
 const port = process.env.LOCAL_PORT


 const app = express()
 
 app.use(express.json())
 app.use(express.urlencoded({extended: false}))

 app.use('/api/goals', require('./routes/goalRoutes.js'))

 app.use(errorHandler)

 app.listen(port, () => {
     console.log(`Server started on port ${port}`);
 })