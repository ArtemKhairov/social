import React, { useState } from "react";
import style from "./Paginator.module.css";

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  portionSize?:number
}

const Paginator:React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize=20}) => {
  // console.log(props);

  // количество отображаемых страниц
  let pagesCount = Math.ceil(
    totalItemsCount / pageSize
  );
  let pages:Array<number> = [];
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
                currentPage === p ? style.selectedPage : "nothing"
              }
              onClick={(e) => {
                onPageChanged(p);
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
