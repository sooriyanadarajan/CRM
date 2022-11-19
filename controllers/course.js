const Bug = require('../models/course')

class BugController {
    constructor() { }


    async create(req, res) {
        const task = await new Bug(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Bug.find({}).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
        let count = await Bug.find({}).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

    async find(req, res) {
        let find = await Bug.find()
            .populate(['project_id', 'admin_id', 'user_id']).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
            .exec()
        return res.status(200).json({ success: true, data: find, message: 'populate' })

    }

    async update(req, res) {
        let update = await Bug.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true, data: update, message: "task update" })

    }
    async delete(req, res) {
        let remove = await Bug.deleteOne(req.body._id)
        return res.status(200).json({ success: true, data: remove, message: "task delete" })
    }

    async change(req, res) {
        let a = await Bug.findOne({ _id: req.body._id });
        a.active = !a.active
        a.save();
        return res.status(200).json({ success: true, data: a, message: "change" })
    }
}

module.exports = BugController

