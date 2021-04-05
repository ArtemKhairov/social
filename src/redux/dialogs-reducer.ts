import { InferActionsTypes } from "./redux-store";


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



const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
  switch (action.type) {
    case "DIALOGS/SEND_MESSAGE": {
      let body=action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    }
    default:
      return state;
  }
};

// actions
export const actions = {
  sendMessage: (newMessageBody:string)=>({type:"DIALOGS/SEND_MESSAGE",newMessageBody} as const),
}

type InitialStateType=typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default dialogsReducer;
