import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';
import Button from '../shared/button/Button';

const WriteToCloudFirestore = ({ type, children }) => {
  const { user } = useUser();
  console.log(user);

  const sendData = (e) => {
    e.preventDefault();

    try {
      firebase.firestore().collection('users').doc(user.id).set({
        name: user.name,
        email: user.email,
        uid: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type={type} onClick={sendData}>
        {children}
      </button>
    </>
  );
};

export default WriteToCloudFirestore;
