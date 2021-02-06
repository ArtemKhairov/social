import { combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

// передача редюсеров
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

// создание хранилища Redux
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
