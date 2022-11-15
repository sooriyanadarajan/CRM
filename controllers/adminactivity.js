const Adminactivity = require('../models/Admminactivity')
const u=req.useragent;
const os=require('os');
class Adminactivitycontroller {
    constructor() { }

    async create(req, res) {
       
        const browser = await new Adminactivity(u.browser).save();

        return res.status(200).json({ success: true, data:browser, message: "find the browser" });
    }

    
}

module.exports = Adminactivitycontroller