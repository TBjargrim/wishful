import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { useUser } from '../../firebase/useUser';

const ReadToCloudFirestore = () => {
  const { user } = useUser();
  const readData = () => {
    try {
      firebase
        .firestore()
        .collection('my_information')
        .doc(user.id)
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
