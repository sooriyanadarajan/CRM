const Meeting = require('../models/meeting')

class MeetingController {
    constructor() { }

    async create(req, res) {
        const meeting = await new Meeting(req.body).save();
        return res.status(200).json({ success: true, data: meeting, message: "New meeting Created" });
    }

    async list(req, res) {
        let list = await Meeting.find({ organisedby: req.user.id, deleted: false })
            .skip((req.body.page - 1) * req.body.limit).limit(req.body.limit)
        let count = await Meeting.find({ organisedby: req.user.id, deleted: false }).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Meeting Listed !" });
    }

    async update(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { subject: req.body.subject };
        let doc = await Meeting.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Meeting Listed updated !" });
    }

    async delete(req, res) {
        let doc = await Meeting.findOne({ _id: req.body.id })
        doc.deleted = true
        await doc.save()
        return res.status(200).json({ success: true, data: doc, message: "Meeting deleted!" });
    }

    async changeStatus(req, res) {
        const data = await Meeting.findOne({ _id: req.body.id })
        data.status = !data.status
        data.save();
        return res.status(200).json({ success: true, data: data, message: "Meeting Listed status update!" });
    }

}

module.exports = MeetingController