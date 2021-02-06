import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUserDataActionCreator } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { email, id, login } = response.data.data;
          this.props.setUserDataActionCreator(email, id, login);
        }
      });
  }
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(
  mapStateToProps,
  { setUserDataActionCreator }
)(HeaderContainer);
