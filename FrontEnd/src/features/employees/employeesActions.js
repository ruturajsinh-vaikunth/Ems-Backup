import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux'

const backendURL = 'http://127.0.0.1:5000'

export const employeeInfo = createAsyncThunk(
    'employee/',
    async ( { rejectWithValue }) => {
      // const { userInfo } = useSelector((state) => state.auth)
      // let  employee_id  = userInfo.employee_id;
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const { data } = await axios.get(
          `${backendURL}/api/employee/all`,
          // { employee_id },
          config
        )
  
  
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )