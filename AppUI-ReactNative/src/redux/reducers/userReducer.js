import {
  LOADING_FAILED,
  LOGIN_AVAILABLE,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action/userAction";

const INITIAL_STATE = {
  userState: {
    fullName: "",
    auth: null,
    access_token: "",
  },
  isLoading: false,
  isLoginError: false,
  notification: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, isLoading: true };
    case LOADING_FAILED:
      return { ...state, isLoading: false };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userState: {
          fullName: action.payload.fullName,
          access_token: action.payload.token,
          auth: true,
        },
        isLoginError: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        userState: {
          fullName: "",
          access_token: "",
          auth: false,
        },
        isLoading: false,
        isLoginError: true,
        notification: action.payload.errorMessage,
      };
    case LOGOUT:
      return {
        ...state,
        userState: {
          fullName: "",
          auth: null,
          access_token: "",
        },
        isLoading: false,
        isLoginError: false,
        notification: {},
      };
    case LOGIN_AVAILABLE:
      return {
        ...state,
        userState: {
          fullName: action.payload.fullName,
          access_token: action.payload.access_token,
          auth: true,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
