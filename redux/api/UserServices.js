import MocApi from './MocApi';

const login = data => {
  return MocApi.post('/auth/login', data);
};

const register = data => {
  return MocApi.post('/auth/register', data);
};

const logout = data => {
  return MocApi.post('/auth/logout');
};

const getUser = id => {
  return MocApi.get(`/user/${id}`);
};

const addShop = data => {
  return MocApi.post('/favorites/shop', data);
}

const UserService = {login, getUser, register, logout, addShop};

export default UserService;
