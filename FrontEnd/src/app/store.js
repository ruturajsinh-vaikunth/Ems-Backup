import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import UserReducers from '../reducers/userReducers'
import employeesReducer from '../features/employees/employeesSlice'
import { authApi } from './services/auth/authService'
import { employesApi } from './services/employees/employeesService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    user: UserReducers,
    employees: employeesReducer,
    [employesApi.reducerPath]: employesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
// ,employesApi.middleware
export default store

// import {createStore, applyMiddleware} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import rootReducer from './reducers'

// const initalState = {

// }

// const middleware = [thunk]

// const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))