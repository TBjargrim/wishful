import styles from '../styles/_homepage.module.scss';
import NextImage from 'next/image';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import { sv } from 'date-fns/locale';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const Hem = () => {
  const locales = {
    sv: sv,
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

  const events = [
    {
      title: 'Sandras födelsedag',
      type: 'birthday',
      color: '#6E97FF',
      // allDay: true,
      start: new Date(2022, 4, 4),
      end: new Date(2022, 4, 4),
    },
    {
      title: 'Kalles födelsedag',
      type: 'birthday',
      color: '#6E97FF',
      // allDay: true,
      start: new Date(2022, 4, 4),
      end: new Date(2022, 4, 4),
    },
    {
      title: 'Sandras födelsedag',
      type: 'birthday',
      color: '#6E97FF',
      // allDay: true,
      start: new Date(2022, 4, 4),
      end: new Date(2022, 4, 4),
    },
    {
      title: 'Sandras födelsedag',
      type: 'birthday',
      color: '#6E97FF',
      // allDay: true,
      start: new Date(2022, 4, 4),
      end: new Date(2022, 4, 4),
    },
    {
      title: 'Pernillas bröllopsdag',
      type: 'wedding',
      color: '#BF6EFF',
      // allDay: true,
      start: new Date(2022, 4, 5),
      end: new Date(2022, 4, 5),
    },
    {
      title: 'Lisas fest',
      type: 'party',
      color: '#FFC855',
      // allDay: true,
      start: new Date(2022, 4, 8),
      end: new Date(2022, 4, 8),
    },
    {
      title: 'Therese och Bens bröllopsdag',
      type: 'wedding',
      color: '#BF6EFF',
      // allDay: true,
      start: new Date(2022, 4, 12),
      end: new Date(2022, 4, 12),
    },
    {
      title: 'Lenas födelsedag',
      type: 'birthday',
      color: '#6E97FF',
      // allDay: true,
      start: new Date(2022, 4, 13),
      end: new Date(2022, 4, 13),
    },
    {
      title: 'Lars Bröllopsdag',
      type: 'wedding',
      color: '#BF6EFF',
      // allDay: true,
      start: new Date(2022, 4, 23),
      end: new Date(2022, 4, 23),
    },
  ];

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
              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/wedding-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>2 maj</h4>
                  <p>Therese och Bens bröllopsdag</p>
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
            {/* <div className={styles.emptyMessage}>
              <p>Denna månad är det inga händelser eller event</p>
            </div> */}
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div>
            <h3>Påminnelse</h3>
          </div>
          <div className={styles.reminders}>
            <div className={styles.reminderCard}>
              <div className={styles.cardImg}>
                <NextImage
                  src="/present-circle.svg"
                  alt="logo"
                  width="40"
                  height="40"
                />
              </div>
              <div>
                <h6>Snart fyller Sandra år</h6>
                <p>
                  <span>3 dagar</span> kvar
                </p>
                <a>
                  <button>Se önskelistor</button>
                </a>
              </div>
            </div>

            {/* <div className={styles.emptyMessage}>
              <p>Du har inga påminnelser just nu</p>
            </div> */}
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
