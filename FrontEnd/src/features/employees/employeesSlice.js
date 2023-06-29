import { createSlice } from "@reduxjs/toolkit";
import { employeeInfo } from "./employeesActions";

const initialState = {
    EmployeeInfo: null,
    loading: false,
    error: null,
    success: false,
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeeCredentials: (state, { payload }) => {
            state.EmployeeInfo = payload
          },
    },
    extraReducers: {
        [employeeInfo.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [employeeInfo.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.EmployeeInfo = payload
          },
          [employeeInfo.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          },
    }

})

export const { setEmployeeCredentials } = employeesSlice.actions
export default employeesSlice.reducer