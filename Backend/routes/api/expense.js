import express from 'express'
import Expenses from '../../models/Expenses.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';

    router.get('/all-expense', protect, (req, res) => {
        Expenses.find()
        .then((Expenses) => res.json(Expenses))
        .catch((err) => res.status(404).json({ notfound: 'No Expenses found' }));
    });

    router.post('/add-expense', protect, (req,res) => {
        Expenses.create({title: req.body.title, description: req.body.description, amount: req.body.amount, date: req.body.date, addedby: req.body.addedby})
            .then((Expenses) => res.json(Expenses))
            .catch((err) => res.status(404).json({ notinsert: 'Expenses Not inserted' }));
    })

    router.post('/search-expense', protect,  (req, res) => {
        Expenses.find({        
                date: {
                    $gte: new Date(req.body.SaerchfromDate),
                    $lte: new Date(req.body.SearchtoDate)
                }
            }).sort({date : 'ascending'})
            .then((Expenses) => res.json(Expenses))
            .catch((err) => res.status(404).json({ noExpensesfound: err }));
    })

    router.post('/expensebyid', protect,  (req, res) => {
        Expenses.find({_id : req.body._id}).sort({date : 'ascending'})
            .then((Expenses) => res.json(Expenses))
            .catch((err) => res.status(404).json({ noExpensesfound: err }));
    })

export default router;