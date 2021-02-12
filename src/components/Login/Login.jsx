import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validator";

let LoginForm = (props) => {
  // console.log(props);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <Field name="username" component={Input} validate={[required]} type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component={Input} validate={[required]} type="text" />
      </div>
      <div>
        <Field component={Input}  name="rememberMe" type="checkbox" />
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

let LoginReduxForm = reduxForm({
  // a unique name for the form
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </>
  );
};

export default Login;
