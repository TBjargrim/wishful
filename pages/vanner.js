import styles from '../styles/_searchFriends.module.scss';
import Link from 'next/link';

const Friends = () => {
  return (
    <div className={styles.friendsWrapper}>
      <section className={styles.leftColumn}>
        <h3>Hitta nya vänner</h3>

        <input placeholder="Sök bland nya vänner" />
      </section>

      <section className={styles.rightColumn}>
        <h3>Mina vänner</h3>
        <input placeholder="Sök bland mina vänner" />
      </section>
    </div>
  );
};

export default Friends;
