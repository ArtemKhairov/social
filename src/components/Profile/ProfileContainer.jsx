import React from "react";
import Profile from "./Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUserProfile,
  getStatus,
  updateStatus,
} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthredirect";

class ProfileContainer extends React.Component {

  componentDidMount() {
    // console.log(this.props)
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 14605;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
    // console.log(this.props.profile)
  }

  render() {
    return <Profile profile={this.props.profile} status={this.props.status} updateStatus={ this.props.updateStatus}/>;
  }
}


let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  };
};


export default compose(
  connect(
    mapStateToProps,
    {
      getUserProfile,
      getStatus,
      updateStatus,
    }
  ),
  withAuthRedirect,
  withRouter,
)(ProfileContainer);
