const Task = require('../models/task')

class TaskController {
    constructor() { }

    async create(req, res) {
        const task = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Task.find({deleted:false});
        let count = await await Task.find({deleted:false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }
}

module.exports = TaskController