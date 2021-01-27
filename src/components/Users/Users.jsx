import React from "react";

const Users = (props) => {
  return (
    <div>
      {props.users.map(user =>
        <div key={user.id}>{user.id}</div>
      )}
    </div>
  )
};

export default Users;
