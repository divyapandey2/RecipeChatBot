// import { createSlice } from "@reduxjs/toolkit"
// const historySlice=createSlice ({
//     name: 'history',
//     initialState: {
//       items: [],
//     },
//     reducers: {
//       addSearch: (state, action) => {
//         state.push(action.payload);
//       },
//       removeSearch: (state, action) => {
//         return state.filter((search, index) => index !== action.payload);
//       },
//       clearHistory: (state) => {
//         return [];
//       }
//     },
//   });
  
//   export const { addSearch, removeSearch, clearHistory } = historySlice.actions;
//   export default historySlice.reducer;