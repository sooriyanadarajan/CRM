const Course = require('../models/course')

class CourseController {
    constructor() { }


    async create(req, res) {
        const task = await new Course(req.body).save();
        return res.status(200).json({ success: true, data: task, message: "New Task Created" });
    }

    async list(req, res) {
        let list = await Course.find(({
            $or: [{ "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "from": { $regex: `${req.body.role}`, $options: 'i' } },
            { "to": { $regex: `${req.body.email}`, $options: 'i' } },
            { "date": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        })).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
        let count = await Course.find({
            $or: [{ "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "from": { $regex: `${req.body.role}`, $options: 'i' } },
            { "to": { $regex: `${req.body.email}`, $options: 'i' } },
            { "date": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        }).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Task Listed !" });
    }

    async find(req, res) {
        let find = await Course.find()
            .populate(['project_id', 'admin_id', 'user_id']).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit)
            .exec()
        return res.status(200).json({ success: true, data: find, message: 'populate' })

    }

    async update(req, res) {
        let update = await Course.updateOne({ _id: req.body._id }, req.body);
        return res.status(200).json({ success: true, data: update, message: "task update" })

    }
    async delete(req, res) {
        let remove = await Course.deleteOne(req.body._id)
        return res.status(200).json({ success: true, data: remove, message: "task delete" })
    }

    async change(req, res) {
        let a = await Course.findOne({ _id: req.body._id });
        console.log(a)
        a.active = !a.active
        a.save();
        return res.status(200).json({ success: true, data: a, message: "change" })
    }
}

module.exports = CourseController

