import { USER_LOGIN } from "../action/cinemaAction";

const INITIAL_STATE = {
  userState: {
    userName: "",
    auth: null,
    token: "",
  },
  isLoading: false,
  isLoginError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
