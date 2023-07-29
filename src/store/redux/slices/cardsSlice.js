import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards:[],
    fetchStatus:null
}

export const cardsSlice = createSlice({
    name:"cards",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})

export default cardsSlice.reducer;