import MocApi from './MocApi';

const login = data => {
  return MocApi.post('/auth/login', data);
};

const getUser = id => {
  
  return MocApi.get(`/user/${id}`);
};

const UserService = {login, getUser};

export default UserService;
