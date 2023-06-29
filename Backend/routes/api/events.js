import express from 'express'
import Event from '../../models/event.js';
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

router.get('/all-events', protect, (req,res) => {
    Event.find().sort({startdate : 'ascending'})
    .then((events) => res.json(events))
    .catch((e) => res.status(400).json(e))
})

router.post('/add-event',  protect, upload.fields([
    {name: 'eventimage', maxCount: 1},
    {name: 'image', maxCount: 10}
    ]), (req, res) => {

    if(req.files.image){
      const reqEventGallery = req.files.image
      const reqEventImage = req.files.eventimage
      const eventgallery_data = []
      for(let i=0; i<reqEventGallery.length; i++){
  
          let file_name = reqEventGallery[i].filename;
          
          eventgallery_data.push({image : file_name})
          
      }
      const eventimage = reqEventImage[0].filename
      
  
    
      Event.create({ title : req.body.title, description : req.body.description, startdate: req.body.startdate, enddate: req.body.enddate, mode: req.body.mode, eventimage : eventimage, eventgallery : eventgallery_data })
      .then((event) => res.json({ msg: 'Event added successfully' }))
      .catch((e) => res.json(e));
    }
    else{
      
      const reqEventImage = req.files.eventimage
      const eventimage = reqEventImage[0].filename
      
  
    
      Event.create({ title : req.body.title, description : req.body.description, startdate: req.body.startdate, enddate: req.body.enddate, mode: req.body.mode, eventimage : eventimage})
      .then((event) => res.json({ msg: 'Event added successfully' }))
      .catch((e) => res.json(e));
    }



});

router.post('/find-event', protect, (req,res) => {
    Event.findOne({_id : req.body._id})
    .then((event) => res.json(event))
    .catch((e) => res.status(400).json(e))
})
  
router.post('/edit-event',  protect,  upload.fields([
  {name: 'eventimage', maxCount: 1},
  {name: 'image', maxCount: 10}
  ]), (req, res) => {
  if(!req.files){
        Event.updateOne({_id: req.body._id}, { $set: {title : req.body.title, description : req.body.description, startdate : req.body.startdate, enddate : req.body.enddate, mode: req.body.mode} })
        .then((Event) => res.json({ msg: 'Event Update successfully' }))
        .catch(() => res.status(400).json({ error: 'Unable to update this Event' }));
  }
  else{
   
    if(req.body.oldEventImage && !req.body.oldEventGalleryimage){
      const reqEventImage = req.files.eventimage
      const eventimage = reqEventImage[0].filename
      const oldPath = path.join('public/images', req.body.oldEventImage);
      if(fs.existsSync(oldPath)){
        fs.unlink(oldPath, (err) => {
          if(err){
            console.error(err)
            return;
          }
        })
      }
      Event.updateOne({_id: req.body._id}, { $set: {title : req.body.title, description : req.body.description, startdate : req.body.startdate, enddate : req.body.enddate, mode: req.body.mode, eventimage: eventimage} })
        .then((Event) => res.json({ msg: 'Event Update successfully' }))
        .catch(() => res.status(400).json({ error: 'Unable to update this Event' }));
    }
    if(req.body.oldEventGalleryimage && !req.body.oldEventImage){
      console.log(JSON.parse(req.body.oldEventGalleryimage));


      const files = JSON.parse(req.body.oldEventGalleryimage)
      for(let i=0;i<files.length;i++){
        const oldPath = path.join('public/images', files[i].oldimage);
         if(fs.existsSync(oldPath)){
            fs.unlink(oldPath, (err) => {
              if(err){
                console.error(err)
                return;
              }
            })
          }
      }


      const reqEventGallery = req.files.image
      const eventgallery_data = []
      for(let i=0; i<reqEventGallery.length; i++){
  
          let file_name = reqEventGallery[i].filename;
          
          eventgallery_data.push({image : file_name})
          
      }

      Event.updateOne({_id: req.body._id}, { $set: {title : req.body.title, description : req.body.description, startdate : req.body.startdate, enddate : req.body.enddate, mode: req.body.mode, eventgallery: eventgallery_data} })
        .then((Event) => res.json({ msg: 'Event Update successfully' }))
        .catch(() => res.status(400).json({ error: 'Unable to update this Event' }));

    }
    if(req.body.oldEventImage && req.body.oldEventGalleryimage){

      const reqEventImage = req.files.eventimage
      const eventimage = reqEventImage[0].filename
      const oldPath = path.join('public/images', req.body.oldEventImage);
      if(fs.existsSync(oldPath)){
        fs.unlink(oldPath, (err) => {
          if(err){
            console.error(err)
            return;
          }
        })
      }

      const files = JSON.parse(req.body.oldEventGalleryimage)
      for(let i=0;i<files.length;i++){
        const oldPath = path.join('public/images', files[i].oldimage);
         if(fs.existsSync(oldPath)){
            fs.unlink(oldPath, (err) => {
              if(err){
                console.error(err)
                return;
              }
            })
          }
      }


      const reqEventGallery = req.files.image
      const eventgallery_data = []
      for(let i=0; i<reqEventGallery.length; i++){
  
          let file_name = reqEventGallery[i].filename;
          
          eventgallery_data.push({image : file_name})
          
      }

      Event.updateOne({_id: req.body._id}, { $set: {title : req.body.title, description : req.body.description, startdate : req.body.startdate, enddate : req.body.enddate, mode: req.body.mode, eventimage: eventimage, eventgallery: eventgallery_data} })
        .then((Event) => res.json({ msg: 'Event Update successfully' }))
        .catch(() => res.status(400).json({ error: 'Unable to update this Event' }));
    }
  }

});


router.post('/delete-event',  protect , (req, res) => {
  const oldPath = path.join('public/images', req.body.oldimage);
    if(fs.existsSync(oldPath)){
      fs.unlink(oldPath, (err) => {
        if(err){
          console.error(err)
          return;
        }
      })
    }

    const files = req.body.oldgallery
    for(let i=0;i<files.length;i++){
      const oldPath = path.join('public/images', files[i].image);
       if(fs.existsSync(oldPath)){
          fs.unlink(oldPath, (err) => {
            if(err){
              console.error(err)
              return;
            }
          })
        }
    }

    Event.deleteOne({_id: req.body._id})
    .then((Event) => res.json({ msg: 'Event Delete successfully' }))
    .catch(() => res.status(400).json({ error: 'Unable to delete this Event' }));

});



export default router