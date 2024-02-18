import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    email:"",
    accessToken : "",
}

const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setAuth : (state,action)=>{
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
        },
        logout : (state)=>{
            state.id = "",
            state.email = "",
            state.accessToken = ""
        }
    }
});

export const {setAuth,logout} = authSlice.actions;
export default authSlice.reducer;