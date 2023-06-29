
import express from 'express'
import Project from '../../models/Projects.js';
import multer from 'multer';
import Task from '../../models/Task.js';
import TaskNotes from '../../models/TaskNote.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const app = express()
app.use(cors())

router.get('/all-project', protect, (req, res) => {
    Project.find().sort({createdAt : 'ascending'})
    .then((Project) => res.json(Project))
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
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


router.post('/add-project', protect, upload.array('file',12), (req, res) => {

    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({file : file_name, upload_by: req.body.upload_by})
        
    }

    Project.create({project_name: req.body.project_name, description: req.body.description, hours: req.body.hours, project_note: req.body.project_note, assign_to: req.body.assign_to, created_by: req.body.created_by, status: 'In Complete', files: final_data})
    .then((Project) => res.json({msg : "Added"}))
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
});


router.post('/add-project-files', protect, upload.array('file',12), (req, res) => {

    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({file : file_name, upload_by: req.body.upload_by})
        
    }

    Project.findByIdAndUpdate(req.body._id, {$addToSet : {"files" : final_data}})
    .then((Project) => {
        res.json({msg : "Added"})
    })
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
});


router.post('/add-task-files', protect, upload.array('file',12), (req, res) => {

    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({file : file_name, upload_by: req.body.upload_by})
        
    }

    Task.findByIdAndUpdate(req.body._id, {$addToSet : {"files" : final_data}})
    .then((Task) => {
        res.json({msg : "Added"})
    })
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
});


router.post('/update-project', protect, (req, res) => {
    Project.findByIdAndUpdate(req.body._id,{project_name: req.body.project_name, description: req.body.description, hours: req.body.hours, project_note: req.body.project_note, assign_to: req.body.assign_to, status: req.body.status})
    .then((Project) => res.json(Project))
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
});

router.post('/edit-project-file', protect, upload.single('file'), (req, res) => {

    const oldPath = path.join('public/images', req.body.oldfilename);
        if(fs.existsSync(oldPath)){
          fs.unlink(oldPath, (err) => {
            if(err){
              console.error(err)
              return;
            }
          })
    }
    
    Project.findOneAndUpdate({_id: req.body._id, 'files._id' : req.body.oldfileid}, {$set: {
        'files.$.file' : req.file.filename
    }})
    .then((Project) => {
        res.json({msg: 'Updated'})
    })
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
})


router.post('/edit-task-file', protect, upload.single('file'), (req, res) => {

    const oldPath = path.join('public/images', req.body.oldfilename);
        if(fs.existsSync(oldPath)){
          fs.unlink(oldPath, (err) => {
            if(err){
              console.error(err)
              return;
            }
          })
    }
    
    Task.findOneAndUpdate({_id: req.body._id, 'files._id' : req.body.oldfileid}, {$set: {
        'files.$.file' : req.file.filename
    }})
    .then((task) => {
        res.json({msg: 'Updated'})
    })
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
})

router.post('/delete-projectfile', protect, (req, res) => {
    
    Project.findByIdAndUpdate(req.body._id, {$pull : {"files" : {_id : req.body.fileId}}},{ safe: true, upsert: true })
    .then((Project) => {
        const oldPath = path.join('public/images', req.body.fileName);
        if(fs.existsSync(oldPath)){
          fs.unlink(oldPath, (err) => {
            if(err){
              console.error(err)
              return;
            }
            else{
                res.json(Project)
            }
          })
    }
        
    })
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
})

router.post('/delete-taskfile', protect, (req, res) => {
    
    Task.findByIdAndUpdate(req.body._id, {$pull : {"files" : {_id : req.body.fileId}}},{ safe: true, upsert: true })
    .then((task) => {
        const oldPath = path.join('public/images', req.body.fileName);
        if(fs.existsSync(oldPath)){
          fs.unlink(oldPath, (err) => {
            if(err){
              console.error(err)
              return;
            }
            else{
                res.json(task)
            }
          })
    }
        
    })
    .catch((err) => res.status(404).json({ noProjectfound: 'Not found' }));
})

