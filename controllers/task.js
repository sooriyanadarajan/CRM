const Task = require('../models/task')

class TaskController {
    constructor() { }

    async create(req, res) {
        const task = await new Task(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Task.find({deleted:false});
        let count = await Task.find({deleted:false}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

     async update(req,res){
        let update =  await Task.updateOne({_id:req.body._id},req.body);
        return res.status(200).json({success: true, data: update, message: "task update"})
        
     }
     async delete(req,res){
        let remove = await Task.deleteOne(req.body._id)
        return res.status(200).json({success: true, data: remove, message: "task delete"})
     }
}

module.exports = TaskController