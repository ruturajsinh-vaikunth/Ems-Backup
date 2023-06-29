import express from 'express'
import Greeting from '../../models/Greetings.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';

router.post('/send-greetings', protect, (req, res) => {
    Greeting.findOne({date: req.body.date, sender: req.body.sender, receiver: req.body.receiver, type: req.body.type, greetings: req.body.greetings})
    .then((response) => {
        if(response === null){
            Greeting.create({date: req.body.date, sender: req.body.sender, receiver: req.body.receiver, type: req.body.type, greetings: req.body.greetings})
            .then((greetings) => res.json(greetings))
            .catch((err) => res.status(404).json(err));
        }else{
            res.status(400).json("Greetings Already sent");
        }
    })
    .catch((err) => console.log(err))
})


router.post('/find-sent-greetings', protect, (req, res) => {
    Greeting.find({sender: req.body.sender})
    .then((response) => res.json(response))
    .catch((err) => console.log(err))
})

router.post('/find-received-greetings', protect, (req, res) => {
    Greeting.find({receiver: req.body.receiver})
    .then((response) => res.json(response))
    .catch((err) => console.log(err))
})



export default router;