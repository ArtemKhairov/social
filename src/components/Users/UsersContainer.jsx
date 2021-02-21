import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleIsFollowingProgress,
  requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import { compose } from "redux";
import Preloader from "../common/Preloader/Preloader";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount,getUsers } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    const {pageSize}=this.props
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          pageSize={this.props.pageSize}
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress:getFollowingInProgress(state)
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      follow,
      unfollow,
      setCurrentPage,
      toggleIsFollowingProgress,
      getUsers:requestUsers,
    }
  ),
  // withAuthRedirect
)(UsersContainer);
