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
};

const deleteShop = data => {
  return MocApi.put('/favorites/shop', data);
};

const getShop = data => {
  return MocApi.get('/favorites/shop', data);
};

const addProduct = data => {
  return MocApi.post('/favorites/product', data);
};

const deleteProduct = data => {
  return MocApi.put('/favorites/product', data);
};

const getProduct = data => {
  return MocApi.post('/favorites/getProduct', data);
};

const UserService = {
  login,
  getUser,
  register,
  logout,
  addShop,
  deleteShop,
  getShop,
  addProduct,
  deleteProduct,
  getProduct
};

export default UserService;
