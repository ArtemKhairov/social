import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { ProfileType, PostType, PhotosType } from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

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

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
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

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }

    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

type DeletePosActionCreatorType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePosActionCreatorType => {
  return {
    type: DELETE_POST,
    postId,
  };
};

// export const updateNewPostTextActionCreator = (text) => {
//   return {
//     type: UPDATE_NEW_POST_TEXT,
//     newText: text,
//   };
// };

type SetUserProfileActionCreatorType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionCreatorType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

type SetStatusActionCreatorType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusActionCreatorType => {
  return {
    type: SET_STATUS,
    status: status,
  };
};

type SavePhotoSuccessActionCreatorType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionCreatorType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

// thunk
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  // console.log(response);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    //
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
