import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const backendURL = 'https://redux-user-auth.up.railway.app'
const backendURL = 'http://127.0.0.1:5000'

const userToken = localStorage.getItem('userToken')

export const getStocks = createAsyncThunk(
    'stocks/get-stocks',
    async ({ rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        }
  
        await axios.get(
          `${backendURL}/api/stocks/get-stocks`,
          config
        )
        .then(response => {
          if(response.status === 201){
            return response
          }
        })
      } catch (error) {
          return rejectWithValue(error.response.data.msg)
      }
    }
  )

  

export const addStocks = createAsyncThunk(
  'stocks/add-stocks',
  async ({ title, quantity }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      }

      await axios.post(
        `${backendURL}/api/stocks/add-stocks`,
        { title, quantity },
        config
      )
      .then(response => {
        if(response.status === 201){
          return response.status
        }
      })
    } catch (error) {
      if (error.response && error.response.data.details) {
        return rejectWithValue({details: error.response.data.details})
      } else {
        console.log(error.response.data.msg);
        return rejectWithValue(error.response.data.msg)
      }
    }
  }
)
