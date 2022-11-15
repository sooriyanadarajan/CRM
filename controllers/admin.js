const Admin = require('../models/admin')

class AdminController {
    constructor() { }

    async create(req, res) {
        const admin = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: admin, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Admin.find({deleted:false});
        let count = await await Admin.find({deleted:false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }
}

module.exports = AdminController