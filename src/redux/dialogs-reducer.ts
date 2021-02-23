const SEND_MESSAGE = "SEND-MESSAGE";

type MessageType = {
  id: number,
  message:string
}

type DialogType = {
  id: number,
  name:string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ]as Array<MessageType>,
};

type InitialStateType=typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body=action.newMessageBody
      // console.log(body)
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    }
    default:
      return state;
  }
};

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody:string
}

export const sendMessageCreator = (newMessageBody:string):SendMessageCreatorActionType => {
  return {
    type: SEND_MESSAGE,
    newMessageBody:newMessageBody,
  };
};



export default dialogsReducer;
