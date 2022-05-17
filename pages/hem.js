import { useState } from 'react';
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

const Hem = ({ userDetails, usersFollow }) => {
  const [friendsData, setFriendsData] = useState([]);
  const [events, setEvents] = useState([]);

  const locales = {
    sv: sv,
  };

  useEffect(() => {
    let usersFollowDetails = userDetails.filter((o1) =>
      usersFollow.some((o2) => o1.uid === o2.uid)
    );
    setFriendsData(usersFollowDetails);
  }, [usersFollow]);

  useEffect(() => {
    const eventsData = friendsData.map((v) => ({
      title: v.name,
      type: 'födelsedag',
      birthday: v.updatedBirthdate,
      allEvents: v.addedDates,
      color: '#6E97FF',
      // allDay: true,
      start: new Date(v.birthdate),
      end: new Date(v.birthdate),
    }));

    setEvents(eventsData);
  }, [friendsData]);


  const changeYear = (friend) => {
    let getDate = friend.map((date) => date.birthdate);
    let newFriendDates = [];

    for (let i = 0; i < getDate.length; i++) {
      let getYear = getDate[i].slice(0, 4);
      let makeNewDate = getDate[i].replace(getYear, '2022');
      newFriendDates.push(makeNewDate);
    }
    return newFriendDates
  };
  console.log(changeYear(friendsData));


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

  return (
    <div>
      <div className={styles.homepageContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.searchWrapper}>
            <input placeholder="Sök bland dina vänner"></input>
          </div>
          <div className={styles.eventsWrapper}>
            <div>
              <h3>Denna månad</h3>
            </div>
            <div className={styles.cardWrapper}>
              {events.length > 0 ? (
                events.map(({ title, type, birthday }) => (
                  <div className={styles.eventCard}>
                    <div className={styles.cardImg}>
                      <NextImage
                        src="/confetti-circle.svg"
                        alt="logo"
                        width="45"
                        height="45"
                      />
                    </div>
                    <div>
                      <h5>{birthday}</h5>
                      <p>{title}</p>
                      <p>{type}</p>
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
            {events.length > 0 ? (
              events.map(({ title, type, birthday }) => (
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
                    <h6>
                      Snart är det {title} {type}
                    </h6>
                    <p>
                      <span>3 dagar</span> kvar
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

{
  /*          <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>8 maj</h4>
                  <p>Sandras födelsedag</p>
                </div>
              </div>

              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/confetti-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>17 maj</h4>
                  <p>Therese och Bens Bröllopsdag</p>
                </div>
              </div>

              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>28 maj</h4>
                  <p>Therese och Bens Bröllopsdag</p>
                </div>
              </div>
            </div>
          <div className={styles.emptyMessage}>
              <p>Denna månad är det inga händelser eller event</p>
            </div> */
}
