 const path = require('path')
 const express = require('express')
 const dotenv = require('dotenv').config()
 const connectDB = require('./config/db')
 const colors = require('colors')
 const {errorHandler} = require('./middleware/errorMiddleware')
 const port = process.env.LOCAL_PORT

 connectDB()
 const app = express()
 
 app.use(express.json())
 app.use(express.urlencoded({extended: false}))

 app.use('/api/goals', require('./routes/goalRoutes.js'))
 app.use('/api/users', require('./routes/userRoutes.js'))

 if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../client/build')))

     app.get('*', (req,res) => {
         res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
     })
 } else {
    app.get('/', (req, res) => {
        res.send('Change to production')
 })}

 app.use(errorHandler)

 app.listen(port, () => {
     console.log(`Server started on port ${port}`);
 })