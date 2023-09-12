import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin, userSignUp } from "../../services/userService";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGIN_AVAILABLE = "LOGIN_AVAILABLE";
export const LOADING_FAILED = "LOADING_FAILED";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";
export const SIGN_UP_END = "SIGN_UP_END";

export const AuthLogin = (account, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      const res = await userLogin(account, password);
      if (res && res.result && res.access_token) {
        console.log("check login: ", res);

        AsyncStorage.setItem("userToken", res.access_token);
        AsyncStorage.setItem("fullName", res.fullName);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { fullName: res.fullName, token: res.access_token },
        });
      }
    } catch (error) {
      console.log(">> check error login: ", error);
      if (error.response.status === 400) {
        dispatch({
          type: LOGIN_ERROR,
          payload: { error: error.response.data },
        });
      }
    }
  };
};

export const AuthLogout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("fullName");
    dispatch({ type: LOGOUT });
  };
};

export const isLogedIn = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      let userToken = await AsyncStorage.getItem("userToken");
      let userMail = await AsyncStorage.getItem("fullName");

      if (userToken && userMail) {
        dispatch({ type: LOGIN_AVAILABLE, payload: { userToken, userMail } });
      }
      dispatch({ type: LOADING_FAILED });
    } catch (error) {
      dispatch({ type: LOADING_FAILED });
      console.log(">>> check error isLoggedIn: ", error);
      throw error;
    }
  };
};

export const signUpAcction = (email, phone, password, fullName) => {
  return async (dispatch) => {
    try {
      const res = await userSignUp(email, phone, password, fullName);
      if (res.result) {
        dispatch({ type: SIGN_UP_SUCCESS, payload: { message: res.message } });
      } else {
        dispatch({
          type: SIGN_UP_ERROR,
          payload: { message: res.messageError },
        });
      }
    } catch (error) {
      console.log(">>> check error Sign up: ", error);
      throw error;
    }
  };
};
