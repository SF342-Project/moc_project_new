import MocApi from './MocApi';

const login = data => {
  return MocApi.post('/auth/login', data);
};

const UserService = {login};

export default UserService;
