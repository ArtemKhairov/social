import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import { required } from "../../utils/validators/validator";
import { Input } from "../common/FormsControls/FormsControls";
import style from "./../common/FormsControls/FormControls.module.css";

type OwnPropsType = {
  captchaUrl:string | null
}

let LoginForm :React.FC<InjectedFormProps<LoginFormValuesType,OwnPropsType>&OwnPropsType>= (props) => {
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

let LoginReduxForm = reduxForm<LoginFormValuesType,OwnPropsType>({
  // a unique name for the form
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null,
  isAuth:boolean
}

type MapDispatchPropsType = {
  login:(emaiL:string,password:string,rememberMe:boolean,captcha:string)=>void
}

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha:string
}

const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData:LoginFormValuesType) => {
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

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
