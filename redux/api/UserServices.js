import MocApi from "./MocApi";

const login = (data) => {
    return MocApi.post("/user/login", data);
  };

const UserService = {login}

export default UserService;