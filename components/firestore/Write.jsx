import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';

const WriteToCloudFirestore = () => {
  const { user } = useUser();

  const sendData = () => {
    try {
      firebase
        .firestore()
        .collection('my_information')
        .doc(user.id)
        .set({
          name: 'Therese',
        })
        .then(alert('Success'));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return <button onClick={sendData}>Send Data To Cloud firestore</button>;
};

export default WriteToCloudFirestore;
