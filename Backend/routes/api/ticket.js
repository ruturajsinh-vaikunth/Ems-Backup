import express, { response } from 'express'
import Tickets from '../../models/Tickets.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import TicketCategory from '../../models/TicketCategory.js';
import TicketConversation from '../../models/TicketConversation.js';
import mongoose from 'mongoose';

router.get('/all-ticket-category', protect, (req, res) => {
TicketCategory.find()
  .then((category) => res.json(category))
  .catch((err) => res.status(404).json({ notfound: 'No category found' }));
});

router.post('/add-ticket-category', protect, (req,res) => {
  TicketCategory.findOne({category: req.body.category})
  .then((resp) => {
    if(resp === null){
       TicketCategory.create({category: req.body.category})
        .then((categorydata) => res.json(categorydata))
        .catch((err) => res.status(404).json({ notinsert: 'Not inserted' }));
    }
    else{
      res.status(400).json({msg : "Category is already exists"})
    }
  })
  .catch((err) => res.status(404).json({ notinsert: 'Not inserted' }));
   
    
})


router.post('/edit-ticket-category', protect, (req,res) => {
  TicketCategory.findOne({_id : req.body._id, category: req.body.category})
  .then((responseof) => {
    if(responseof === null){
      TicketCategory.findOne({category: req.body.category})
      .then((resp) => {
        if(resp === null){
           TicketCategory.findByIdAndUpdate({_id : req.body._id},{category: req.body.category})
            .then((categorydata) => res.json(categorydata))
            .catch((err) => res.status(404).json({ notEdit: 'Not Edited' }));
        }
        else{
          res.status(400).json({msg : "Category is already exists"})
        }
      })
      .catch((err) => res.status(404).json({ notEdit: 'Not Edited' }));
    }
    else{
      TicketCategory.findByIdAndUpdate({_id : req.body._id},{category: req.body.category})
            .then((categorydata) => res.json(categorydata))
            .catch((err) => res.status(404).json({ notEdit: 'Not Edited' }));
    }
  })


  // TicketCategory.findOne({category: req.body.category})
  // .then((resp) => {
  //   if(resp === null){
  //      TicketCategory.findByIdAndUpdate({_id : req.body._id},{category: req.body.category})
  //       .then((categorydata) => res.json(categorydata))
  //       .catch((err) => res.status(404).json({ notEdit: 'Not Edited' }));
  //   }
  //   else{
  //     res.status(400).json({msg : "Category is already their"})
  //   }
  // })
  // .catch((err) => res.status(404).json({ notEdit: 'Not Edited' }));
   
    
})

router.post('/create-ticket', protect, (req,res) => {
    Tickets.create({employee_id: req.body.employee_id,category: req.body.category, Assign_to: 'Admin', comment : req.body.comment, status: 'Open'})
        .then((ticket) => {
          TicketConversation.create({ ticket_id : ticket._id, Added_by: req.body.employee_id, Added_by_type: req.body.Added_by_type ,  comment: req.body.comment, username: req.body.username})
          .then((ticketchat) => {
            res.json(ticketchat);
          })
          .catch((e) => res.status(404).json({ notinsert: 'Not inserted' }))
          
        })
        .catch((err) => res.status(404).json({ notinsert: 'Not inserted' }));
    
})

router.get('/get-all-tickets', protect, (req, res) => {
    Tickets.find()
      .then((ticketsdata) => {
        res.json(ticketsdata)
    })
      .catch((err) => res.status(404).json({ notfound: 'No ticketsdata found' }));
});


router.post('/ticket-employeeid', protect, (req,res) => {
    Tickets.find({employee_id: req.body.employee_id})
    .then((ticketsdata) => {res.json(ticketsdata)})
      .catch((err) => res.status(404).json({ notfound: 'No ticketsdata found' }));
})

router.post('/ticket-chatbyid', protect, (req,res) => {
  
    TicketConversation.find({ticket_id: mongoose.Types.ObjectId(req.body._id)})
    .then((ticketChatdata) => {
      res.json(ticketChatdata)})
      .catch((err) => res.status(404).json({ notfound: 'No ticketChatdata found' }));
})


router.post('/add-ticket-chat', protect, (req,res) => {
  if(req.body.Added_by_type === "Admin"){
      Tickets.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.ticket_id),{ status: 'Waiting for user reply' })
          .then((response) => {
            TicketConversation.create({ ticket_id : mongoose.Types.ObjectId(req.body.ticket_id), Added_by_type: req.body.Added_by_type ,  comment: req.body.comment, username: req.body.username})
                  .then((ticketchat) => {
                    res.json(ticketchat);})
                  .catch((e) => res.status(404).json({ notinsert: 'Not inserted' }))
                })
                .catch((e) => res.status(404).json({ notupdate: 'Not  updated' }))
    }
  else{
    Tickets.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.ticket_id),{ status: 'Waiting for admin reply' })
          .then((response) => {
            TicketConversation.create({ ticket_id : mongoose.Types.ObjectId(req.body.ticket_id), Added_by_type: req.body.Added_by_type ,  comment: req.body.comment, username: req.body.username})
                  .then((ticketchat) => {
                    res.json(ticketchat);})
                  .catch((e) => res.status(404).json({ notinsert: 'Not inserted' }))
                })
                .catch((e) => res.status(404).json({ notupdate: 'Not  updated' }))
  }

  // TicketConversation.find({ticket_id : mongoose.Types.ObjectId(req.body.ticket_id),Added_by_type : 'Admin' })
  // .then((resp) => {
  //   if(resp.length === 0){
  //     Tickets.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.ticket_id),{ status: 'In Progress' })
  //     .then((response) => {
  //       TicketConversation.create({ ticket_id : mongoose.Types.ObjectId(req.body.ticket_id), Added_by_type: req.body.Added_by_type ,  comment: req.body.comment, username: req.body.username})
  //       .then((ticketchat) => {
  //         res.json(ticketchat);
  //       })
  //       .catch((e) => res.status(404).json({ notinsert: 'Not inserted' }))
  //     })
  //     .catch((e) => res.status(404).json({ notupdate: 'Not  updated' }))
  //   }
  //   else{
  //     TicketConversation.create({ ticket_id : mongoose.Types.ObjectId(req.body.ticket_id), Added_by_type: req.body.Added_by_type ,  comment: req.body.comment, username: req.body.username})
  //     .then((ticketchat) => {
  //       res.json(ticketchat);
  //     })
  //     .catch((e) => res.status(404).json({ notinsert: 'Not inserted' }))
  //     }
   
  // })

})


router.post('/close-ticket', protect, (req,res) => {
    Tickets.findByIdAndUpdate((req.body.ticket_id),{ status: 'Closed' })
    .then((response) => {
      res.json(response)})
    .catch((err) => res.status(404).json({ notfound: 'Not closed' }));
})


router.post('/ticket-details', protect, (req,res) => {
  Tickets.findOne({_id: req.body.ticket_id})
  .then((response) => {
    res.json(response)})
  .catch((err) => res.status(404).json({ notfound: 'Not found' }));
})

export default router;