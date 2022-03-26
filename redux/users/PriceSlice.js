import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import PriceService from '../api/PriceServices';

export const getPriceNow = createAsyncThunk("price/getPriceNow", async id => { 
    const res = await PriceService.getNowPrice(id);
    return res.data
})

const initialState = {
    prices: {},
    now: {},
};

const PriceSlice = createSlice({
    name: 'prices',
    initialState,
    extraReducers: {[getPriceNow.fulfilled]: (state, {payload}) => {
        console.log("Get Current Price Success!!")
        return {...state, now: payload}
    }}

})

export const getCurrentPrice = state => state.prices.now;
export default PriceSlice.reducer;