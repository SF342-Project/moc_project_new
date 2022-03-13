import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';



const initialState = {
  users: {
    name: 'mansea',
    products_id: ['P1120', 'P3310'],
  },
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {},
});

export const getAllUsers = state => state.users.users;
export default UserSlice.reducer;
