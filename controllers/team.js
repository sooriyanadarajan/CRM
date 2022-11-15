const team = require('../models/team')

class Team {
    constructor() { }

    async create(req, res) {
        const newteam = await new team(req.body).save();
        return res.status(200).json({ success: true, data: newteam, message: "New Team  Created" });
    }

    async list(req, res) {
        let list = await team.find({deleted:false});
        return res.status(200).json({ success: true, data: list, message: "Team Listed !" });
    }

    async update(req, res) {
        let update = await  team.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        let remove = await team.deleteOne({_id:req.body._id})
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    } 
}


module.exports = Team