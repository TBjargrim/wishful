import NextImage from 'next/image';
import Icon from '../../components/shared/Icon';
import styles from '../../styles/_profile.module.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';

const dynamicFriend = ({ queryUser, detailsUser }) => {
  const { name, email } = queryUser;

  const {
    addedDates,
    birthdate,
    updatedBirthdate,
    description,
    myInterests,
    profileImage,
  } = detailsUser[0];

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />
          <h5>{name}</h5>
          <p>{email}</p>
        </div>

        <div>
          {updatedBirthdate ? (
            <div className={styles.middleSection}>
              <div className={styles.dateCard}>
                <div>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="35"
                    height="35"
                  />
                </div>
                <div>
                  <h5>{updatedBirthdate}</h5>
                  <p>Födelsedag</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.middleSection}>
                <div className={styles.dateCard}>
                  <div>
                    <NextImage
                      src="/birthday-circle.svg"
                      alt="logo"
                      width="35"
                      height="35"
                    />
                  </div>
                  <div>
                    <h5>{birthdate}</h5>
                    <p>Födelsedag</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {addedDates &&
            addedDates.map((dates) => (
              <div className={styles.dateCard}>
                <div>
                  <NextImage
                    src={dates.icon}
                    alt="logo"
                    width="35"
                    height="35"
                  />
                </div>
                <div>
                  <h5>{dates.updatedDate}</h5>
                  <p>{dates.selected}</p>
                </div>
              </div>
            ))}

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>
            {myInterests ??
              myInterests.map((interest) => (
                <div className={styles.interestsCards}>
                  <p>{interest}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.wishlistContainer}>
        <div>
          <h3>{name}s önskelistor</h3>
        </div>
        <div className={styles.wishlistsWrapper}>
          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/birthday-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Födelsedag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/wedding-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Bröllopsdag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/christmas-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Jul</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamicFriend;

export async function getStaticPaths() {
  const users = [];
  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  const paths = users.map((user) => {
    return {
      params: { uid: user.uid },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.uid;

  const users = [];
  const detailsUser = [];
  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  const queryUser = users.find((user) => user.uid === id);

  const details = doc(db, 'usersDetails', id);

  await getDoc(details).then((snapshot) => {
    detailsUser.push({ ...snapshot.data() });
  });

  return {
    props: {
      queryUser,
      detailsUser,
      fallback: false,
    },
  };
};
