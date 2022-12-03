const bug = require('../models/bug');
const BugActivity = require('../models/bugactivity');
// const{ nanoid } = require("nanoid");

class BugController {
    constructor() { }

    async create(req, res) {

        const value = await bug.findOne().sort({ bug_no: -1 });
        let bug_no = value.bug_no + 1
        const newbug = await new bug({
            bug_no: bug_no,
            to_id: req.body.to_id,
            name: req.body.name,
            from_id: req.body.from_id,
            project_id: req.body.project_id,
            date: Date.now()
        }).save();

        await new BugActivity({
            action: 'create',
            createdBy: req.user.id,
            updatedBy: req.user.id,
            status: 0,
            bug_no: newbug.bug_no,
            bug_id: newbug._id
        }).save();
        return res.status(200).json({ success: true, data: newbug, message: "New Bug Created" });
    }

    async delete(req, res) {
        let remove = await bug.findOne({ _id: req.params.id })
        remove.deleted = true;
        await remove.save()
        return res.status(200).json({ success: true, data: remove, message: "bug deleted" });
    }

    async buglist(req, res) {
        let list = await bug.find({ to_id: req.body.to_id })
        let count = await bug.find({ to_id: req.body.to_id }).countDocuments();
        console.log(data)
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Bug Listed !" });
    }

    async updatestatus(req, res) {
        let update = await bug.updateOne({ user_id: req.body.user_id, bug_no: req.body.bug_no }, { status: req.body.status })
        let x = req.body.status
        let data = await new BugActivity({
            action: x,
            createdBy: req.user.id,
            updatedBy: req.user.id,
            bug_no: req.body.bug_no,
            bug_id: update.bug_id
        }).save();
        console.log(data)
        return res.status(200).json({ success: true, data: data, message: "new UserActivity updated" });
    }

    //28.11.22


    //  1) update without userid

    async updateBugActivity(req, res) {

        let update = await bug.updateOne({ bug_no: req.body.bug_no }, { status: req.body.status })
        await new BugActivity({
            action: req.body.action,
            createdBy: req.user.id,
            updatedBy: req.user.id,
            bug_no: req.body.bug_no,
            bug_id: update._id
        }).save();
        return res.status(200).json({ success: true, data: update, message: 'status changed' })

    }
    // 2) assign the bug to multiple user by using update method

    async changeassigne(req, res) {
        let update = await bug.updateOne({ bug_no: req.body.bug_no }, { to_id: req.body.to_id })
        return res.status(200).json({ success: true, data: update, message: 'status changed' })
    }

    async findById(req, res) {
        let findById = await bug.findById({ _id: req.body.id })
            .populate(['to_id'])
        return res.status(200).json({ success: true, data: findById, message: "Data found !" })
    }

}


module.exports = BugController