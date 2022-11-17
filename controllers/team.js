const team = require('../models/team')

class Team {
    constructor() { }
    async create(req, res) {
        const newteam = await new team(req.body).save();
        return res.status(200).json({ success: true, data: newteam, message: "New Team  Created" });
    }

    async list(req, res) {
    
    let list = await team.find({name:{$regex:req.body.name, $options: 'i'}})
     .skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
    console.log(req.body.name);
    let count = await team.find({}).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Team Listed !" });
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