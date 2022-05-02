import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';
import { useCollection } from 'react-firebase-hooks/firestore';

const ReadToCloudFirestore = () => {
  const { authUser } = useUser();
  const readData = (user) => {
    console.log(user);
    try {
      firebase
        .firestore()
        .collection('my_information')
        .doc(authUser.uid)
        .onSnapshot(function (doc) {
          console.log(doc.data());
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return <button onClick={readData}>Read Data From Cloud firestore</button>;
};

export default ReadToCloudFirestore;
