const Task = require('../models/task')

class TaskController {
    constructor() { }

    async create(req, res) {
        const task = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Task.find({}).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
        let count = await Task.find({}).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

    async find(req, res) {
        let find = await Task.find()
            .populate(['project_id']).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
            .exec()
        return res.status(200).json({ success: true, data: find, message: 'populate' })
    }

    async filter(req, res) {
        let find = await Task.find({
            $or: [{
                name: { $regex: req.body.key, $options: 'i' },
                taskname: { $regex: req.body.key, $options: 'i' }
            }]
        }).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)

        return res.status(200).json({ success: true, data: find, message: 'populate' })

    }

    async findById(req, res) {
        let findById = await Task.findById({ _id: req.body._id })
            .populate(['project_id', 'admin_id', 'user_id'])
        return res.status(200).json({ success: true, data: findById, message: "findById" })
    }


    async update(req, res) {
        let update = await Task.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true, data: update, message: "task update" })

    }
    async delete(req, res) {
        let remove = await Task.deleteOne(req.body._id)
        return res.status(200).json({ success: true, data: remove, message: "task delete" })
    }

    async change(req, res) {
        let a = await Task.findOne({ _id: req.body._id });
        a.active = !a.active
        a.save();
        return res.status(200).json({ success: true, data: a, message: "change" })
    }
}

module.exports = TaskController