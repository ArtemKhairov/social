import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validator";
import { Input } from "../common/FormsControls/FormsControls";
import style from "./../common/FormsControls/FormControls.module.css";

let LoginForm = (props) => {
  console.log(props);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="email">Username</label>
        <Field
          name="email"
          component={Input}
          validate={[required]}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          component={Input}
          validate={[required]}
          type="text"
        />
      </div>
      <div>
        <Field component={Input} name="rememberMe" type="checkbox" />
        remember me
      </div>
      <div>
        {props.error && <div className={style.formSummaryError}>{ props.error}</div>}
      </div>
      <div>
        {props.captchaUrl && <img src={props.captchaUrl} alt="captcha" />}
        {props.captchaUrl && <Field name="captcha" component={Input} validate={[required]}  />}
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
    // console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe,formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={ props.captchaUrl}/>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
