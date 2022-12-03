const Role = require('../models/Role')

class RoleController {
    constructor() { }

    async create(req, res) {
        const newRole = await new Role(req.body).save();
        return res.status(200).json({ success: true, data: newRole, message: "New Role Created" });
    }

    async list(req, res) {
        let list = await Role.find({}).skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await Role.find({}).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Role Listed !" });
    }

    async listOne(req, res) {
        const findOne = await Role.findById(req.body.id)
        return res.status(200).json({ data: findOne, message: "Role finded" });
    }

    async update(req, res) {
        let update = await Role.updateOne({ _id: req.body.id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "Role updated" });
    }

    async delete(req, res) {
        let remove = await Role.findOne({ _id: req.body.id })
        remove.deleted = true
        await remove.save()
        return res.status(200).json({ success: true, data: remove, message: "Role deleted" });
    }

}

module.exports = RoleController 
