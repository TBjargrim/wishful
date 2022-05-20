import { useState, useRef } from 'react';
import styles from '../styles/_homepage.module.scss';
import NextImage from 'next/image';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import { sv } from 'date-fns/locale';
import startOfWeek from 'date-fns/startOfWeek';
import { db } from '../firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { setAllData } from '../components/helperFunctions';

const Hem = ({
  name,
  userDetails,
  usersFollow,
  addedDates,
  setUsersFollow,
  setCollectedInformation,
  setAllWishlists,
}) => {
  const [friendsData, setFriendsData] = useState([]);
  const [events, setEvents] = useState([]);

  const didMount = useRef(false);

  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [reminderDates, setReminderDates] = useState([]);

  const locales = {
    sv: sv,
  };

  const { user } = useAuth();

  useEffect(() => {
    setAllData(
      user,
      setCollectedInformation,
      addedDates,
      setUsersFollow,
      setAllWishlists
    );
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setFriendsData(
        userDetails.filter((o1) => usersFollow.some((o2) => o1.uid === o2.uid))
      );
    } else didMount.current = true;
  }, [usersFollow]);

  useEffect(() => {
    const newAddedDates = changeAddedDates(friendsData);
    const eventsData = friendsData.map((v) => ({
      title: v.name + ' Födelsedag',
      type: 'Födelsedag',
      writtenDate: v.updatedBirthdate,
      icon: '/birthday-circle.svg',
      color: colorForEvent('Födelsedag'),
      allDay: true,
      start: changeYear(v.birthdate),
      end: changeYear(v.birthdate),
    }));

    const mergedDates = [...newAddedDates, ...eventsData];

    setEvents(mergedDates);
  }, [friendsData]);

  useEffect(() => {
    setCurrentMonthDates(getThisMonthsDates(events));
  }, [events]);

  useEffect(() => {
    setReminderDates(findClosestDates(currentMonthDates));
  }, [currentMonthDates]);

  const changeYear = (getDate) => {
    for (let i = 0; i < getDate.length; i++) {
      let getYear = getDate.slice(0, 4);
      let newBirthdate = getDate.replace(getYear, '2022');
      return newBirthdate;
    }
  };

  const changeAddedDates = (arr) => {
    let allAddedDates = [];

    for (let i = 0; i < arr.length; i++) {
      let datesArray = arr[i].addedDates;
      let getName = arr[i].name;
      for (let i = 0; i < datesArray.length; i++) {
        const friendAddedDate = {
          name: getName + ' ' + datesArray[i].selected,
          date: datesArray[i].date,
          writtenDate: datesArray[i].updatedDate,
          type: datesArray[i].selected,
          icon: datesArray[i].icon,
        };
        allAddedDates.push(friendAddedDate);
      }
    }

    const eventsDataVol2 = allAddedDates.map((v) => ({
      title: v.name,
      type: v.type,
      writtenDate: v.writtenDate,
      color: colorForEvent(v.type),
      allDay: true,
      start: changeYear(v.date),
      end: changeYear(v.date),
      icon: v.icon,
    }));
    return eventsDataVol2;
  };

  const colorForEvent = (type) => {
    switch (type) {
      case 'Födelsedag':
        return '#5B87F9';

      case 'Bröllopsdag':
        return '#AF52F8';

      case 'Årsdag':
        return '#F3D224';

      case 'Övrigt':
        return '#F3556C';

      default:
        return '#5B87F9';
    }
  };

  const getThisMonthsDates = (allDates) => {
    const today = new Date().toLocaleDateString('sv-SE');
    const currentMonth = new Date(today).getMonth() + 1;
    const monthDates = [];

    for (let i = 0; i < allDates.length; i++) {
      let str = new Date(allDates[i].start);

      if (str.getMonth() + 1 === currentMonth) {
        monthDates.push(allDates[i]);
      }
    }

    return monthDates;
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const languageChange = {
    allDay: 'Hela dagen',
    previous: '<',
    next: '>',
    today: 'Idag',
    month: 'Månad',
    week: 'Vecka',
    day: 'Dag',
    agenda: 'Översikt',
    date: 'Datum',
    time: 'Tid',
    event: 'Event',
    showMore: (total) => `+ ${total} till`,
  };

  const findClosestDates = (dates) => {
    let allUpcommingEvents = [];
    const today = new Date().toLocaleDateString('sv-SE').slice(8, 10);

    for (let i = 0; i < dates.length; i++) {
      const theDate = dates[i].start;
      if (theDate.slice(8, 10) > today) {
        // console.log('bigger');
        // console.log(dates[i]);
        const dateForReminder = {
          date: dates[i].start,
          newDate: theDate.slice(8, 10) - today,
          title: dates[i].title,
          type: dates[i].type,
        };
        allUpcommingEvents.push(dateForReminder);
      }
      // else if (theDate.slice(8, 10) < today) {
      //   console.log('smaller');
      // }
    }
    const sortedArr = allUpcommingEvents.sort((x, y) => {
      return x.newDate - y.newDate;
    });

    return sortedArr;
  };

  // console.log(findClosestDates(currentMonthDates));

  return (
    <div>
      <div className={styles.homepageContainer}>
        <div className={styles.leftContainer}>
          {/* <div className={styles.searchWrapper}>
            <input placeholder="Sök bland dina vänner"></input>
          </div> */}
          <div className={styles.eventsWrapper}>
            <div>
              <h3>Denna månad</h3>
            </div>
            <div className={styles.cardWrapper}>
              {currentMonthDates.length > 0 ? (
                currentMonthDates.map(({ title, type, writtenDate, icon }) => (
                  <div className={styles.eventCard}>
                    <div className={styles.cardImg}>
                      <NextImage src={icon} alt="logo" width="45" height="45" />
                    </div>
                    <div>
                      <h5>{writtenDate}</h5>
                      <p>{title}</p>
                      {/* <p>{type}</p> */}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyMessage}>
                  <p>Denna månad är det inga händelser eller event</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div>
            <h3>Påminnelse</h3>
          </div>
          <div className={styles.reminders}>
            {reminderDates.length > 0 ? (
              reminderDates.map(({ title, newDate }) => (
                <div className={styles.reminderCard}>
                  <div className={styles.cardImgReminder}>
                    <NextImage
                      src="/present-circle.svg"
                      alt="logo"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div>
                    <h6>Snart är det {title}</h6>
                    <p>
                      <span>{newDate} dagar</span> kvar
                    </p>
                    <a>
                      <button>Se önskelistor</button>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyMessage}>
                <p>Du har inga påminnelser just nu</p>
              </div>
            )}
          </div>
          <div className={styles.calender}>
            <Calendar
              classname={styles.calendarStyle}
              localizer={localizer}
              culture={'sv'}
              messages={languageChange}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={(events) => ({
                style: { backgroundColor: events.color, width: '95%' },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hem;

export const getStaticProps = async () => {
  const userDetails = [];

  const queryDetails = query(collection(db, 'usersDetails'));

  const querySnapshotDetails = await getDocs(queryDetails);

  querySnapshotDetails.docs.map((doc) => userDetails.push(doc.data()));

  return {
    props: {
      userDetails,
      fallback: true,
    },
  };
};
