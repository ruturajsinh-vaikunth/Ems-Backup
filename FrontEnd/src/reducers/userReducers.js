import {GET_USERS} from '../actions/types'

const initialState = {
    users:[],
    loading:true
}

function UserReducers(state = initialState, action){
    switch(action.type){

        case GET_USERS:
        return {
            ...state,
            users:action.payload,
            loading:false

        }
        default: return state
    }

}

export default UserReducers