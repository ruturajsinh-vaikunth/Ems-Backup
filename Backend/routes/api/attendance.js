import express from 'express'
import Attendance from '../../models/Attendance.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import Joi from 'joi';

router.get('/', protect, (req, res) => {
    Attendance.find()
    .then((attendance) => res.json(attendance))
    .catch((err) => res.status(404).json({ noAttendancefound: 'Not found' }));
});


router.get('/today-attendance', protect, (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Attendance.find({date: {$gte: startOfToday}})
  .then((attendance) => res.json(attendance))
  .catch((err) => res.status(404).json({ noAttendancefound: 'Not found' }));
});

router.post('/entryattendance', protect, (req, res) => {

  const globalArray = req.body.data;
  function validateUser(user)
  {
    const JoiSchema = Joi.object({
      _id : Joi.string(),
      employee_id: Joi.number()
                    .required(),
      date: Joi.date()
            .required(),
      in_time  : Joi.string()
                  .required(),
      out_time :  Joi.string()
                  .required(),
      breakStartTime: Joi.string()
                    .required(),
      breakEndTime: Joi.string()
                    .required(),
      duration: Joi.string()
                .required(),
      type: Joi.string()
            .required(),
      comment: Joi.string()
            .required(),
      firstname: Joi.string(),
      status : Joi.string().allow(null, ''),
      Day: Joi.string(),
      reason: Joi.string().allow(null, ''),
      statusChangeby: Joi.string(),
      updatedAt: Joi.date(),
      createdAt: Joi.date(),
      __v: Joi.number()

    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  }


  for(let i=0; i< globalArray.length; i++){

    const result = validateUser(globalArray[i])
    if(result.error)
    {  
      res.status(400).json({details :result.error.details})
    }
    else{
      Attendance.find({employee_id: globalArray[i].employee_id, date: globalArray[i].date})
      .then((response) => {
        if(response.length === 0){
            Attendance.insertMany({
              in_time : globalArray[i].in_time,
              type: globalArray[i].type,
              date: globalArray[i].date,
              employee_id: globalArray[i].employee_id,
              firstname: globalArray[i].firstname,
              status: "Pending",
              out_time: globalArray[i].out_time,
              breakStartTime: globalArray[i].breakStartTime,
              breakEndTime: globalArray[i].breakEndTime,
              duration: globalArray[i].duration,
              comment: globalArray[i].comment,
          })
            .then(() => res.json({msg : "Ok"}))
            // .then(() => res.status(200))
            .catch((err) => res.status(404));
        }
        else{
               Attendance.findByIdAndUpdate( globalArray[i]._id, {
                in_time : globalArray[i].in_time,
                type: globalArray[i].type,
                date: globalArray[i].date,
                employee_id: globalArray[i].employee_id,
                firstname: globalArray[i].firstname,
                status: "Pending",
                out_time: globalArray[i].out_time,
                breakStartTime: globalArray[i].breakStartTime,
                breakEndTime: globalArray[i].breakEndTime,
                duration: globalArray[i].duration,
                comment: globalArray[i].comment,
              })
              .then(() => res.json({msg : "Updated"}))
              // .then(() => res.status(404))
              .catch((err) => res.status(404));
        }
      })
      .catch((err) => res.status(404));
        // if(!globalArray[i]._id){
        //   Attendance.insertMany({
        //       in_time : globalArray[i].in_time,
        //       type: globalArray[i].type,
        //       date: globalArray[i].date,
        //       employee_id: globalArray[i].employee_id,
        //       firstname: globalArray[i].firstname,
        //       status: globalArray[i].status,
        //       out_time: globalArray[i].out_time,
        //       breakStartTime: globalArray[i].breakStartTime,
        //       breakEndTime: globalArray[i].breakEndTime,
        //       duration: globalArray[i].duration,
        //       comment: globalArray[i].comment,
        //   })
        //     // .then(() => res.json({msg : "Ok"}))
        //     .then(() => res.status(200))
        //     .catch((err) => res.status(404));

        // }
        // else{

        //     Attendance.findByIdAndUpdate( globalArray[i]._id, {
        //       in_time : globalArray[i].in_time,
        //       type: globalArray[i].type,
        //       date: globalArray[i].date,
        //       employee_id: globalArray[i].employee_id,
        //       firstname: globalArray[i].firstname,
        //       status: globalArray[i].status,
        //       out_time: globalArray[i].out_time,
        //       breakStartTime: globalArray[i].breakStartTime,
        //       breakEndTime: globalArray[i].breakEndTime,
        //       duration: globalArray[i].duration,
        //       comment: globalArray[i].comment,
        //     })
        //     // .then(() => res.json({msg : "Ok"}))
        //     .then(() => res.status(404))
        //     .catch((err) => res.status(404).json({ noAttendancefound: 'Not found' }));
        
        // }
    }
  }
});

router.get("/password-forgot", protect,  (req,res) => {

})


router.post('/attendanceinfobyid', protect, (req,res) => {
    let _id = req.body._id;
    Attendance.find({_id: _id})  
    .then((attendance) => res.json(attendance))
      .catch(() => res.status(400).json({ error: 'Unable to find this attendance' }));
});

router.post('/attendanceinfo', protect, (req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    Attendance.find({employee_id: emp_id})  
    .then((employee) => res.json(employee))
      .catch(() => res.status(400).json({ error: 'Unable to find this attendance' }));
});

router.post('/today-attendance', protect, (req,res) => {
  Attendance.find({date: new Date(req.body.today)})
  .then((employee) => res.json(employee))
  .catch(() => res.status(400).json({ error: 'Unable to filter this'}));
})


router.post('/search-attendance', protect,  (req, res) => {
  if(req.body.employee_id === ''){
    Attendance.find({        
          date: {
              $gte: new Date(req.body.SaerchfromDate),
              $lte: new Date(req.body.SearchtoDate)
          }
      }).sort({date : 'ascending'})
      .then((attendance) => res.json(attendance))
      .catch((err) => res.status(404).json({ noattendancefound: err }));
  }else{
    Attendance.find({ 
          employee_id: req.body.employee_id,       
          date: {
              $gte: new Date(req.body.SaerchfromDate),
              $lte: new Date(req.body.SearchtoDate)
          }
      }).sort({date : 'ascending'})
      .then((attendance) => res.json(attendance))
      .catch((err) => res.status(404).json({ noattendancefound: err }));
  }
})

router.post('/statusfilter', protect, (req,res) => {
    Attendance.find({status: req.body.filterstatus})
    .then((employee) => res.json(employee))
    .catch(() => res.status(400).json({ error: 'Unable to filter this'}));
})

router.post('/filterdate', protect, (req,res) => {
    Attendance.find({
      employee_id: req.body.employee_id,
      date: {
        $gte: new Date(req.body.filterfromdate),
        $lte: new Date(req.body.filtertodate)
      }
    })
    .then((employee) => res.json(employee))
    .catch(() => res.status(400).json({ error: 'Unable to filter this'}));
})

router.put('/updatestatus', protect, (req,res) => {
  Attendance.findOneAndUpdate({ _id : req.body._id}, { $set : { status: req.body.attendanceStatus, reason: req.body.reason } })
  .then((employee) => res.json(employee))
  .catch(() => res.status(400).json({ error: 'Unable to edit this status' }));
})

router.put('/approve-attendance', protect, (req,res) => {
  Attendance.findOneAndUpdate({ _id : req.body._id._id}, { $set : { status: req.body._id.status, statusChangeby: req.body._id.statusChangeby} })
  .then((employee) => res.json(employee))
  .catch(() => res.status(400).json({ error: 'Unable to edit this status' }));
})

router.put('/reject-attendance', protect, (req,res) => {
  Attendance.findOneAndUpdate({ _id : req.body._id._id}, { $set : { status: req.body._id.status, reason: req.body._id.reason, statusChangeby: req.body._id.statusChangeby } })
  .then((employee) => res.json(employee))
  .catch(() => res.status(400).json({ error: 'Unable to edit this status' }));
})


router.post('/lastthirtydaysdata', protect, (req,res) => {
  Attendance.find({
    employee_id: req.body.employee_id,
    date: {
      $gte: new Date(req.body.convertLast30Days),
      $lte: new Date(req.body.convertyesterday)
    }
  })
  .then((employee) => 
    res.json(employee)
    )
  .catch(() => res.status(400).json({ error: 'Unable to filter this'}));
})

  export default router