import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import PriceService from '../api/PriceServices';

const getDateToday = () => {
  let day = new Date().getDate().toLocaleString();
  let month = (new Date().getMonth() + 1).toLocaleString();
  if (day.length == 1) {
    day = '0' + day;
  }
  if (month.length == 1) {
    month = '0' + month;
  }
  let formatDateText = new Date().getFullYear() + '-' + month + '-' + day;

  return formatDateText;
};

const get7dayAfter = () => {
  var date = new Date();
  date.setDate(date.getDate() - 7);

  var day = date.getDate();

  let month = (date.getMonth() + 1).toLocaleString();
  if (day.length == 1) {
    day = '0' + day;
  }
  if (month.length == 1) {
    month = '0' + month;
  }

  return date.getFullYear() + '-' + month + '-' + date.getDate();
};

export const getPriceNow = createAsyncThunk('price/getPriceNow', async id => {
    const res = await PriceService.getNowPrice(id);
    return res.data;
  });
  
  export const getComparePriceData = createAsyncThunk(
    'price/getComparePriceData',
    async ({id, from, to}) => {
      console.log('Compare', id, from, to);
      const res = await PriceService.getComparePrice(id, from, to);
      console.log(res.data);
      return res.data;
    },
  );
  

const initialState = {
  prices: {},
  date: {
    start: get7dayAfter() ,
    end: getDateToday()
  },
  now: {},
};

const PriceSlice = createSlice({
  name: 'prices',
  initialState,
  extraReducers: {
    [getPriceNow.fulfilled]: (state, {payload}) => {
      console.log('Get Current Price Success!!');
      return {...state, now: payload};
    },
    [getComparePriceData.fulfilled]: (state, {payload}) => {
      console.log('Get Compare Price Success!!');
      return {...state, prices: payload};
    },
  },
});

export const getInitialDate = state => state.prices.date;
export const getComparePrice = state => state.prices.prices;
export const getCurrentPrice = state => state.prices.now;
export default PriceSlice.reducer;
