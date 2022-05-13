import React, { useContext } from 'react';
import { useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import styles from './_navbar.module.scss';
import { useUser } from '../../firebase/useUser';
import DropdownMenu from '../dropDownMenu/DropDownMenu';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { authUser, logout } = useUser();

  const burgerMenuClass = openMenu ? `${styles.open}` : '';

  const handleClick = () => {
    setOpenMenu((open) => !open);
  };

  if (authUser) {
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

              <div className={styles.navbarItems}>
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
                </ul>
                <DropdownMenu />
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
            </ul>
            <div className={styles.logoutBtnContainer}>
              <button onClick={() => logout()}>Logga ut</button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <div className={styles.iconWrapper}><NextImage src="/logo_2.svg" alt="logo" width="90" height="90" /></div>
  }
};

export default Navbar;
