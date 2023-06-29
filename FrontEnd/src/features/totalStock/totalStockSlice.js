import { createSlice } from '@reduxjs/toolkit'
import { addStocks, userLogin, refreshToken, getStocks } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const userInfo = localStorage.getItem('store')
  ? localStorage.getItem('store')
  : null


const initialState = {
  loading: false,
  userInfo,
  stockInfo,
  userToken,
  error: null,
  success: false,
}


const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      localStorage.removeItem('store')
      state.loading = false
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [userLogin.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.userToken
        state.success = true
      },
      [userLogin.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      [addStocks.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [addStocks.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.success = true // added successful
      },
      [addStocks.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      [getStocks.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [getStocks.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.stockInfo = payload
        state.success = true // get data successful
      },
      [getStocks.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      [refreshToken.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [refreshToken.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.success = true 
      },
      [refreshToken.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
