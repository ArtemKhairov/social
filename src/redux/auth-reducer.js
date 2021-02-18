import { authAPI } from "../components/api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const setUserDataActionCreator = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

// thunk
export const getAuthUserData = () => (dispatch) => {
  return authAPI.me()
    .then((response) => {
    // console.log(response);
    if (response.data.resultCode === 0) {
      let { email, id, login } = response.data.data;
      dispatch(setUserDataActionCreator(id, email, login, true));
    }
  });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Какая-то ошибка"
      dispatch(stopSubmit("login", { _error: message }));
      // console.log(response.data.messages.length>0 ? response.data.me)
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserDataActionCreator(null, null, null, false));
    }
  });
};

export default authReducer;
