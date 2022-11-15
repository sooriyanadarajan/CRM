const Admin = require('../models/admin')

class AdminController {
    constructor() { }

    async create(req, res) {
        const admin = await new Admin(req.body).save();
        return res.status(200).json({ success: true, data: admin, message: "New Admin Created" });
    }

    async list(req, res) {
        let list = await Admin.find({deleted:false});
        let count = await await Admin.find({deleted:false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Admin Listed !" });
    }

    async update(req, res) {
        let update = await Admin.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true, data: update, message: "Admin Updated" })

    }
    async delete(req, res) {
        let remove = await Admin.deleteOne(req.body._id)
        return res.status(200).json({ success: true, data: remove, message: "Admin Deleted" })
    }
}

module.exports = AdminController