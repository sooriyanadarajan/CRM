const Meeting = require('../models/meeting')

class MeetingController {
    constructor() { }

    async create(req, res) {
        const meeting = await new Meeting(req.body).save();
        return res.status(200).json({ success: true, data: meeting, message: "New meeting Created" });
    }

    async list(req, res) {
        let list = await Meeting.find({
            $or: [
                { "organisedby": { $regex: `${req.body.role}`, $options: 'i' } },
                { "from_time": { $regex: `${req.body.email}`, $options: 'i' } },
                { "to_time": { $regex: `${req.body.name}`, $options: 'i' } },
                { "members": { $regex: `${req.body.name}`, $options: 'i' } },
                { "subject": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        }).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await Meeting.find({
            $or: [
                { "organisedby": { $regex: `${req.body.role}`, $options: 'i' } },
                { "from_time": { $regex: `${req.body.email}`, $options: 'i' } },
                { "to_time": { $regex: `${req.body.name}`, $options: 'i' } },
                { "members": { $regex: `${req.body.name}`, $options: 'i' } },
                { "subject": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        }).countDocuments();
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
    async changeStatus(req, res) {
        const data = await Meeting.findOne({ subject: req.body.subject })
        data.status = !data.status
        data.save();
        // const filter = { organisedby: req.body.organisedby };
        // const update = { status: !status.status};
        // let doc = await Meeting.findOneAndUpdate(filter, update, {
        //     returnOriginal: false
        return res.status(200).json({ success: true, data: data, message: "Meeting Listed status update!" });
    }

}

module.exports = MeetingController