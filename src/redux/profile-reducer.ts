import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { ProfileType, PostType, PhotosType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState = {
  posts: [
    { id: 1, message: "И снова седая ночь", likesCount: 12 },
    { id: 2, message: "И только ей доверяю я", likesCount: 11 },
    { id: 3, message: "Знаешь,седая ночь, ты все мои тайны", likesCount: 11 },
    { id: 4, message: "Но даже и ты...", likesCount: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};


const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "PROFILE/ADD_POST": {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }

    case "PROFILE/DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case "PROFILE/SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case "PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }

    case "PROFILE/SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostText: string) => ({ type: "PROFILE/ADD_POST", newPostText } as const),
  deletePost: (postId: number) => ({ type: "PROFILE/DELETE_POST", postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: "PROFILE/SET_USER_PROFILE", profile } as const),
  setStatus: (status: string) => ({ type: "PROFILE/SET_STATUS", status } as const),
  savePhotoSuccess:(photos:PhotosType)=>({type:"PROFILE/SAVE_PHOTO_SUCCESS",photos}as const)
}

// thunkCreator
export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId);
  // console.log(response);
  dispatch(actions.setUserProfile(response.data));
};

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(response.data));
};

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    //
  }
};

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType):ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId))
  } else {
      throw new Error("userId can't be null")
  }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer;
