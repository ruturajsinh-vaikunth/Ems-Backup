import express from 'express'
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import PoliciesDocument from '../../models/PoliciesDocument.js';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express()
app.use(cors())

router.get('/all-policies-documents', protect, (req, res) => {
    PoliciesDocument.find()
    .then((document) => res.json(document))
    .catch((err) => res.status(404).json({ nodocumentfound: 'Not found' }));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post('/add-policies-documents',  protect , upload.single('file') , (req, res) => {

    PoliciesDocument.create({ type : req.body.type, file: req.file.filename})
    .then((document) => res.json(document))
    .catch(() => res.status(400).json({ error: 'Unable to add this document' }));

});
  


router.post('/delete-policies-documents',  protect , (req, res) => {
    const oldPath = path.join('public/images', req.body.file);
    if(fs.existsSync(oldPath)){
        fs.unlink(oldPath, (err) => {
            if(err){
            console.error(err)
            return;
            }
        })
    }
    PoliciesDocument.deleteOne({_id: req.body._id})
    .then((document) => {
        res.json({ msg: 'PoliciesDocument Delete successfully' });
    })
    .catch(() => res.status(400).json({ error: 'Unable to delete this PoliciesDocument' }));

});






export default router