const Role = require('../models/Role')

class RoleController {
    constructor() { }

    async create(req, res) {
        const newRole = await new Role(req.body).save();
        return res.status(200).json({ success: true, data: newRole, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let list = await Role.find({
            $or:
                [
                    { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                    { "roleType": { $regex: `${req.body.role}`, $options: 'i' } }
                ]
        }).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await Role.find({$or:
            [
                { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                { "roleType": { $regex: `${req.body.role}`, $options: 'i' } }
            ]
        }).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    async listOne(req, res) {
        const findOne = await Role.findById(req.body._id)
        return res.status(200).json({ data: findOne, message: "New UserActivity finded" });
    }

    async update(req, res) {
        let update = await Role.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        let remove = await Role.deleteOne({ _id: req.body._id })
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    }

}

module.exports = RoleController 
