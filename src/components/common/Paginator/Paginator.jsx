import React, { useState } from "react";
import style from "./Paginator.module.css";

const Paginator = (props) => {
  // console.log(props);

  // количество отображаемых страниц
  let portionSize = 20
  let pagesCount = Math.ceil(
    props.totalItemsCount / props.pageSize
  );
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      
      {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

      {pages
        .filter(p=>p>=leftPortionPageNumber && p<=rightPortionPageNumber)
        .map((p) => {
          return (
            <span
              key={p}
              className={
                props.currentPage === p ? style.selectedPage : "nothing"
              }
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      
      { portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
      
    </div>
  );
};

export default Paginator;
