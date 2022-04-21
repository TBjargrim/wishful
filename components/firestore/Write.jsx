import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';
import Button from '../shared/button/Button';

const WriteToCloudFirestore = ({ type, children }) => {
  const { user } = useUser();
  console.log(user);

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

  return (
    <>
      {user && (
        <Button type={type} onClick={sendData}>
          {children}
        </Button>
      )}
    </>
  );
};

export default WriteToCloudFirestore;
