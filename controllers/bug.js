const bug = require('../models/bug');
const BugActivity = require('../models/bugactivity');
const user = require('../models/user');
// const{ nanoid } = require("nanoid");
// const {ObjectId} = require('mongodb')

class BugController {
    constructor() { }
    async create(req, res) {
        console.log('create bug', req.body)
        const newbug = await new bug(req.body).save();
        let bugNo = req.body.action
        console.log(bugNo)
        let bugAction = ""
        if (bugNo === 0) {
            bugAction = 'created'
        } else if (bugNo === 1) {
            bugAction = 'open'
        } else if (bugNo === 2) {
            bugAction = 'onhold'
        } else if (bugNo === 3) {
            bugAction = 'not a bug'
        } else if (bugNo === 4) {
            bugAction = 'completed'
        }
        let data = await new BugActivity({
            action: bugAction,
            // createdOn: new Date(Date.now()),
            // updatedOn: req.body.updateOn,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            status: req.body.status,
            bug_no: req.body.bug_no,
            bug_id: req.body.bug_id
        }).save();
        console.log(data)
        return res.status(200).json({ success: true, data: data, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let list = await bug.find(({
            $or: 
            [
            { "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "from_id": { $regex: `${req.body.role}`, $options: 'i' } },
            { "to_id": { $regex: `${req.body.email}`, $options: 'i' } },
            { "project_id": { $regex: `${req.body.email}`, $options: 'i' } },
            { "bug_no": { $regex: `${req.body.email}`, $options: 'i' } },
            { "date": { $regex: `${req.body.email}`, $options: 'i' } },
            { "status": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        })).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await bug.find(({
            $or:
            [
            { "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "from_id": { $regex: `${req.body.role}`, $options: 'i' } },
            { "to_id": { $regex: `${req.body.email}`, $options: 'i' } },
            { "project_id": { $regex: `${req.body.email}`, $options: 'i' } },
            { "bug_no": { $regex: `${req.body.email}`, $options: 'i' } },
            { "date": { $regex: `${req.body.email}`, $options: 'i' } },
            { "status": { $regex: `${req.body.email}`, $options: 'i' } }
            ]
        })).countDocuments()
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    async listOne(req, res) {
        const findOne = await bug.findById()
        return res.status(200).json({ data: findOne, message: "New UserActivity finded" });
    }

    async update(req, res) {
        let update = await bug.updateOne()
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {

        let remove = await bug.deleteOne({ _id: req.body._id })
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    }

    // 24.11.2022 // to based list fetch
    async listid(req, res) {
        let list = await bug.find({ to_id: req.body.to_id })
        let count = await bug.find({ to_id: req.body.to_id }).countDocuments()

        let data = await new BugActivity({
            action: req.body.action,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            status: req.body.status,
            bug_no: req.body.bug_no,
            bug_id: req.body.bug_id
        }).save();
        console.log(data)
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    //  24.11.2022  update status of bug
    async updatestatus(req, res) {
        // let data = await new BugActivity({
        //     action:x,
        //     createdBy:req.body.createdBy, 
        //     updatedBy:req.body.updatedBy,
        //     bug_no:req.body.bug_no,
        //     bug_id:req.body.bug_id
        // }).save();
        // console.log(data)
        // let x= bug.status
        // console.log(x)
        let update = await bug.updateOne({ bug_id: req.body.bug_id }, { status: req.body.status })
        console.log(req.body.bug_id)
        let x = req.body.status
        console.log(x)
        console.log(update)
        let bugAction;
        // if(x ===0){
        //   bugAction = 'created'
        // }else if(x ===1){
        //   bugAction = 'open'
        // }else if(x ===2){
        //   bugAction ='onhold'
        // }else if(x ===3){
        //   bugAction ='not a bug'
        // }else if (x ===4){
        //   bugAction ='completed'
        // }
        ((x === 0) ? bugAction = "created" : (x === 1) ? bugAction = "open" : (x === 2) ? bugAction = "onhold" : (x === 3) ? bugAction = "notabug" : (x === 4) ? bugAction = "completed" : {})

        let data = await new BugActivity({
            action: bugAction,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            bug_no: req.body.bug_no,
            bug_id: req.body.bug_id,
            status: req.body.status
        }).save();
        return res.status(200).json({ success: true, data: data, update, message: "new UserActivity updated" });
    }

    //28.11.22


    //  1) update without userid

    async updateBugActivity(req, res) {
        let data = await new BugActivity({
            action: req.body.action,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            status: req.body.status,
            bug_no: req.body.bug_no,
            bug_id: req.body.bug_id
        }).save();
        console.log(data)
        let update = await bug.updateOne({ bug_no: req.body.bug_no }, { status: req.body.status })
        return res.status(200).json({ success: true, data: update, message: 'status changed' })

    }
    // 2) assign the bug to multiple user by using update method

    async updatebug(req, res) {
        let update = await bug.updateOne({ bug_no: req.body.bug_no }, { to_id: req.body.to_id })
        return res.status(200).json({ success: true, data: update, message: 'status changed' })
    }

    // 3) create a random bug number. 

    // async insert(req, res) {
    //     let insert = await  bug.insert({   
    //         "bug" : getNextSequence('bug_no'), 

    //     })
    //     return res.status(200).json({ success: true, data: insert, message: "new UserActivity updated" });
    // }


    // async create(req, res) {
    //     const newbug = await new bug({
    //         to_id: req.body.to_id,
    //         bug_no : Math.floor((Math.random() * 100) + 1),
    //         name: req.body.name
    //         }).save();
    //         console.log(newbug,'newbug console')
    //     return res.status(200).json({ success: true, data: newbug, message: "New UserActivity Created" });
    // }

    // 29.11.2022 
    // 1) populate the to_id from the list response

    async findById(req, res) {
        let findById = await bug.findById({ _id: req.body._id })
            .populate(['to_id'])
        return res.status(200).json({ success: true, data: findById, message: "populated" })
    }


    // 2) Changes in random number


    /*
    async getNextSequenceValue(sequenceName){
        var sequenceDocument = await bug.findAndModify({
           query:{bug_no: sequenceName },
           update: {$inc:{sequence_value:1}},
           new:true
        });
        console.log(sequenceDocument.sequence_value,'hai');
     }
    
    async insert(req,res){
        var insert= await bug.insert({
            "bug_no":getNextSequenceValue("bug_no"),
        })
        return res.status(200).json({ success: true, data: insert, message: "insert" })
    
    }
    */
    // 30/11/2022  (sort)
    async listed(req, res) {
        let list = await bug.findOne({}).sort({ bug_no: -1 })
        console.log(list)
        return res.status(200).json({ success: true, data: list, message: "bug number listed" });
    }

    async createPin(req, res) {
        const admin = await bug.findOne().sort({ bug_no: -1 });
        // console.log(admin)
        let x = admin.bug_no
        x + 1
        console.log(x + 1)
        const newbug = await new bug({
            bug_no: x + 1,
            to_id: req.body.to_id,
            name: req.body.name,
            from_id: req.body.from_id,
            project_id: req.body.project_id,
            date: req.body.date
        }).save();
        console.log(data)
        return res.status(200).json({ success: true, data: newbug, message: "New UserActivity Created" });
    }

    async listedorder(req, res) {
        let list = (await BugActivity.find({ bug_no: req.body.bug_no }).populate({
            path: 'bug_id',
            populate: { path: 'from_id' }
        })
            .populate({
                path: 'bug_id',
                populate: { path: 'to_id' }
            })
            .populate({
                path: 'bug_id',
                populate: { path: 'project_id' }
            })
        )

        // .reverse([BugActivity.action])
        // let listed =  (await BugActivity.find({bug_id:req.body.bug_id}).populate(["bug_id"])).reverse([BugActivity.action])


        // let table = await bug.aggregate(
        //     [
        //         {
        //             $match:{ from_id: ObjectId(req.body.from_id)}
        //         },
        //         {
        //             $lookup:{
        //                 from:"users",
        //                 localField:"from_id",
        //                 foreignField:"_id",
        //                 as:"user details"
        //             }
        //         },


        //     ]
        // )

        console.log(list)
        return res.status(200).json({ success: true, data: list, message: "bug order listed" });
    }
}
module.exports = BugController