router.post('/add-task', protect, upload.array('file',12), (req, res) => {

    const final_data = []
    for(let i=0; i<req.files.length; i++){

        let file_name = req.files[i].filename;
        
        final_data.push({file : file_name, upload_by: req.body.upload_by})
        
    }

    Task.create({task_name: req.body.task_name, description: req.body.description, task_hours: req.body.task_hours, task_note: req.body.task_note, due_date: req.body.due_date, assign_to: req.body.assign_to, assign_by: req.body.assign_by, project_id: mongoose.Types.ObjectId(req.body.project_id), status: 'In Complete', files: final_data})
    .then((task) => res.json({msg : "Added"}))
    .catch((err) => res.status(404).json({ notAdded: 'Not Added' }));
});


router.post('/update-task', protect, (req, res) => {
    Task.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id),{task_name: req.body.task_name, description: req.body.description, task_hours: req.body.task_hours, task_note: req.body.task_note, due_date: req.body.due_date, assign_to: req.body.assign_to, update_by: req.body.update_by})
    .then((task) => res.json(task))
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});


router.post('/update-taskstatus', protect, (req, res) => {
    Task.findByIdAndUpdate(req.body._id,{status: req.body.status})
    .then((task) => res.json(task))
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});



router.post('/find-task-empid', protect, async (req, res) => {
    Task.find({assign_to: req.body.employee_id})
    .then((task) => {
        Task.aggregate([
            { 
                $lookup:{  
                            from: 'projects',
                            localField: 'project_id', foreignField: '_id',
                            as: 'ProjectData'
                         }
            },
            {
                $unwind:"$ProjectData"
            },
        ]).exec((error, result) => {
            if (error) {
                console.log('error - ', error);
          
            } else {
                 res.json(result)
            }
        })

        // lookup({
        //     from: 'projects',
        //     localField: 'project_id', foreignField: '_id',
        //     as: 'ProjectData'
        // }).
    })
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});


router.post('/find-project-byid', protect, async (req, res) => {
    Project.findOne({_id: req.body._id})
    .then((Project) => {
        res.json(Project)
    })
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});


router.post('/find-taskby-projectid', protect, async (req, res) => {
    Task.find({project_id:  mongoose.Types.ObjectId(req.body._id)})
    .then((Task) => {
        res.json(Task)
    })
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});

router.post('/find-taskbyid', protect, async (req, res) => {
    Task.findOne({_id: req.body._id})
    .then((Task) => {
        res.json(Task)
    })
    .catch((err) => res.status(404).json({ noTaskfound: 'Not found' }));
});

router.post('/find-tasknote-bytaskid', protect, async (req, res) => {
    TaskNotes.find({task_id: mongoose.Types.ObjectId(req.body._id)}).sort({createdAt : 'descending'}).limit(req.body.limit)
    .then((TaskNotes) => {
        res.json(TaskNotes)
    })
    .catch((err) => res.status(404).json({ noTaskNotesfound: 'Not found' }));
});


router.post('/add-tasknote', protect, async (req, res) => {
    TaskNotes.create({task_id: mongoose.Types.ObjectId(req.body.task_id), task_note: req.body.task_note, added_by: req.body.added_by})
    .then((TaskNote) => {
        res.json(TaskNote)
    })
    .catch((err) => res.status(404).json({ notAddedTaskNote: 'Not Added' }));
});


router.post('/update-tasknote', protect, (req, res) => {
    TaskNotes.findByIdAndUpdate(req.body._id,{task_note: req.body.task_note})
    .then((tasknote) => res.json(tasknote))
    .catch((err) => res.status(404).json({ noTaskNotefound: 'Not found' }));
});


router.post('/delete-tasknote', protect, (req, res) => {
    TaskNotes.findByIdAndDelete(req.body._id)
    .then((tasknote) => res.json(tasknote))
    .catch((err) => res.status(404).json({ noTaskNotefound: 'Not found' }));
});

export default router