import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import PriceService from '../api/PriceServices';

export const getPriceNow = createAsyncThunk("price/getPriceNow", async id => { 
    const res = await PriceService.getNowPrice(id);
    return res.data
})

export const getComparePriceData = createAsyncThunk("price/getComparePriceData", async ({ id, from, to }) => { 
    console.log("Compare",id, from, to)
    const res = await PriceService.getComparePrice(id, from, to);
    console.log(res.data)
    return res.data
})

const initialState = {
    prices: {},
    now: {},
};

const PriceSlice = createSlice({
    name: 'prices',
    initialState,
    extraReducers: {
    [getPriceNow.fulfilled]: (state, {payload}) => {
        console.log("Get Current Price Success!!")
        return {...state, now: payload}
    },
    [getComparePriceData.fulfilled]: (state, {payload}) => {
        console.log("Get Compare Price Success!!")
        return {...state, prices: payload}
    }
}

})

export const getComparePrice = state => state.prices.prices;
export const getCurrentPrice = state => state.prices.now;
export default PriceSlice.reducer;