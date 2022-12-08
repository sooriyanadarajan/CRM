const Project = require('../models/project')

class ProjectController {
    constructor() { }

    async create(req, res) {
        const project = await new Project(req.body).save();
        return res.status(200).json({ success: true, data: project, message: "New Project Created" });
    }

    async list(req, res) {
        let list = await Project.find(({
            $or:
                [
                    { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                    { "projectlead": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "team_id": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "expiry": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "status": { $regex: `${req.body.email}`, $options: 'i' } }
                ]
        })
        ).skip((req.body.pageNumber - 1) * req.body.limit).limit(req.body.limit)
        let count = await Project.find(({
            $or:
                [
                    { "name": { $regex: `${req.body.name}`, $options: 'i' } },
                    { "projectlead": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "team_id": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "expiry": { $regex: `${req.body.email}`, $options: 'i' } },
                    { "status": { $regex: `${req.body.email}`, $options: 'i' } }
                ]
        })).countDocuments();
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

        return res.status(200).json({ success: true, data: thing, message: "Task updated!" });
    }

    async delete(req, res) {
        const query = { name: req.body.dname };
        console.log(query, 'query')
        let doc = await Project.deleteOne(query);

        return res.status(200).json({ success: true, data: doc, message: "Task deleted!" });
    }

    // 30/11/2022 team_id api
    async findById(req, res) {
        let findById = await Project.findById({ _id: req.body._id })
            .populate(['team_id'])
            .populate(['projectlead'])
        return res.status(200).json({ success: true, data: findById, message: "populated" })
    }
    // 30/11/2022 projectLead api

    //     async findById1(req, res) {
    //         let findById = await Project.findById({_id: req.body._id} )
    //             .populate(['projectlead'])
    //         return res.status(200).json({ success: true, data: findById, message: "populated" })
    //     }
}

module.exports = ProjectController