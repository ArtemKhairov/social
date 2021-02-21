import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../common/FormsControls/FormsControls";
import { required,maxLengthCreator } from "../../utils/validators/validator";

const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));


  let onSendMessage = (values) => {
    props.sendMessage(values.newMessageBody);
    console.log(values);
  };

  if (!props.isAuth) return <Redirect to="/login" />;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <AddMessageReduxForm onSubmit={onSendMessage} />
    </div>
  );
};

let AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newMessageBody"
          component={TextArea}
          placeholder="отправь меня полностью"
          validate={[required,maxLength50]}
        />
      </div>
      <div>
        <button>Отправить</button>
      </div>
    </form>
  );
};

let AddMessageReduxForm = reduxForm({
  // a unique name for the form
  form: "dialogs",
})(AddMessageForm);

export default Dialogs;
