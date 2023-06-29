import express from 'express'

import * as employeeController from '../controllers/employeeController.js'

const router = express.Router()

router.post('/employeesinfo', employeeController.ShowEmployeeDetails)

export default router