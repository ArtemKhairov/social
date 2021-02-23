import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../../common/FormsControls/FormsControls";
import { required,maxLengthCreator } from "../../../utils/validators/validator";

const maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.message}/>
  ));

  // let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
    // console.log(values);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddPostReduxForm onSubmit={ onAddPost}/>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

let AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={TextArea}
          placeholder="жду гениальный пост"
          validate={[required,maxLength10]}
        />
      </div>
      <div>
        <button>Вжух и ты...</button>
      </div>
      <div></div>
    </form>
  )
}

let AddPostReduxForm = reduxForm({
  // a unique name for the form
  form: "posts",
})(AddPostForm);

export default MyPosts;
