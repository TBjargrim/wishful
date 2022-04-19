import NextImage from 'next/image';
import Link from 'next/link';
import styles from './_navbar.module.scss';

const NavbarIcon = () => {
  return (
    <section className={styles.navbarContainer}>
      <Link href="/">
        <a aria-label="link to homepage">
          <NextImage src="/logo_2.svg" alt="logo" width="90" height="90" />
        </a>
      </Link>
    </section>
  );
};

export default NavbarIcon;
