import React from "react";
import s from "./MyPosts.module.css";
import {
  updateNewPostTextActionCreator,
  addPostActionCreator,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let action = updateNewPostTextActionCreator();
    props.store.dispatch(action);
  };

  return (
    <MyPosts
      addPost={addPost}
      updateNewPostText={onPostChange}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;