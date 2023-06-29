import express from 'express'
import LeavesPerYear from '../../models/LeavesPeryear.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';

router.get('/', protect, (req, res) => {
    LeavesPerYear.find()
    .then((leave) => res.json(leave))
    .catch((err) => res.status(404).json({ noLeavesfound: 'Not found' }));
});

router.post('/leaveperyearentry', protect, (req, res) => {
  console.log(req.body);
  if(req.body.earnedLeave === "0" || req.body.casualLeave === "0" || req.body.sickLeave === "0" || req.body.compoff === "0" || req.body.floatingLeave === "0"){
    res.status(400).json({msg : "Leave can not be 0 Please Enter Leave value"});
  }else{
    LeavesPerYear.findOne({employee_id: req.body.employee_id})
    .then((response) => 
      {
        if(!response){
          LeavesPerYear.create({ employee_id: req.body.employee_id, EarnedLeave: req.body.earnedLeave, CasualLeave: req.body.casualLeave, SickLeave: req.body.sickLeave, CompOff: req.body.compoff, FloatingLeave : req.body.floatingLeave, year: req.body.year})
          .then((leaves) => res.json({ msg: 'leaves added successfully' }))
          .catch(() => res.status(400).json({ error: 'Unable to add this leaves' }));
        }else{
          LeavesPerYear.updateMany({ employee_id: req.body.employee_id, year: req.body.year}, {$set : {
            EarnedLeave: req.body.earnedLeave, 
            CasualLeave: req.body.casualLeave, 
            SickLeave: req.body.sickLeave, 
            CompOff: req.body.compoff, 
            FloatingLeave : req.body.floatingLeave
          }})
          .then((leave) => 
            res.json({msg: "Leaves Updated Successfully"})
          )
          .catch((e) => res.status(400).json(e))
        }
      })
    .catch((e) => res.status(400).json(e))
    }
});

router.post('/leavebyempid', protect, (req,res) => {
    LeavesPerYear.findOne({employee_id : req.body.employee_id, year: req.body.year})
    .then((leaves) => {
      if(!leaves){
        res.json({msg : "No Data"})
      }else{
        res.json(leaves)
      }
    })
    .catch(() => res.status(400).json({ error: 'Unable to find this leaves' }));
})

router.post('/updateleaves', (req,res) => {
  LeavesPerYear.findByIdAndUpdate(req.body[0]._id,{
      EarnedLeave: req.body[0].EarnedLeave,
      CasualLeave: req.body[0].CasualLeave,
      SickLeave: req.body[0].SickLeave,
      CompOff : req.body[0].CompOff,
      FloatingLeave: req.body[0].FloatingLeave
  }
  )
    .then((leaves) => res.json({leaves}))
    .catch(() => res.status(400).json({ error: 'Unable to find this leaves' }));
})

  export default router