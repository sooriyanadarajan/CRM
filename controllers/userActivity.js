const UserActivity = require('../models/UserActivity')

class UserActivityController {
    constructor() { }

    async create(req, res) {
        const newUserActivity = await new UserActivity(req.body).save();
        return res.status(200).json({ success: true, data: newUserActivity, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let list = await UserActivity.find();

        return res.status(200).json({ success: true, data: list, message: "UserActivity Listed !" });
    }

    async listOne(req, res) {
            console.log(req.body)
            const findOne = await  UserActivity.findById(req.body._id)
            console.log(findOne)
            return res.status(200).json({ data: findOne, message: "New UserActivity finded" });
    }

    async update(req, res) {
        let update = await  UserActivity.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        console.log(req.body)
        let remove = await UserActivity.deleteOne({_id:req.body._id})
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });


    }
}


module.exports = UserActivityController 