import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = state.messages.map(m => <Message message={m.message} />);

    let newMessageBody = state.newMessageBody;
    
    // изменение стейта сообщения
    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
            <div>
                <div>
                    <textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder="Введите сообщение"
                    />
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;