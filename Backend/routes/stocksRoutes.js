import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as stockController from '../controllers/stockController.js'

const router = express.Router()

router.route('/add-stocks').post(stockController.addStocks)
router.route('/get-stocks').get(protect, stockController.getStocks)

export default router
