import React from "react";
import style from "./Paginator.module.css";

const Paginator = (props) => {
  // let pagesCount = Math.ceil(
  //   this.props.totalUsersCount / this.props.pageSize
  // );
  let pagesCount = 10;
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.divback}>
      {pages.map((p) => {
        return (
          <span
            key={p}
            className={props.currentPage === p ? style.selectedPage : "nothing"}
            onClick={(e) => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
