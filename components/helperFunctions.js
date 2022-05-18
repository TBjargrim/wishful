import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
let testDateString = '2015-10-14';
export function changedDate(date) {
  function getTheDay(date) {
    return date.slice(8, 10);
  }

  function getMonth(date) {
    let months = [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ];

    let splitDate = date.split('-');
    let getMonth = splitDate[1];
    if (getMonth && getMonth.slice(0, 1) == 0) {
      let noZero = getMonth.slice(1, 2);
      let getOneLessNumber = (noZero -= 1);
      return months[getOneLessNumber];
    } else if (getMonth && getMonth.slice(0, 1) == 1) {
      let getOneLessNumber = (getMonth -= 1);
      return months[getOneLessNumber];
    } else {
      return 'not a date!';
    }
  }

  return getTheDay(date) + ' ' + getMonth(date);
}

export const setAllData = (
  name,
  user,
  setCollectedInformation,
  addedDates,
  setUsersFollow,
  setAllWishlists
) => {
  if (user) {
    const docRef = doc(db, 'usersDetails', user.uid);
    const docRefFriends = doc(db, 'friends', user.uid);
    const docRefWishlist = doc(db, 'wishlist', user.uid);

    onSnapshot(docRef, (doc) => {
      if (doc.data() !== undefined) {
        setCollectedInformation({ ...doc.data() });
      } else {
        setDoc(docRef, {
          profileImage: '',
          birthdate: '',
          myInterests: '',
          description: '',
          addedDates,
          id: user.uid,
          name,
        });
      }
    });

    onSnapshot(docRefFriends, (doc) => {
      if (doc.data() !== undefined) {
        setUsersFollow(doc.data().friends);
      } else {
        setDoc(docRefFriends, { friends: [] });
      }
    });
    onSnapshot(docRefWishlist, (doc) => {
      if (doc.data() !== undefined) {
        let storedLists = doc.data().wishlist;
        setAllWishlists(storedLists);
      } else {
        setDoc(docRefWishlist, { wishlist: [] });
      }
    });
  }
};
