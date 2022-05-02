import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const readData = (user) => {
  /*   let userData = {}; */
  try {
    firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .onSnapshot(function (doc) {
        console.log(doc.data());
        /*  userData = Object.assign(userData, doc.data()); */
      });
  } catch (error) {
    console.log(error);
  }
  /*   return userData; */
};
