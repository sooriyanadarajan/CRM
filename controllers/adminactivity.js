const Adminactivity = require('../models/adminactivity')
const os = require('os');
class Adminactivitycontroller {
    constructor() { }

    async create(req, res) {
        const u = req.useragent;
        let data = await new Adminactivity({
            devicename: os.hostname(),
            browser: u.browser,
            os: u.isAndroid ? u.platform : u.os,
            platform: u.platform,
            version: u.version,
        }).save();

        return res.status(200).json({ success: true, data: data, message: "useragent" });
    }


}

module.exports = Adminactivitycontroller