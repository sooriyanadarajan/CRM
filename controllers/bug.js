const bug = require('../models/bug')
class BugController {
    constructor() { }

    async create(req, res) {
        const newbug = await new bug(req.body).save();
        return res.status(200).json({ success: true, data: newbug, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let table=await user.find({})
        let list = await bug.find({}).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await UserActivity.find({}).countDocuments()

        let output = {
            table,
            list,
            count,
        }
            return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    async listOne(req, res) {
            const findOne = await  UserActivity.findById(req.body._id)
            return res.status(200).json({ data: findOne, message: "New UserActivity finded" });
    }

    async update(req, res) {
        let update = await  bug.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        
        let remove = await bug.deleteOne({_id:req.body._id})
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    }
    

    
}


module.exports = BugController