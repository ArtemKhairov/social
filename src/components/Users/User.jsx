import React from "react";
import style from "./users.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";

const User = ({ u, followingInProgress, unfollow, follow }) => {
  return (
    <>
       <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                className={style.userPhoto}
                alt="Ава пользователя"
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button disabled={followingInProgress.some(id => id === u.id)}
                  onClick={() => {
                    unfollow(u.id)
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button disabled={followingInProgress.some(id => id === u.id)}
                  onClick={() => {
                    follow(u.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div className={style.divv}>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
    </>
  )
};

export default User;