import { Dispatch } from "react";
import { UserType } from "../types/types";
import { ResultCodeEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/objectHelper";
import {  BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  // массив usersId
  followingInProgress: [] as Array<number>,
};



const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "USERS/FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case "USERS/UNFOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case "USERS/SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    case "USERS/SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "USERS/SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case "USERS/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

// actions
export const actions = {
  followSuccess: (userId: number) => ({ type: "USERS/FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "USERS/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: "USERS/SET_CURRENT_PAGE", currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: "USERS/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "USERS/TOGGLE_IS_FETCHING", isFetching } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
    ({ type: "USERS/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
};



// thunkCreator
export const requestUsers = (
  page: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.followSuccess
  );
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.unfollowSuccess
  );
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer;
