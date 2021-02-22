import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/FormsControls/FormsControls";
import style from "../../common/FormsControls/FormControls.module.css";

const ProfileDataForm = (props) => {
  // console.log(props)
  return (
    <>
      <button onClick={props.onCancel}>Cancel</button>
      <form onSubmit={props.handleSubmit}>
        <button>save</button>
        {props.error && <div className={style.formSummaryError}>{props.error}</div>}
        <div>
          <b>Looking for a job</b>:{" "}
          <Field
            name="lookingForAJob"
            id="lookingForAJob"
            component={Input}
            type="checkbox"
          />
        </div>
        <div>
          <b>My professional skills</b>:
          <Field
            name="lookingForAJobDescription"
            id="lookingForAJobDescription"
            component={Input}
          />
        </div>
        <div>
          <b>Full name</b> :{" "}
          <Field name="fullName" component={Input} placeholder="Full name" />
        </div>
        <div>
          <b>About me</b>:
          <Field name="aboutMe" component={Input} placeholder="About me" />
        </div>
        <div>
          <b>Contacts:</b>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <div key={key}>
                <b>
                  {key}:{" "}
                  <Field
                    name={"contacts." + key}
                    placeholder={key}
                    component={Input}
                  />
                </b>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataReduxForm;
