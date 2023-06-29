import express from 'express'
import multer from 'multer';
import cors from 'cors';
import Leaves from '../../models/Leaves.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import fs from 'fs';
import path from 'path';

const app = express()
app.use(cors())

router.get('/', protect, (req, res) => {
    Leaves.find()
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
});

router.post('/empIdleavescurrentyear', protect , (req,res) => {
    Leaves.find({
        employee_id: req.body.employee_id,
        date: {
            $gte: req.body.startDate,
            $lte: req.body.endDate,
        }
    })
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
})

router.post('/today-leaves', protect , (req,res) => {
    Leaves.find({date: new Date(req.body.today)})
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
})


router.post('/leavescurrentyear', protect,  (req, res) => {
    if(req.body.dateType === 'Applied Date'){
        if(req.body.filterLeavetype === "All" && req.body.filterstatus === "All")
        {    
            Leaves.find({ 
                employee_id: req.body.employee_id,       
                createdAt : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({createdAt : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
        }
        if(req.body.filterLeavetype !== "All" && req.body.filterstatus !== "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                leave_type : req.body.filterLeavetype,
                status: req.body.filterstatus,       
                createdAt : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({createdAt : 'ascending'})
            .then((leave) =>  res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
        if(req.body.filterLeavetype === "All" && req.body.filterstatus !== "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                status: req.body.filterstatus,       
                createdAt : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({createdAt : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
        if(req.body.filterLeavetype !== "All" && req.body.filterstatus === "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                leave_type : req.body.filterLeavetype,
                createdAt : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({createdAt : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
    }
    else{
        if(req.body.filterLeavetype === "All" && req.body.filterstatus === "All")
        {    
            Leaves.find({ 
                employee_id: req.body.employee_id,       
                date : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({date : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
        }
        if(req.body.filterLeavetype !== "All" && req.body.filterstatus !== "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                leave_type : req.body.filterLeavetype,
                status: req.body.filterstatus,       
                date : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({date : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
        if(req.body.filterLeavetype === "All" && req.body.filterstatus !== "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                status: req.body.filterstatus,       
                date : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({date : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
        if(req.body.filterLeavetype !== "All" && req.body.filterstatus === "All"){
            Leaves.find({ 
                employee_id: req.body.employee_id,
                leave_type : req.body.filterLeavetype,
                date : {
                    $gte: new Date(req.body.newfirstdayofyear),
                    $lte: new Date(req.body.newlastdayofyear)
                }
            }).sort({date : 'ascending'})
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));  
        }
    }

});


router.post('/search-leaves', protect,  (req, res) => {
    if(req.body.employee_id === ''){
        Leaves.find({ date: {
                $gte: new Date(req.body.SaerchfromDate),
                $lte: new Date(req.body.SearchtoDate)
            }
        }).sort({date : 'ascending'})
        .then((leave) => res.json(leave))
        .catch((err) => res.status(404).json({ noLeavesfound: err }));
    }else{
        Leaves.find({ 
            employee_id: req.body.employee_id,       
            date: {
                $gte: new Date(req.body.SaerchfromDate),
                $lte: new Date(req.body.SearchtoDate)
            }
        }).sort({date : 'ascending'})
        .then((leave) => res.json(leave))
        .catch((err) => res.status(404).json({ noLeavesfound: err }));
    }
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        let str = (file.mimetype).toString();
        let Trimstr = str.substring(str.indexOf("/") + 1);
        let filename =  (file.originalname).toString() + "." + Trimstr
        cb(null, filename)
    },
})
  
const upload = multer({ storage: storage })

router.post('/leavesadd', protect ,  upload.array('attachment',12), (req, res) => {

    

    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({attachment : file_name})
        
    }

    const newglobalArray = JSON.parse(req.body.globalArray);

    
    for(let i=0; i< newglobalArray.length; i++){

        Leaves.findOne({employee_id :newglobalArray[i].employee_id, date: newglobalArray[i].date})
        .then(leave => {
            if(leave === null){
                return
            }else{
             for(let i=0; i<leave.files.length; i++){
                const oldPath = path.join('public/images', leave.files[i].attachment);
                if(fs.existsSync(oldPath)){
                fs.unlink(oldPath, (err) => {
                    if(err){
                    console.error(err)
                    return;
                    }
                })
                }
             }
            }
        })
        .catch(e => {console.log(e)})
        
            Leaves.updateMany({employee_id :newglobalArray[i].employee_id, date: newglobalArray[i].date}, {$set : {
                            employee_id: newglobalArray[i].employee_id,
                            date: new Date(newglobalArray[i].date),
                            leave_type: newglobalArray[i].leave_type,
                            duration: newglobalArray[i].duration,
                            status: newglobalArray[i].status,
                            files: final_data,
            }})
            .then((leave) => 
                {
                    if(leave.modifiedCount === 1){
                        res.json({leave})
                    }else{
                        Leaves.insertMany({
                                employee_id: newglobalArray[i].employee_id,
                                date: new Date(newglobalArray[i].date),
                                leave_type: newglobalArray[i].leave_type,
                                duration: newglobalArray[i].duration,
                                status: newglobalArray[i].status,
                                files: final_data,
                                })
                            .then(() => res.json({msg : "Ok"}))
                            .catch((err) => res.status(404));
                    }
                }
                
            )
            .catch((err) => res.status(404))
      }


});

router.post('/specialleavesadd', protect , upload.array('attachment',12),(req,res) => {
    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({attachment : file_name})
        
    }

    Leaves.findOne({employee_id : req.body.employee_id, from_date: new Date(req.body.from_date), to_date: new Date(req.body.to_date)})
    .then(leave => {
        if(leave === null){
            return
        }else{
         for(let i=0; i<leave.files.length; i++){
            const oldPath = path.join('public/images', leave.files[i].attachment);
            if(fs.existsSync(oldPath)){
            fs.unlink(oldPath, (err) => {
                if(err){
                console.error(err)
                return;
                }
            })
            }
         }
        }
    })
    .catch(e => {console.log(e)})

    Leaves.updateMany({employee_id : req.body.employee_id, from_date: new Date(req.body.from_date), to_date: new Date(req.body.to_date)}, {$set : {
        employee_id: req.body.employee_id,
        from_date: new Date(req.body.from_date),
        to_date: new Date(req.body.to_date),
        leave_type: req.body.leave_type,
        status: req.body.status,
        files: final_data,
    }})
        .then((leave) => 
        {
        if(leave.modifiedCount === 1){
            res.json({leave})
        }else{
            Leaves.insertMany({
                        employee_id: req.body.employee_id,
                        from_date: new Date(req.body.from_date),
                        to_date: new Date(req.body.to_date),
                        leave_type: req.body.leave_type,
                        status: req.body.status,
                        files: final_data,
                    })
                .then(() => res.json({msg : "Ok"}))
                .catch((err) => res.status(404));
            }
        }

        )
        .catch((err) => res.status(404))
})

router.post('/updatebycurrentdate' , (req, res) => {
    
    const DisplayDataofAllLeaves = req.body.DisplayDataofAllLeaves

    for(let i=0; i< DisplayDataofAllLeaves.length;i++){
        Leaves.findByIdAndUpdate(DisplayDataofAllLeaves[i]._id,
            {
                status : DisplayDataofAllLeaves[i].status
            })
            .then((leave) => res.json(leave))
            .catch((err) => res.status(404));
    }
})

router.post('/approval', protect,  (req, res) => {
    Leaves.findByIdAndUpdate(req.body._id._id,{
        status : req.body._id.status
    })
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404));
})

router.post('/cancel-request', protect , (req,res) => {
    Leaves.findByIdAndUpdate(req.body._id._id,{
        status: req.body._id.status
    })
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404));
})

router.post('/approval-cancel-request', protect , (req,res) => {
    Leaves.findByIdAndUpdate(req.body._id._id,{
        status: req.body._id.status
    })
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404));
})


router.post('/leavebyempid', protect , (req,res) => {
    Leaves.find({employee_id : req.body.employee_id})
    .then((leaves) => res.json({leaves}))
    .catch(() => res.status(400).json({ error: 'Unable to find this leaves' }));
})

router.post('/leavebyid', protect , (req,res) => {
    Leaves.findOne({_id : req.body._id})
    .then((leaves) => res.json({leaves}))
    .catch(() => res.status(400).json({ error: 'Unable to find this leave' }));
})

  export default router