import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../api/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const fetchUserData = createAsyncThunk('user/getUser', async (id) => {
  const res = await UserService.getUser(id);
  return res.data.user;
})

const initialState = {
  users: {},
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
   [authlogin.fulfilled]: (state, {payload}) => {
     console.log("Login Success!!")
     return { ...state, users: payload };
   },
   [fetchUserData.fulfilled]: (state, {payload}) => {
     console.log('Fetch Sucess!!')
     return {...state, users: payload}
   }
  },
});

export const getUsers = state => state.users.users;
export const checkUserState = state => state.users.isLoggedIn;
export default UserSlice.reducer;
