import {
    RETRIEVE_EMPLOYEE,
} from '../actions/types'

const initialState = [];

const employeeReducer = (employee = initialState,action) => {
    const { type, payload } = action;

    switch(type){
        case RETRIEVE_EMPLOYEE:
            return payload;
        default:
            return employee;
    }
}

export default employeeReducer;