import React,{FC} from "react";
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import { UserType } from "../../types/types";

type PropsType = {
  pageSize: number,
  currentPage: number,
  users:Array<UserType>
  totalUsersCount: number,
  followingInProgress:Array<number>
  follow: (userId: number) => void,
  unfollow:(userId:number)=>void
  onPageChanged: (pageNumber: number) => void,
}

const Users:FC<PropsType> = ({currentPage,onPageChanged,totalUsersCount,pageSize,users,...props}) => {
  // console.log(props)
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
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

