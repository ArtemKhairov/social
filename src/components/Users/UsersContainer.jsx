import React from "react";
import { connect } from "react-redux";
import {
  followActionCreator,
  setCurrentPageActionCreator,
  setTotalUsersCountActionCreator,
  setUsersActionCreator,
  unfollowActionCreator,
} from "../../redux/users-reducer";
import UsersClass from "./UsersClass";

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followActionCreator(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowActionCreator(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users));
    },
    setCurrentPage: (pageNumber)=>{
      dispatch(setCurrentPageActionCreator(pageNumber));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountActionCreator(totalCount));
    }
  };
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersClass);

export default UsersContainer;
