import MocApi from './MocApi';

const login = data => {
  return MocApi.post('/auth/login', data);
};

const register = data => {
  return MocApi.post('/auth/register', data);
};

const getUser = id => {
  
  return MocApi.get(`/user/${id}`);
};

const UserService = {login, getUser, register};

export default UserService;
