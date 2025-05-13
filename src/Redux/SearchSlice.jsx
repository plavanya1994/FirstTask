import { createSlice } from '@reduxjs/toolkit'

export const SearchSlice = createSlice({
    name: "search",
    initialState : {
        name: ""
    },
    reducers: {
        searchTerm: (state, action) => {
            console.log(state,action)
            state.name = action.payload;
          }     
    }
})

export const {searchTerm} = SearchSlice.actions

export default SearchSlice.reducer

