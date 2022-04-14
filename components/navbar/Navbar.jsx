import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import styles from './_navbar.module.scss';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const burgerMenuClass = openMenu ? `${styles.open}` : '';

  const handleClick = () => {
    setOpenMenu((open) => !open);
  };

  return (
    <>
      <section className={styles.navbarContainer}>
        <Link href="/">
          <a aria-label="link to homepage">
            <NextImage src="/logo_2.svg" alt="logo" width="90" height="90" />
          </a>
        </Link>

        <div>
          <ul className={styles.navbarList}>
            <li>
              <Link href="/">
                <a aria-label="link to homepage">Hem</a>
              </Link>
            </li>
            <li>
              <Link href="/min-profil">
                <a aria-label="link to mypage">Min sida</a>
              </Link>
            </li>
            <li>
              <Link href="/vanner">
                <a aria-label="link to friendspage">Vänner</a>
              </Link>
            </li>
          </ul>
          <NextImage src="/avatar_1.svg" alt="avatar" width="64" height="64" />
        </div>

        <div className={`${styles.mobileContainer} ${burgerMenuClass}`}>
          <label for="check">
            <input type="checkbox" id="check" onClick={handleClick} />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </section>
    </>
  );
};

export default Navbar;
