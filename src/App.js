import React,{Component} from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { initializeApp } from "./redux/app-reducer";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
    console.log(this.props);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <DialogsContainer />} />

          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

          <Route path="/users" render={() => <UsersContainer />} />

          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps,{ initializeApp }))(App);
