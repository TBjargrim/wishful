import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import styles from './_dropDownMenu.module.scss';
import { useAuth } from '../../context/AuthContext';
import useRouter from 'next/router';

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter;

  const handleOpenMenu = () => setIsActive(!isActive);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  const setActiveClass = isActive ? `${styles.active}` : `${styles.inActive}`;

  return (
    <div className={styles.menuContainer}>
      <div onClick={handleOpenMenu} className={styles.menuTrigger}>
        <NextImage src="/avatar_1.svg" alt="avatar" width="75" height="75" />
      </div>
      <nav ref={dropdownRef} className={`${styles.menu} ${setActiveClass}`}>
        <ul>
          <li>
            <Link href="/kontoinstallningar">
              <a aria-label="link to homepage">Kontoinställningar</a>
            </Link>
          </li>
          <li
            onClick={() => {
              handleLogout();
            }}
          >
            <a>Logga ut</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
