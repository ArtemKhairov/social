import {  ResultCodeEnum, ResultCodeForCaptcha,  } from "../api/api";
import { authAPI } from "../api/auth-api";
import {securityAPI} from "../api/security-api"
import { FormAction, stopSubmit } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState = {
  userId: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};



const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET_USER_DATA":
    case "AUTH/GET_CAPTCHA_URL_SUCCESS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

// actions
export const actions = {
  setAuthUserData: (userId: null | number, email: null | string, login: null | string, isAuth: boolean) => ({
    type: "AUTH/SET_USER_DATA",
    payload:{ userId, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "AUTH/GET_CAPTCHA_URL_SUCCESS",
  payload: { captchaUrl },
  }as const)
}


// thunkCreator
export const getAuthUserData = ():ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  // console.log(response);
  if (meData.resultCode === ResultCodeEnum.Success) {
    const { email, id, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string
):ThunkType => async (dispatch) => {
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

export const logout = ():ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  // debugger
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export type InitialStateType = typeof initialState;
type ActionsType=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionsType | FormAction>

export default authReducer;
