import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../api/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'underscore';

export const authlogin = createAsyncThunk('users/login', async data => {
  const res = await UserService.login(data);
  const token = res.data.token;

  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
  return res.data;
});

export const authLogout = createAsyncThunk('user/logout', async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token After Logout: ', await AsyncStorage.getItem('token'));
  } catch (error) {
    console.log(error);
  }
});

export const authRegister = createAsyncThunk(
  'user/register',
  async (data, {rejectWithValue}) => {
    try {
      const res = await UserService.register(data);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserData = createAsyncThunk('user/getUser', async id => {
  const res = await UserService.getUser(id);
  return res.data.user;
});

export const addShopFavorite = createAsyncThunk(
  'favorite/addShop',
  async data => {
    console.log('Add Shop');
    const res = await UserService.addShop(data);
    return data.shop_id;
  },
);

export const deleteShopFavorite = createAsyncThunk(
  'favorite/delShop',
  async data => {
    const res = await UserService.deleteShop(data)
      .catch(err => console.log('Err: ', err))
      .then(res => console.log('Res: ', res));
    return data.shop_id;
  },
);

export const getShopFavorite = createAsyncThunk(
  'favorite/getShop',
  async data => {
    console.log('Get Shop!!');
    const res = await UserService.getShop(data)
      .catch(err => console.log('Err: ', err))
      .then(res => console.log('Res: ', res));
    return data.shop_id;
  },
);

export const addProuctFavorite = createAsyncThunk(
  'favorite/addProduct',
  async data => {
    console.log('Add Shop');
    const res = await UserService.addProduct(data);
    return data.product_id;
  },
);

export const deleteProuctFavorite = createAsyncThunk(
  'favorite/delProduct',
  async data => {
    const res = await UserService.deleteProduct(data)
      .catch(err => console.log('Err: ', err))
      .then(res => console.log('Res: ', res));
    return data.product_id;
  },
);

const initialState = {
  users: {},
  token: '',
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [authlogin.fulfilled]: (state, {payload}) => {
      console.log('Login Success!!');
      console.log(payload);
      return {...state, users: payload};
    },
    [authRegister.fulfilled]: (state, {payload}) => {
      console.log('Register Success!!');
      return {...state};
    },
    [authRegister.rejected]: (state, {error}) => {
      console.log('Register Rejected!!');
      console.log(error);
    },
    [authLogout.fulfilled]: state => {
      console.log('Logout Success!!');
      return {...state, users: {token: ''}};
    },
    [fetchUserData.fulfilled]: (state, {payload}) => {
      console.log('Fetch Sucess!!');
      return {...state, users: payload};
    },
    [addShopFavorite.fulfilled]: (state, {payload}) => {
      console.log('Add Shop Sucess!!');
      let user = state.users[0];
      user.shop_lists.push(payload);
    },
    [deleteShopFavorite.fulfilled]: (state, {payload}) => {
      console.log('Delete Shop Sucess!!');
      let user = state.users[0].shop_lists;
      user.splice(user.indexOf(payload), 1);
    },
    [deleteShopFavorite.rejected]: (state, {payload}) => {
      console.log('Delete Shop Rejected!!');
    },
    [getShopFavorite.fulfilled]: (state, {payload}) => {
      console.log('Get Shop Success!!');
    },
    [addProuctFavorite.fulfilled]: (state, {payload}) => {
      console.log('Add Product Sucess!!');
      let user = state.users[0];
      user.product_lists.push(payload);
    },
    [deleteProuctFavorite.fulfilled]: (state, {payload}) => {
      console.log('Delete Product Sucess!!');
      let user = state.users[0].product_lists;
      user.splice(user.indexOf(payload), 1);
    },
  },
});

export const getUsers = state => state.users.users;
export default UserSlice.reducer;
