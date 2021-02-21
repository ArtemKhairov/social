import React from "react";

export const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<div>Идёт загрузка...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};
