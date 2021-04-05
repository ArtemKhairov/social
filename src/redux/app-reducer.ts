import { getAuthUserData } from "./auth-reducer";
import {InferActionsTypes} from './redux-store';

let initialState = {
  initialized: false,
};



const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: "APP/INITIALIZED_SUCCESS" } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  // ожидает выполнение всех промисов
  // затем меняет состояние initialized
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default appReducer;
