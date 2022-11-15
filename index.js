require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
require('./config/db')

const taskRouter = require('./routers/task')
const userActivityRouter = require('./routers/userActivity')
const AdminactivityRouter=require('./routers/adminactivity')
const adminRouter = require('./routers/admin')
const userActivityRouter = require('./routers/userActivity')
const app = express()
app.use(express.json())

const port = process.env.PORT || 7795
// app.use(cors())

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4300"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

app.use("/task",taskRouter);
app.use("/user",userRouter);
app.use("/admin",adminRouter)
app.use(userActivityRouter)
app.use(taskRouter);
app.use(AdminactivityRouter);
const server = app.listen(port, () => {
    console.log("TODO Running on : localhost", process.env.PORT);
})


process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});