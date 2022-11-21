require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
require('./config/db')
const useragent = require('express-useragent')
const userRouter = require('./routers/user')
const userActivityRouter = require('./routers/userActivity')
const adminRouter = require('./routers/admin')
const AdminactivityRouter=require('./routers/adminactivity')
const teamRouter = require('./routers/team')
const projectRouter=require('./routers/project')
const taskRouter = require('./routers/task')
const meeetingRouter = require('./routers/meeting')
const leaveRouter = require('./routers/leave')
const bugRouter = require('./routers/bug')

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
app.use(useragent.express())

app.use(userRouter);
app.use(userActivityRouter)
app.use(adminRouter)
app.use(AdminactivityRouter);
app.use(teamRouter);
app.use(projectRouter);
app.use(taskRouter);
app.use(meeetingRouter);
app.use(leaveRouter);
app.use(bugRouter);



const server = app.listen(port, () => {
    console.log("CRM Running on : localhost", process.env.PORT);
})


process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});