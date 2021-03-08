import { authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

type SetUserDataActionPayloadType = {
  userId: null | number;
  email: null | string;
  login: null | string;
  isAuth: null | boolean;
};

type SetUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetUserDataActionPayloadType;
};

export const setUserDataActionCreator = (
  userId: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean
): SetUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type GetCaptchaUrlSuccess = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: null | string };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccess => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

// thunk
export const getAuthUserData = () => async (dispatch: any) => {
  const meData = await authAPI.me();
  // console.log(response);
  if (meData.resultCode === ResultCodeEnum.Success) {
    const { email, id, login } = meData.data;
    dispatch(setUserDataActionCreator(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string
) => async (dispatch: any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }

    let message =
      data.messages.length > 0
        ? data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(setUserDataActionCreator(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  // debugger
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
