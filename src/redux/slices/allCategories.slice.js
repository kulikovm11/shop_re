import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {marketService} from "../../configs";


const initialState = {
    arrayOfCategories : [],
    error: null,
    isLoading: false,
}


const getAllCategories = createAsyncThunk(
    'categoriesSlice/getAllCategories',
    async (_,thunkAPI)=>{
        try {
            const {data} = await marketService.getAllCategories()
            return data

        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)



const allCategoriesSlice = createSlice({
    name:"allCategories",
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(getAllCategories.pending, state => {
            state.isLoading = true
        })
        .addCase(getAllCategories.fulfilled,(state,action) => {
            state.isLoading = false
            state.arrayOfCategories = action.payload
        })
        .addCase(getAllCategories.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload.error
            state.arrayOfCategories = []
        })


})

const {reducer:allCategoriesReducer} = allCategoriesSlice

const catActions = {getAllCategories}

export {catActions,allCategoriesReducer}