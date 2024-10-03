import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: 'history',
  initialState: {
    items: [],
  },
  reducers: {

    addSearch: (state, action) => {
      state.items.push(action.payload); 
    },
    
    removeSearch: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
   
    clearHistory: (state) => {
      state.items = []; 
    }
  },
});

export const { addSearch, removeSearch, clearHistory } = historySlice.actions;
export default historySlice.reducer;
