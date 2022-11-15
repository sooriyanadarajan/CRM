const Meeting = require('../models/meeting')

class MeetingController {
    constructor() { }

    async create(req, res) {
        const meeting = await new Meeting(req.body).save();
        return res.status(200).json({ success: true, data: meeting, message: "New meeting Created" });
    }

    async list(req, res) {
        let list = await Meeting.find({ deleted: false });
        let count = await Meeting.find({ deleted: false }).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Meeting Listed !" });
    }

    async update(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { subject: req.body.subject };
        console.log(update, filter, 'sfilje')
        let doc = await Meeting.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Meeting Listed updated !" });
    }

    async delete(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { deleted: true };
        let doc = await Meeting.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Meeting Listed deleted!" });
    }
}

module.exports = MeetingController