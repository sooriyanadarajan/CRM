require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
require('./config/db')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')
const userActivityRouter = require('./routers/userActivity')
const AdminactivityRouter=require('./routers/adminactivity')
<<<<<<< HEAD
const projectRouter=require('./routers/project')
=======
const userRouter=require('./routers/user')
const adminRouter = require('./routers/admin')
const teamRouter = require('./routers/team')
>>>>>>> ee51ae5c0bb8ef0dd8f28791e7f87fb3d4cdd9e3
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

<<<<<<< HEAD
app.use(taskRouter);
app.use(userRouter);
app.use(userActivityRouter)
app.use(taskRouter);
app.use(AdminactivityRouter);
app.use(projectRouter)
=======
app.use("/task",taskRouter);
app.use("/user",userRouter);
app.use(adminRouter)
app.use(userActivityRouter)
app.use(taskRouter);
app.use(AdminactivityRouter);
app.use(teamRouter);

>>>>>>> ee51ae5c0bb8ef0dd8f28791e7f87fb3d4cdd9e3
const server = app.listen(port, () => {
    console.log("TODO Running on : localhost", process.env.PORT);
})


process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});