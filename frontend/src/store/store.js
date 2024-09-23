// Configure and export the Redux store here
// Import rootReducer and any middleware (like thunk) you need
// Example:
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../redux/rootReducer';
// export const store = createStore(rootReducer, applyMiddleware(thunk));
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/userSlice.js";
import doctorData from "../slices/doctorSlice.js";
 
import userRoleReducer from "../slices/roleSice.js";
 
 
import contactReducer from "../slices/contactSlice.js";
import chatsReducer from "../slices/chatsSlice.js";
import patientReducer from "../slices/patientSlice.js"; 
import catalogReducer from '../slices/catalogSlice';


 
const store = configureStore({
  reducer: {
    auth: authReducer,
    doctorData: doctorData,
 
    userRole: userRoleReducer,
 
    contact: contactReducer,
    chats: chatsReducer,
    patientRecord: patientReducer,
    users: catalogReducer,

    
  },
});

export default store;
