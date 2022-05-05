import { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import styles from './_dropDownMenu.module.scss';
import { logout } from '../../firebase/useUser';

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleOpenMenu = () => setIsActive(!isActive);

  console.log(isActive);

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
        <NextImage src="/avatar_1.svg" alt="avatar" width="64" height="64" />
      </div>
      <nav ref={dropdownRef} className={`${styles.menu} ${setActiveClass}`}>
        <ul>
          <li>
            <a href="/kontoinstallningar">Kontoinställningar</a>
          </li>
          <li onClick={() => logout()}>
            <a href="/">Logga ut</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
