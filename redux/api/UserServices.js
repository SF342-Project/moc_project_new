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

const UserService = {login, getUser, register, logout};

export default UserService;
