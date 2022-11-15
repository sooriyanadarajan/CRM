const Project = require('../models/project')

class ProjectController {
    constructor() { }

    async create(req, res) {
        const project = await new Project(req.body).save();
        return res.status(200).json({ success: true, data:project, message: "New Project Created" });
    }

    async list(req, res) {
        let list = await Project.find().skip((req.body.pageNumber - 1) * req.body.limit).limit(req.body.limit)
        let count = await Project.find({deleted:true}).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Project Listed !" });
    }

    async update(req, res) {
        const query = { name:req.body.sname};
        const updateDocument = {
          $set: {name:req.body.cname}
        };
        let thing= await Project.updateOne(query,updateDocument);
        
        return res.status(200).json({ success: true, data: thing, message: "Task updated!" });
    }

    async delete(req, res) {
        const query = { name:req.body.dname};
       console.log(query,'query')
        let doc= await Project.deleteOne(query);
        
        return res.status(200).json({ success: true, data:doc, message: "Task deleted!" });
    }
}

module.exports = ProjectController