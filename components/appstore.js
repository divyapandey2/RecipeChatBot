import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import recipeReducer from "./slice/recipeSlice";

  
const appStore= configureStore({
    reducer:{
    recipes:recipeReducer,
    },
});

export default appStore;
