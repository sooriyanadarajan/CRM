const Project = require('../models/project')

class ProjectController {
    constructor() { }

    async create(req, res) {
        const project = await new Project(req.body).save();
        return res.status(200).json({ success: true, data: project, message: "New Project Created" });
    }

    async list(req, res) {
        let list = await Project.find({ name: { $regex: req.body.name, $options: 'i' } })
            .skip((req.body.page - 1) * req.body.limit).limit(req.body.limit)
        let count = await Project.find({ name: { $regex: req.body.name, $options: 'i' } }).countDocuments();
        let output = {
            list,
            count
        }
        return res.status(200).json({ success: true, data: output, message: "Project Listed !" });
    }

    async update(req, res) {
        const query = { name: req.body.sname };
        const updateDocument = {
            $set: { name: req.body.cname }
        };
        let thing = await Project.updateOne(query, updateDocument);

        return res.status(200).json({ success: true, data: thing, message: "Project updated!" });
    }

    async delete(req, res) {
        let doc = await Project.findOne({ name: req.params.pname })
        doc.deleted = true
        await doc.save()
        return res.status(200).json({ success: true, data: doc, message: "Project deleted!" });
    }

    async findProject(req, res) {
        let data = await Project.findById({ _id: req.params.id })
            .populate(['team_id'])
            .populate(['lead_id'])
        return res.status(200).json({ success: true, data: data, message: "Project details listed" })
    }
}

module.exports = ProjectController