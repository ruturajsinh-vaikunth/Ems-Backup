import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const backendURL = 'https://redux-user-auth.up.railway.app'
const backendURL = 'http://127.0.0.1:5000'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        { email, password },
        config
      )
      const serializedStore = JSON.stringify(data);
      localStorage.setItem('store', serializedStore);
      localStorage.setItem('userToken', data.userToken)
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

export const refreshToken = createAsyncThunk(
  'user/refreshtoken',
  async ({ _id }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/user/refreshtoken`,
        { _id },
        config
      )
      // const serializedStore = JSON.stringify(data);
      // localStorage.setItem('store', serializedStore);
      localStorage.setItem('userToken', data.userToken)
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

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ firstName, email, password, account_type }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password, account_type },
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
