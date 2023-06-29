import express from 'express'
import TotalStock from '../../models/TotalStocks.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';

router.get('/', protect, (req, res) => {
  TotalStock.find()
  .then((stocks) => res.json(stocks))
  .catch((err) => res.status(404).json({ notfound: 'No stock found' }));
});

router.post('/add-stock', protect, (req,res) => {

  TotalStock.findOne({type: req.body.type})
  .then((response) => {
    if(response){
       TotalStock.findByIdAndUpdate( response._id, { quantity: (parseInt(response.quantity)) + (parseInt(req.body.quantity)), in_working_quantity: (parseInt(response.in_working_quantity)) + (parseInt(req.body.quantity)), available_quantity: (parseInt(response.available_quantity)) + (parseInt(req.body.quantity)) })
       .then((stocks) => res.json(stocks))
       .catch((err) => res.status(404).json({ notfound: 'No stock found' }));
    }
    else{
    TotalStock.create({type: req.body.type, quantity: req.body.quantity, assign_quantity: 0, in_working_quantity: req.body.quantity, not_working_quantity: 0, available_quantity: req.body.quantity })
        .then((stocks) => res.json(stocks))
        .catch((err) => res.status(404).json({ notfound: 'No stock found' }));
    }
  })
  .catch((err) => res.status(404));
})

export default router;