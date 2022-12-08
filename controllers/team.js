const team = require('../models/team')

class Team {
    constructor() { }
    async create(req, res) {
        const newteam = await new team(req.body).save();
        return res.status(200).json({ success: true, data: newteam, message: "New Team  Created" });
    }

    async list(req, res) {
        let list = await team.find({
            $or:
                [
                    { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                    { "members": { $regex: `${req.body.role}`, $options: 'i' } },
                    { "teamLeader": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "reportingPerson": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "status": { $regex: `${req.body.email}`, $options: 'i' } }
                ]
        })
        console.log(req.body.name);
        let count = await team.find({
            $or:
                [
                    { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                    { "members": { $regex: `${req.body.role}`, $options: 'i' } },
                    { "teamLeader": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "reportingPerson": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "status": { $regex: `${req.body.email}`, $options: 'i' } }
                ]
        }).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Team Listed !" });
    }

    async update(req, res) {
        let update = await team.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        let remove = await team.deleteOne(
            { _id: req.body._id },
            { $pop: { members: req.body.members } })
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    }

    // 29/11/2022
    // 1) API for adding a member into the team 
    async updatemembers(req, res) {
        let update = await team.updateOne(
            { _id: req.body._id },
            { $push: { members: req.body.members } })
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }
    // 30/11/2022 api for deleting members in the team
    async updatemember1(req, res) {
        let update = await team.updateOne(
            { _id: req.body._id },
            { $pop: { members: -1 } })
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

}


module.exports = Team