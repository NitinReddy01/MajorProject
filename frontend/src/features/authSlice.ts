import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    email:"",
    accessToken : "",
    role : ""
}

const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setAuth : (state,action)=>{
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role
        },
        userLogout : (state)=>{
            state.id = "",
            state.email = "",
            state.accessToken = "",
            state.role= ""
        }
    }
});

export const {setAuth,userLogout} = authSlice.actions;
export default authSlice.reducer;