const Adminactivity = require('../models/adminactivity')
const os=require('os');
class Adminactivitycontroller {
    constructor() { }

    async create(req, res) {
// const u=req.useragent;
// console.log(u,'u')
       
        const browser = await new Adminactivity(u.browser).save();

        return res.status(200).json({ success: true, data:browser, message: "find the browser" });
    }

    
}

module.exports = Adminactivitycontroller