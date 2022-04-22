import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';
import Button from '../shared/button/Button';

const WriteToCloudFirestore = ({ type, children, collectedInformation }) => {
  const { user } = useUser();


  const { profileImage, birthdate, myInterests, description } =
    collectedInformation;

  const sendData = (e) => {
    e.preventDefault();
    try {
      firebase.firestore().collection('users').doc(user.id).set({
        name: user.name,
        email: user.email,
        uid: user.id,
        birthdate,
        profileImage,
        myInterests,
        description,
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
