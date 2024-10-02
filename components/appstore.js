import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import recipeReducer from "./slice/recipeSlice";
import cartReducer from "./slice/cartSlice";
// import historyReducer from "./slice/historySlice";

  
const appStore= configureStore({
    reducer:{
    recipes:recipeReducer,
    cart:cartReducer,
    // history:historyReducer,
    },
});

export default appStore;
