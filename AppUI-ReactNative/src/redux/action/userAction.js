import { userLogin } from "../../services/userService";

export const AuthLogin = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      const res = await userLogin(email, password);
      console.log("check login: ", res);

      if (res && res.data && res.data.token) {
        AsyncStorage.setItem("userToken", res.data.token);
        AsyncStorage.setItem("emailUser", email);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { email: email, token: res.data.token },
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
    AsyncStorage.removeItem("emailUser");
    AsyncStorage.removeItem("language");
    AsyncStorage.removeItem("themeMode");
    dispatch({ type: LOGOUT });
  };
};

export const isLogedIn = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      let userToken = await AsyncStorage.getItem("userToken");
      let userMail = await AsyncStorage.getItem("emailUser");

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
