import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseURL} from "../../configs";
import axios from "axios";


const initialState = {
    currentUser : null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
    errorMessage: ""
}


const addCurrentUser = (state,{payload}) => {

    state.currentUser = payload

}
export const createUser = createAsyncThunk(
    'userSlice/createUser',
    async (payload,thunkAPI)=>{
        try {
            const res = await axios.post(`${baseURL}/users/add`, payload)
            return res.data;
        }catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'userSlice/updateUser',
    async (payload,thunkAPI)=>{
        try {
            const res = await axios.put(`${baseURL}/users/${payload.id}`, payload, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            return res.data;
        }catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async (payload,thunkAPI)=>{
        try {
            const login = await axios.post(`${baseURL}/auth/login`, payload, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            return login.data;
        }catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({id}) => id === payload.id)

            if(found){
                newCart = newCart.map((item) => {
                    return item.id === payload.id
                        ? {...item, quantity: payload.quantity || item.quantity + 1}
                        : item;
                })
            } else newCart.push({...payload, quantity:1})

            state.cart = newCart
            saveCartToLocalStorage(newCart)
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },


        removeItemFromCart :(state,{payload})=>{
            state.cart = state.cart.filter(({id})=>id !== payload)

            saveCartToLocalStorage(state.cart);


        },
        toggleForm: (state,{payload}) => {
            state.showForm = payload
        },
        toggleFormType:(state,{payload})=>{
            state.formType = payload
        },
        logoutUser:(state)=>{
            state.currentUser = null
        }

    },



    extraReducers: builder => builder

        .addCase(createUser.fulfilled,addCurrentUser)
        .addCase(loginUser.fulfilled,addCurrentUser)
        .addCase(updateUser.fulfilled,addCurrentUser)
        .addCase(loginUser.rejected, (state) => {
            state.errorMessage = 'Invalid username or pass'
        })




})

export const {reducer:userReducer} = userSlice

export const {addItemToCart,
    setCart,
    removeItemFromCart,
    toggleForm,
    toggleFormType,
    logoutUser
            } = userSlice.actions

export {userSlice}
