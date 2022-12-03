const leave = require('../models/leave')

class LeaveController {
    constructor() { }

    async create(req, res) {

        const newLeaveActivity = await new leave(req.body).save();
        return res.status(200).json({ success: true, data: newLeaveActivity, message: " leave Created" });
    }

    async list(req, res) {

        let list = await leave.find({}).skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await leave.find({}).countDocuments()

        let output = {
            list,
            count,
        }
        
        return res.status(200).json({ success: true, data: output, message: "Leave Listed !" });
    }

    async leaveaccept(req, res) {

        let accept = await leave.find({ leaveStatus: "true" })
        let count = await leave.find({ leaveStatus: "true" }).countDocuments()
        let output = {
            accept,
            count
        }
        return res.status(200).json({ success: true, data: output, message: "Leave Listed !" });
    }

    async leavenotaccept(req, res) {

        let notaccept = await leave.find({ leaveStatus: "false" })
        let count = await leave.find({ leaveStatus: "false" }).countDocuments()
        let output = {
            notaccept,
            count
        }
        return res.status(200).json({ success: true, data: output, message: "Leave Listed !" });
    }

    async listOne(req, res) {
        const findOne = await leave.findById({ date: req.body.date })
        return res.status(200).json({ data: findOne, message: "New Leave finded" });
    }

    async update(req, res) {
        let update = await leave.updateOne({ _id: req.body._id }, { leaveStatus: req.body.leaveStatus })
        return res.status(200).json({ data: update, message: 'status changed' })

    }

    async delete(req, res) {
        let remove = await leave.deleteOne({ _id: req.body._id })
        return res.status(200).json({ success: true, data: remove, message: "new Leave updated" });
    }


    // find the absent list (dynamic)

    async list(req, res) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        let list = await leave.find({$and:[{from:{$lte:req.body.checkLeave}},{to:{$gte:req.body.checkLeave}}]})
        let count = await leave.find({$and:[{from:{$lte:req.body.checkLeave}},{to:{$gte:req.body.checkLeave}}]} ).count()
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Leave Listed !" });
    }
    

}

module.exports = LeaveController 
