import {
  LOADING_FAILED,
  LOGIN_AVAILABLE,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGN_UP_END,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
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
          avatarImg: action.payload.avatarImg,
          email: action.payload.email,
          phone: action.payload.phone,
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
          email: "",
          phone: "",
          avatarImg: "",
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
          email: "",
          phone: "",
          avatarImg: "",
        },
        isLoading: false,
        isLoginError: false,
        notification: {},
      };
    case LOGIN_AVAILABLE:
      return {
        ...state,
        userState: {
          fullName: action.payload.userName,
          access_token: action.payload.userToken,
          email: action.payload.email,
          phone: action.payload.phone,
          avatarImg: action.payload.avatarImg,
          auth: true,
        },
        isLoading: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUp: {
          isError: false,
          message: action.payload.message,
        },
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        signUp: {
          isError: true,
          message: action.payload.message,
        },
      };
    case SIGN_UP_END:
      return {
        ...state,
        signUp: {},
      };
    default:
      return state;
  }
};

export default userReducer;
