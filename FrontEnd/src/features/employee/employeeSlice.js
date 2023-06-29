import { createSlice } from '@reduxjs/toolkit'
// import { registerUser, userLogin } from './authActions'
import { findEmployeeByEmployeeid } from '../../actions/employee'


const initialState = {
//   userInfo: null,
    employee_info: null,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setCredentialss: (state, { payload }) => {
      state.employee_info = payload
    },
  },
  extraReducers: {
    [findEmployeeByEmployeeid.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [findEmployeeByEmployeeid.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.employee_info = payload
      },
      [findEmployeeByEmployeeid.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
    //   [registerUser.pending]: (state) => {
    //     state.loading = true
    //     state.error = null
    //   },
    //   [registerUser.fulfilled]: (state, { payload }) => {
    //     state.loading = false
    //     state.success = true // registration successful
    //   },
    //   [registerUser.rejected]: (state, { payload }) => {
    //     state.loading = false
    //     state.error = payload
    //   },
  },
})

export const { setCredentials } = employeeSlice.actions

export default employeeSlice.reducer
