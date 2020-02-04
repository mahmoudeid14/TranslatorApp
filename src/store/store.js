import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import {loadState} from './localStorage';
const persistedState = loadState();

const rootReducer = combineReducers({
  currentUser: userReducer
});

const configureStore = () => {
  return createStore(rootReducer,persistedState);
}



export default configureStore;