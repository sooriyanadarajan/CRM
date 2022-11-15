const Adminactivity = require('../models/adminactivity')
const os = require('os');
class Adminactivitycontroller {
    constructor() { }

    async create(req, res) {
        const u = req.useragent;
        // console.log(os,'os')
        const data = await new Adminactivity({
            user_id: admin._id,
           devicename:os.hostname(),
            browser:u.browser,
            os: u.isAndroid ? u.platform : u.os,
            platform: u.platform,
            version: u.version,
        }).save();

        return res.status(200).json({ success: true, data: data, message: "useragent" });
    }


}

module.exports = Adminactivitycontroller