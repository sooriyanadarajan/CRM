const bug = require('../models/bug')
// const{ nanoid } = require("nanoid");

class BugController {
    constructor() {}
    async create(req, res) {
        console.log('create bug',req.body)
        const newbug = await new bug(req.body).save();
        return res.status(200).json({ success: true, data: newbug, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let list = await bug.find({ to_id: req.body.to_id })
        let count = await bug.find({ to_id: req.body.to_id }).countDocuments()

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
    async list(req, res) {
        let list = await bug.find({ to_id: req.body.to_id })
        let count = await bug.find({ to_id: req.body.to_id }).countDocuments()

        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    //  24.11.2022  update status of bug
    async update(req, res) {
        console.log('this update working')
        let update = await bug.updateOne({ user_id: req.body.user_id, bug_no: req.body.bug_no }, { status: req.body.status })
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    //28.11.22


    //  1) update without userid

    async update(req, res) {
        let update = await bug.updateOne({ bug_no: req.body.bug_no }, { status: req.body.status })
        return res.status(200).json({ success: true, data: update, message: 'status changed' })

    }
    // 2) assign the bug to multiple user by using update method

    async update(req, res) {
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
    let findById = await bug.findById({_id: req.body._id} )
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
    let list = await bug.findOne({}).sort({bug_no:-1})
    console.log(list)
    return res.status(200).json({ success: true, data: list , message: "bug number listed" });
}

async createPin(req, res) {
    const admin = await bug.findOne().sort({bug_no:-1});
    // console.log(admin)
     let x= admin.bug_no
     x+1
    console.log(x+1)
    const newbug = await new bug({
        bug_no:x +1,
        to_id:req.body.to_id,
        name:req.body.name,
        from_id:req.body. from_id,
        project_id:req.body. project_id,
        date:req.body.date        
    }).save();
    
    return res.status(200).json({ success: true, data: newbug, message: "New UserActivity Created" });
}
}


module.exports = BugController