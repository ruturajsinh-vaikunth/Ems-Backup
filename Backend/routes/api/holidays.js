import express from 'express'
import Holiday from '../../models/Holidays.js';
import Weekoffs from '../../models/WeekOffs.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
// import { promisify } from 'util';

// const unlinkAsync = promisify(fs.unlink)

const app = express()
app.use(cors())

router.get('/allholidays', (req, res) => {
    Holiday.find().sort({start : 'ascending'})
    .then((Holidays) => res.json(Holidays))
    .catch((err) => res.status(404).json({ noHolidaysfound: 'Not found' }));
});


router.post('/notfloating-holidays', protect, (req, res) => {
  Holiday.find({floating: false, start: {
      $gte: new Date(req.body.startOfYear),
      $lte: new Date(req.body.endOfYear)
    }}).sort({start : 'ascending'})
  .then((Holidays) => res.json(Holidays))
  .catch((err) => res.status(404).json({ noHolidaysfound: 'Not found' }));
});

router.post('/floating-holidays', protect,  (req, res) => {
  Holiday.find({floating: true, start: {
      $gte: new Date(req.body.startOfYear),
      $lte: new Date(req.body.endOfYear)
    }}).sort({start : 'ascending'})
  .then((Holidays) => res.json(Holidays))
  .catch((err) => res.status(404).json({ noHolidaysfound: 'Not found' }));
});

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


router.post('/holidayentry',  protect , upload.single('Image') , (req, res) => {
    Holiday.create({ start : req.body.start, end : req.body.end, holidayTitle: req.body.holidayTitle, allDay: req.body.allDay, floating: req.body.floating, Image : req.file.filename})
    .then((Holiday) => res.json({ msg: 'Holiday added successfully' }))
    .catch(() => res.status(400).json({ error: 'Unable to add this Holiday' }));

});
  
router.post('/editholiday',  protect , upload.single('Image') , (req, res) => {
  if(!req.file){
    Holiday.updateOne({_id: req.body.id}, { $set: {holidayTitle : req.body.holidayTitle} })
    .then((Holiday) => res.json({ msg: 'Holiday Update successfully' }))
    .catch(() => res.status(400).json({ error: 'Unable to add this Holiday' }));
  }
  else{
    const oldPath = path.join('public/images', req.body.oldImage);
    if(fs.existsSync(oldPath)){
      fs.unlink(oldPath, (err) => {
        if(err){
          console.error(err)
          return;
        }
      })
    }
    Holiday.updateOne({_id: req.body.id}, { $set: {holidayTitle : req.body.holidayTitle, Image : req.file.filename } })
    .then((Holiday) => res.json({ msg: 'Holiday Update successfully' }))
    .catch(() => res.status(400).json({ error: 'Unable to add this Holiday' }));
  }
    

});


router.post('/deleteholiday',  protect , (req, res) => {
  const oldPath = path.join('public/images', req.body.oldImage);
    if(fs.existsSync(oldPath)){
      fs.unlink(oldPath, (err) => {
        if(err){
          console.error(err)
          return;
        }
      })
    }
    Holiday.deleteOne({_id: req.body.id})
    .then((Holiday) => res.json({ msg: 'Holiday Delete successfully' }))
    .catch(() => res.status(400).json({ error: 'Unable to add this Holiday' }));

});

router.post('/weekoffentry', (req,res) => {
  const data = req.body;

      Weekoffs.create(data)
      .then((weekoff) => res.json(weekoff))
      .catch(() => res.status(400).json({ error: 'Unable to add this weekoff' }));

})

router.post('/update-weekoffdata', (req,res) => {
    const data = req.body;
     for(let i=0; i<data.length;i++){
      Weekoffs.findOneAndUpdate({Day : data[i].Day}, {
        Day: data[i].Day, 
        value: data[i].value
      })
      .then((weekoff) => res.json(weekoff))
      .catch(() => res.status(400));
     }
    // for(let i=0; i<data.length;i++){
    //   Weekoffs.updateMany({Day: data[i].Day},{$set : {
    //     Day: data[i].Day, 
    //     value: data[i].value
    //   }})
    //   .then((weekoff) => res.json(weekoff))
    //   .catch(() => res.status(400));
    // }
     

})

router.get('/weekoffdata', (req,res) => {

    Weekoffs.find()
      .then((weekoff) => res.json(weekoff))
      .catch(() => res.status(400).json({ error: 'Unable to found weekoff' }));

})

export default router