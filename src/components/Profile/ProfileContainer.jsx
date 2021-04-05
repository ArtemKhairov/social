import React from "react";
import Profile from "./Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from "../../redux/profile-reducer";
// import { withAuthRedirect } from "../../hoc/withAuthredirect";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
        userId = this.props.authorizedUserId;
        if (!userId) {
            this.props.history.push("/login");
        }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate")
    if (this.props.match.params.userId !== prevProps.match.params.userId ) {
      this.refreshProfile()
    }
  }

  render() {
    // {console.log(this.props.match.params.userId)}
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(
    mapStateToProps,
    {
      getUserProfile,
      getStatus,
      updateStatus,
      savePhoto,
      saveProfile
    }
  ),
  // withAuthRedirect,
  withRouter
)(ProfileContainer);
