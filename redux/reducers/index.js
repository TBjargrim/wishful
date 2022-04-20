import { combineReducers } from 'redux';
import storeReducers from './storeReducers';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  storeItems: storeReducers,
  firestore: firestoreReducer,
});

export default rootReducer;
