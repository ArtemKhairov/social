import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

// передача редюсеров
let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,  
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

// A-actionType
// R-возвращаемое значение
export type BaseThunkType<A extends Action=Action, R=Promise<void> > = ThunkAction<R , AppStateType, unknown, A >

// создание хранилища Redux
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;
