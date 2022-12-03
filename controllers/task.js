const Task = require('../models/task')

class TaskController {
    constructor() { }

    async create(req, res) {
        const task = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Task.find({ $or: { from_id: req.user.id, to_id: req.user.id } }).skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0).limit(req.body.limit).populate('project_id')
        let count = await Task.find({ $or: { from_id: req.user.id, to_id: req.user.id } }).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

    async find(req, res) {
        let find = await Task.find()
            .populate('project_id').skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0).limit(req.body.limit)
            .exec()
        return res.status(200).json({ success: true, data: find, message: 'Task listed' })

    }

    async filter(req, res) {
        let find = await Task.find({
            $or: [{
                name: { $regex: req.body.key, $options: 'i' },
                // taskname: { $regex: req.body.key, $options: 'i' }
            }]
        }).skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0).limit(req.body.limit)

        return res.status(200).json({ success: true, data: find, message: 'search data listed' })

    }

    async findById(req, res) {
        let findById = await Task.findById({ _id: req.body.id }).populate('project_id')
        return res.status(200).json({ success: true, data: findById, message: "data listed !" })
    }


    async update(req, res) {
        let update = await Task.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true, data: update, message: "task update" })
    }

    async delete(req, res) {
        let remove = await Task.findOne(req.body.id)
        remove.deleted = true;
        await remove.save();
        return res.status(200).json({ success: true, data: remove, message: "task delete" })
    }

    async change(req, res) {
        let value = await Task.findOne({ _id: req.body.id });
        value.active = !value.active
        value.save();
        return res.status(200).json({ success: true, data: a, message: "Task change" })
    }
}

module.exports = TaskController