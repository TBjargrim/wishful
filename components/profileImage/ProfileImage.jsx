import { useState } from 'react';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Icon from '../shared/Icon';
import styles from './_profileImage.module.scss';

const ProfileImage = ({ collectedInformation }) => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState();

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className={styles.profileImageContainer}>
        <p>Ändra profilbild</p>

        <div className={styles.profileImageWrapper}>
          {image ? (
            <img src={image} alt="logo" width="80" height="80" />
          ) : (
            <Icon src="/avatar_1.svg" alt="logo" width="70" height="70" />
          )}

          <form onSubmit={formHandler} className={styles.form}>
            <label className={styles.chooseFileButton}>
              Välj fil
              <input type="file" className={styles.input} />
            </label>
            <button className={styles.submitButton} type="submit">
              {progress == 0
                ? 'Ladda upp'
                : progress == 100
                ? 'Klar'
                : `${progress} %`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
