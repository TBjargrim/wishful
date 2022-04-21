import React, { useContext } from 'react';
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import styles from './_navbar.module.scss';
import { useUser } from '../../firebase/useUser';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useUser();

  const burgerMenuClass = openMenu ? `${styles.open}` : '';

  const handleClick = () => {
    setOpenMenu((open) => !open);
  };

  if (user) {
    return (
      <>
        <section className={`${styles.navbarContainer} ${burgerMenuClass}`}>
          {!openMenu && (
            <>
              <Link href="/hem">
                <a aria-label="link to homepage">
                  <NextImage
                    src="/logo_2.svg"
                    alt="logo"
                    width="90"
                    height="90"
                  />
                </a>
              </Link>

              <div>
                <ul className={styles.navbarList}>
                  <li>
                    <Link href="/hem">
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
                  <li onClick={() => logout()}>Logga ut</li>
                </ul>
                <NextImage
                  src="/avatar_1.svg"
                  alt="avatar"
                  width="64"
                  height="64"
                />
              </div>
            </>
          )}
          <div
            onClick={handleClick}
            className={`${styles.mobileContainer} ${burgerMenuClass}`}
          >
            <div className={styles.menuButton}></div>
          </div>
        </section>

        {openMenu && (
          <div className={styles.mobileList}>
            <ul>
              <li onClick={() => setOpenMenu(!openMenu)}>
                <Link href="/hem">
                  <a aria-label="link to homepage">Hem</a>
                </Link>
              </li>
              <li onClick={() => setOpenMenu(!openMenu)}>
                <Link href="/min-profil">
                  <a aria-label="link to mypage">Min sida</a>
                </Link>
              </li>
              <li onClick={() => setOpenMenu(!openMenu)}>
                <Link href="/vanner">
                  <a aria-label="link to friendspage">Vänner</a>
                </Link>
              </li>
              <li onClick={() => logout()}>
                <a aria-label="logga ut">Logga ut</a>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  } else {
    return <NextImage src="/logo_2.svg" alt="logo" width="90" height="90" />;
  }
};

export default Navbar;
