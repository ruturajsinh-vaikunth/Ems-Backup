import {
    RETRIEVE_EMPLOYEE,
} from './types'

import EmployeesService from '../services/EmployeesService'

export const findEmployeeByEmployeeid = (emplyee_id) => async(dispatch) => {
    try{
        let res = await EmployeesService.findByEmployee_id(emplyee_id)
        dispatch({
            type: RETRIEVE_EMPLOYEE,
            payload: res.data,
        });
    } catch (err){
        console.log(err);
    }
}