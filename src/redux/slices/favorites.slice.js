import {createSlice} from "@reduxjs/toolkit";


const initialState = []


export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers:{
        toggleAddToFavorites:(state, {payload:item})=>{

            const isExist = state.some(i=>i.id === item.id)

            if (isExist){

                const index = state.findIndex(i=>i.id === item.id)
                if (index !== -1){
                    state.splice(index,1)
                }

            }
            else
                state.push(item)
        },
        deleteFromFavorites:(state, {payload:item})=>{
            return state.filter(({id})=>id !== item.id)
        }

    }
})

export const {actions, reducer:favoriteItemsReducer} = favoritesSlice
export const { deleteFromFavorites } = actions;