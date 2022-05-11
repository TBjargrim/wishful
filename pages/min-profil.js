import { useEffect, useState } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import AnimateHeight from 'react-animate-height';

const Profile = ({ user }) => {
  const [myInfo, setMyInfo] = useState({});
  const [interests, setInterests] = useState([]);
  const [height, setHeight] = useState(0);
  const [listheight, setListHeight] = useState(0);
  const [newWishlist, setNewWishlist] = useState({
    id: '',
    listName: '',
    categorie: '',
    icon: '/birthday-circle.svg',
    items: [],
  });
  const [saveInput, setSaveInput] = useState('');
  const [open, setOpen] = useState(false);
  const [allWishlists, setAllWishlists] = useState([]);

  const openList = (id) => {
    if (open === id) {
      return setOpen(true);
    }
    setOpen(id);
  };

  const handleAddWishlist = (e) => {
    e.preventDefault();
    setAllWishlists([...allWishlists, newWishlist]);
  };

  const onValueChange = (e) => {
    const birthdayIcon = '/birthday-circle.svg';
    const weddingDayIcon = '/wedding-circle.svg';
    const anniversaryIcon = '/flowers-circle.svg';
    const christmasIcon = '/christmas-circle.svg';
    const otherIcon = '/confetti-circle.svg';

    if (e.target.id === 'Birthday') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: birthdayIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Wedding') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: weddingDayIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Anniversary') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: anniversaryIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Christmas') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: christmasIcon,
        id: Date.now(),
      });
    } else if (e.target.id === 'Other') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: otherIcon,
        id: Date.now(),
      });
    }
  };

  const handleAddItemToList = (e) => {
    e.preventDefault();
    setSaveInput(e.target.value);
    console.log(saveInput);
  };

  const addNewItem = (index) => (e) => {
    e.preventDefault();
    let foundLists = [...allWishlists];
    foundLists[index] = {
      id: foundLists[index].id,
      listName: foundLists[index].listName,
      categorie: foundLists[index].categorie,
      icon: foundLists[index].icon,
      items: [...foundLists[index].items, saveInput],
    };
    setAllWishlists(foundLists);
  };

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (myInfo.myInterests !== undefined) {
      const interests = myInfo.myInterests;
      const arrInterests = interests.split(',');
      setInterests(arrInterests);
    }
  }, [myInfo]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />

          {user && (
            <>
              <h5>{user.displayName}</h5>
              {/* <p>{user.email}</p> */}
              {myInfo && <p>{myInfo.description}</p>}
            </>
          )}
        </div>

        <div>
          {myInfo.birthdate !== '' ? (
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
                  <h5>{myInfo.updatedBirthdate}</h5>
                  <p>Födelsedag</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {myInfo.addedDates &&
            myInfo.addedDates.map((dates) => (
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
            <div className={styles.interestsCards}>
              {interests && interests.map((interest) => <p>{interest}</p>)}
            </div>
          </div>

          <div className={styles.editButton}>
            <Link href={'/kontoinstallningar'} passHref>
              <a>
                <Button type="primary">Redigera info</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wishlistContainer}>
        <div>
          <h3>Mina önskelistor</h3>
          <div className={styles.newListWrapper}>
            <button
              type="default"
              onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            >
              Skapa ny lista +
            </button>
          </div>
          <AnimateHeight id="panel" duration={500} height={height}>
            <form className={styles.newListForm}>
              <div className={styles.listHeader}>
                <NextImage
                  src="/empty-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
                <h3>Ny lista ...</h3>
              </div>
              <div className={styles.contentWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.nameInput}>
                  <label>Namn på ny lista</label>
                  <input
                    id="listname"
                    type="text"
                    name="listName"
                    value={newWishlist.listName}
                    placeholder="ex. önskelista"
                    onChange={(e) =>
                      setNewWishlist({
                        ...newWishlist,
                        listName: e.target.value,
                      })
                    }
                  ></input>
                </div>

                <div className={styles.categorieWrapper}>
                  <label>Välj kategori</label>
                  <div className={styles.radioButtonsWrapper}>
                    <div className={styles.radioButton}>
                      <input
                        id="Birthday"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Födelsedag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Wedding"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Bröllopsdag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Anniversary"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Årsdag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Christmas"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Jul</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Other"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Övrigt</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <button onClick={(e) => handleAddWishlist(e)}>Klar</button>
              </div>
              </div>
            </form>
          </AnimateHeight>
        </div>

        <div className={styles.wishlistsWrapper}>
          {allWishlists.map(({ icon, listName, items, id }, index) => (
            <div key={index} className={styles.wishlist}>
              <div className={styles.iconTitleWrapper}>
                <NextImage src={icon} alt="logo" width="35" height="35" />
                <h4 onClick={() => openList(id)}>{listName}</h4>
              </div>
              {open === id ? (
                <div className={styles.wrapper}>
                  <ul className={styles.addedItems}>
                    {items && items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <form className={styles.formContainer}>
                    <input
                      id="listItem"
                      type="text"
                      name="listItem"
                      placeholder="Skriv vad du önskar dig"
                      onChange={handleAddItemToList}
                    />
                    <button onClick={addNewItem(index)}>
                      Lägg till i listan +
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
