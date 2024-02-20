//1) import dotenv
require('dotenv').config()

//2) import express
const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./Routers/router')

//import connection.js file
require('./DB/connections')

//4) create server
const baServer = express()

//5) use cors in server to connect frontend and backend(becz they are running in diff ports)
baServer.use(cors())

// Returns middleware that only parses json - javascript object
baServer.use(express.json())

//use of router by server
baServer.use(router)

//use uploads folder for getting image
baServer.use('/uploads',express.static('./uploads'))

//7) customize the port - by default server running in port no.- 3000 and frontend is also in 3000. so, for avoiding clash between customizing them
const PORT = 4000 || process.env

//8) to run server 
baServer.listen(PORT, ()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//9) get request (first argument is path (/) )
baServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:blue"> Blog Application server running successfully and ready to accept request from client</h1>`)
})





