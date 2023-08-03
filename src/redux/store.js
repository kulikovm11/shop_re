import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

import {marketReducer} from "./slices/productsSlice";
import {favoriteItemsReducer} from "./slices/favorites.slice";
import {allCategoriesReducer} from "./slices/allCategories.slice";
import {userReducer} from "./slices/userSlice";



const rootReducer = combineReducers({
    market:marketReducer,
    favoriteItems:favoriteItemsReducer,
    allCategories:allCategoriesReducer,
    user:userReducer


})

const setupStore = () => configureStore({
    reducer:rootReducer
})

export {setupStore}