import NextImage from 'next/image';
import styles from './_navbar.module.scss';

const NavbarIcon = () => {
  return (
    <section className={styles.navbarContainer}>
      <NextImage src="/logo_2.svg" alt="logo" width="90" height="90" />
    </section>
  );
};

export default NavbarIcon;
