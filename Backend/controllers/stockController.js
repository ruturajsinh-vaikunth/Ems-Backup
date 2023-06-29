import asyncHandler from 'express-async-handler'
import TotalStock from '../models/TotalStocks.js';

const addStocks = asyncHandler(async (req, res) => {
  
        const { title, quantity } = req.body

            // create new user document in db
            const totalstock = TotalStock.create({ title, quantity })

              if (totalstock) {
                res.status(201).json({
                  _id: totalstock._id,
                  title: totalstock.title,
                  quantity: totalstock.quantity
                })
              } else {
                res.status(400)
                throw new Error('Invalid data')
              }
    
})


const getStocks = asyncHandler(async (req, res) => {
  

        // create new user document in db
        // const totalstock = TotalStock.fi({ title, quantity })
            const totalstock = TotalStock.find()
          if (totalstock) {
            res.status(201).json({
              _id: totalstock._id,
              title: totalstock.title,
              quantity: totalstock.quantity
            })
          } else {
            res.status(400)
            throw new Error('Invalid data')
          }

})


export { addStocks, getStocks  }
