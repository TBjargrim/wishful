import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import rootReducer from './../redux/reducers/index';
import firebaseConfig from '../firebase/config';

const initialState = {};

export const newStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk.withExtraArgument({
          getFirebase,
          getFirestore,
        })
      ),
      reduxFirestore(firebaseConfig)
    )
  );
};

export const wrapper = createWrapper(newStore, { debug: true });
