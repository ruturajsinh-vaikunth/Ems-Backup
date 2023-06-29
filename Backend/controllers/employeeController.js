import asyncHandler from  'express-async-handler'
import Employee from '../models/Employee.js'

const ShowEmployeeDetails = asyncHandler(async (req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    Employee.findOne({employee_id: emp_id})    
    .then((employee) => res.json(employee))
      .catch(() => res.status(400).json({ error: 'Unable to find this employee' }));
})

export { ShowEmployeeDetails }