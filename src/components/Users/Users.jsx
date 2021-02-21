import React from "react";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";

const Users = (props) => {
  console.log(props)
  return (
    <div>
      <Paginator
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      {props.users.map((u) => (
        <User
          u={u}
          followingInProgress={props.followingInProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};

export default Users;
