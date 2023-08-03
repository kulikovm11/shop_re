import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {marketService} from "../../configs";



const initialState = {
    productsArr: [],
    error: null,
    isLoading: false,
}


const getAll = createAsyncThunk(
    'productsSlice/getAll',
    async (_,thunkAPI)=>{
        try{
            const {data} = await marketService.getAll()
            return data
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


const productSlice = createSlice({
    name:'productSlice',
    initialState,
    reducers:{},
    extraReducers:builder =>
        builder
            .addCase(getAll.pending, state => {
                state.isLoading = true
            })
            .addCase(getAll.fulfilled, (state, action)=>{
                state.isLoading = false
                const {products} = action.payload
                state.productsArr = products
            })
            .addCase(getAll.rejected, (state,action) => {
                state.isLoading = false
                state.error = action.payload.error
                state.productsArr = []
            })

})

const {reducer:marketReducer} = productSlice

const marketActions = {getAll}

export {marketReducer,marketActions}