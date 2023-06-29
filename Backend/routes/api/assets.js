import express from 'express'
import Asset from '../../models/Assets.js';
import TotalStock from '../../models/TotalStocks.js';
import AssetRequest from '../../models/AssetRequest.js';
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';

router.get('/', protect, (req, res) => {
    Asset.find()
    .then((asset) => res.json(asset))
    .catch((err) => res.status(404).json(err));
})

router.post('/assign-asset', protect, (req, res) => {

    const generateRandomNDigits = (n) => {
        return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    }
      
    let asset_number = generateRandomNDigits(5)

    Asset.create({employee_id: req.body.employee_id, asset_type: req.body.asset_type, asset_name: req.body.asset_name, asset_number: asset_number, quantity : 1, assigned: "Yes", condition: "Working"})
    .then((respo) => {
        TotalStock.findOne({type : req.body.asset_type})
        .then((respon) => {
            TotalStock.findByIdAndUpdate(respon._id,{ assign_quantity: respon.assign_quantity + 1, available_quantity: respon.available_quantity - 1 })
                .then((response) => {
                    res.json(response)
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    })
    .catch((e) => res.status(400).json(e))
    
    
});

router.post('/assets-detail', protect, (req, res) => {
    Asset.find({employee_id: req.body.employee_id})
    .then((asset) => res.json(asset))
    .catch((err) => res.status(404).json(err));
})


router.post('/assets-edit', protect, (req, res) => {
        Asset.findByIdAndUpdate(req.body._id,{ employee_id: req.body.employee_id, asset_type: req.body.asset_type, asset_name: req.body.asset_name })
                .then((response) => {
                    res.json(response)
                })
                .catch((err) => {
                    console.log(err);
                });
});

router.post('/assets-return', protect, (req, res) => {
    const date = new Date()
    Asset.findByIdAndUpdate(req.body._id,{ return_date : date, reason: req.body.reason, condition: req.body.condition, assigned: "No" })
    .then((respo) => { 
        TotalStock.findOne({type : req.body.asset_type})
            .then((respon) => {
                if(req.body.condition === 'Working'){
                TotalStock.findByIdAndUpdate(respon._id,{ assign_quantity: respon.assign_quantity - 1,  available_quantity: respon.available_quantity + 1 })
                    .then((response) => {
                        res.json(response)
                    })
                    .catch((err) => {
                        console.log(err);
                });
                }else{
                    TotalStock.findByIdAndUpdate(respon._id,{in_working_quantity: respon.in_working_quantity - 1, not_working_quantity: respon.not_working_quantity + 1 , assign_quantity: respon.assign_quantity - 1, available_quantity: (respon.in_working_quantity - 1) - (respon.assign_quantity - 1)})
                    .then((response) => {
                        res.json(response)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
 })
})

router.get('/request-data', protect, (req, res) => {
    AssetRequest.find()
    .then((asset) => res.json(asset))
    .catch((err) => res.status(404).json(err));
})

router.post('/asset-request', protect, (req, res) => {
    AssetRequest.create({employee_id: req.body.employee_id, asset_type: req.body.asset_type, reason: req.body.reason, status: "Pending"})
    .then((response) => {
        res.json(response)
    })
    .catch((err) => res.status(404).json(err));
});


router.post('/assign-request-asset', protect, (req, res) => {

    const generateRandomNDigits = (n) => {
        return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    }
      
    let asset_number = generateRandomNDigits(5)

    Asset.create({employee_id: req.body.employee_id, asset_type: req.body.asset_type, asset_name: req.body.asset_name, asset_number: asset_number, quantity : 1, assigned: "Yes", condition: "Working"})
    .then((respo) => {
        TotalStock.findOne({type : req.body.asset_type})
        .then((respon) => {
            TotalStock.findByIdAndUpdate(respon._id,{ assign_quantity: respon.assign_quantity + 1, available_quantity: respon.available_quantity - 1 })
                .then((response) => {
                    AssetRequest.findByIdAndUpdate(req.body._id,{status: "Assigned"})
                    .then((response) => {
                        res.json(response)
                    })
                    .catch((err) => res.status(404).json(err));
                })
                .catch((err) => res.status(404).json(err));
        })
    })
    .catch((e) => res.status(400).json(e))
    
    
});

router.post('/asset-request-employeeid', protect, (req, res) => {
    AssetRequest.find({employee_id: req.body.employee_id})
    .then((asset) => res.json(asset))
    .catch((err) => res.status(404).json(err));
})

router.post('/reject-request-asset', protect, (req, res) => {
    AssetRequest.findByIdAndUpdate(req.body._id,{ status: "Rejected"})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => res.status(404).json(err));
});

router.post('/asset-info', protect, (req,res) => {
    Asset.find({asset_number : req.body.asset_number})
    .then((response) => {
        res.json(response)
    })
    .catch((err) => res.status(404).json(err));
})

export default router;