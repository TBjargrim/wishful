import { useEffect, useState } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import Icon from '../components/shared/Icon';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import AnimateHeight from 'react-animate-height';

const Profile = ({ user }) => {
  const [myInfo, setMyInfo] = useState({});
  const [interests, setInterests] = useState([]);
  const [height, setHeight] = useState(0);
  const [listheight, setListHeight] = useState(0);
  const [newWishlist, setNewWishlist] = useState({
    id:'',
    listName: '',
    categorie: '',
    icon: '/birthday-circle.svg',
    items: [],
  });
  const [showInput, setShowInput] = useState(false)
  const [saveInput, setSaveInput] = useState('');

  const lists = [
    {
      id:'1',
      listName: 'Födelsedag',
      categorie: 'Birthday',
      icon: '/birthday-circle.svg',
      items: ['Stickad tröja', 'Cykel'],
    },
    {
      id:'2',
      listName: 'Bröllopsdag',
      categorie: 'Weddingday',
      icon: '/wedding-circle.svg',
      items: ['Vinglas', 'Kastrull', 'Spel'],
    },
  ];

  const [allWishlists, setAllWishlists] = useState(lists);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
          // console.log('data from firestore');
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
          // console.log('data from localStorage');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
          // console.log('data from firestore');
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
          // console.log('data from localStorage');
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
      });
    }
    if (e.target.id === 'Wedding') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: weddingDayIcon,
      });
    }
    if (e.target.id === 'Anniversary') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: anniversaryIcon,
      });
    }
    if (e.target.id === 'Christmas') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: christmasIcon,
      });
    } else if (e.target.id === 'Other') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: otherIcon,
      });
    }
  };

const handleAddItemToList = (e) => {
  e.preventDefault();
  setSaveInput(e.target.value);
  console.log(saveInput)
} 

const addNewItem =  index => e => {
  e.preventDefault();
  
  // let foundList = allWishlists.find(item => item.listName)
  let foundLists = [...allWishlists]
  // console.log(foundLists[index].categorie)
  foundLists[index] = {
      id: foundLists[index].id,
      listName: foundLists[index].listName,
      categorie: foundLists[index].categorie,
      icon: foundLists[index].icon,
      items: [...foundLists[index].items, saveInput]
    }
setAllWishlists(foundLists)
console.log(allWishlists)
  }


  // let allLists = allWishlists.filter(list => list != listName)

  // const newAddedList = {
  //   id: foundList.id,
  //   listName: foundList.listName,
  //   categorie: foundList.categorie,
  //   icon: foundList.icon,
  //   listItems: [...foundList.items, saveInput]
  // }
  // setNewWishlist(newAddedList)
  // setAllWishlists([...allWishlists, newAddedList]);
  // console.log(allWishlists)
// }


  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />

          {user && (
            <>
              <h5>{user.displayName}</h5>
              <p>{user.email}</p>
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
                  <h5>{myInfo.birthdate}</h5>
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
                  <h5>{dates.date}</h5>
                  <p>{dates.selected}</p>
                </div>
              </div>
            ))}

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>
            {interests &&
              interests.map((interest) => (
                <div className={styles.interestsCards}>
                  <p>{interest}</p>
                </div>
              ))}
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
                        id="Weddingday"
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
            </form>
          </AnimateHeight>
        </div>

        <div className={styles.wishlistsWrapper}>
          {allWishlists.map(({ icon, listName, items  },index) => (
            <div
              // key={index}
              className={styles.wishlist}
              
            >
              <div className={styles.iconTitleWrapper}>
                <NextImage src={icon} alt="logo" width="35" height="35" />

                <h4 onClick={() => setListHeight(listheight === 0 ? 'auto' : 0)}>{listName}</h4>
              </div>
              {/* <div className={styles.arrowWrapper}>
              <Icon src="/arrowIcon.svg" altText="Icon" />
              </div> */}
              <div className={styles.wrapper}>
                <AnimateHeight id="panel" duration={500} height={listheight}>
                  <div className={styles.addedItems}>
                    {items && items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <form>
                  <input
                    id="listItem"
                    type="text"
                    name="listItem"
                    // value={newWishlist.items}
                    placeholder="skriv här"
                    // onChange={}
                    onChange={handleAddItemToList}
                    />
                  <button onClick={addNewItem(index)}>lägg till +</button>
                  </form>
                  
                </AnimateHeight>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
