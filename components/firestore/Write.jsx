import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useUser } from '../../firebase/useUser';

import { db } from '../../firebase/config';

const WriteToCloudFirestore = ({ type, children, collectedInformation }) => {
  const { authUser } = useUser();
  const { profileImage, birthdate, myInterests, description } =
    collectedInformation;

  const sendData = (e) => {
    e.preventDefault();

    try {
      db.firestore().collection('users').doc(authUser.id).set({
        name: authUser.displayName,
        email: authUser.email,
        id: authUser.id,
        birthdate,
        profileImage,
        myInterests,
        description,
      });
      dispatch(
        update({
          name: user.name,
          email: user.email,
          uid: user.id,
          profileImage,
          birthdate,
          myInterests,
          description,
        })
      );
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
