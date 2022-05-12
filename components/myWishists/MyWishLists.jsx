import { useEffect, useState } from 'react';
import styles from '../../styles/_profile.module.scss';
import AnimateHeight from 'react-animate-height';
import NextImage from 'next/image';
import Button from '../shared/button/Button';

const MyWishLists = ({
  setAllWishlists,
  allWishlists,
  newWishlist,
  setNewWishlist,
}) => {
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [listheight, setListHeight] = useState(0);
  const [saveInput, setSaveInput] = useState('');

  const openList = (id) => {
    if (open === id) {
      return setOpen(true);
    }
    setOpen(id);
  };

  const handleAddItemToList = (e) => {
    e.preventDefault();
    setSaveInput(e.target.value);
  };

  const addNewItem = (index) => (e) => {
    e.preventDefault();
    let foundLists = [...allWishlists];
    foundLists[index] = {
      id: foundLists[index].id,
      listName: foundLists[index].listName,
      categorie: foundLists[index].categorie,
      icon: foundLists[index].icon,
      items: [...foundLists[index].items, saveInput],
    };
    setAllWishlists(foundLists);
  };

  const handleAddWishlist = (e) => {
    e.preventDefault();
    setAllWishlists([...allWishlists, newWishlist]);
  };

  const onValueChange = (e) => {
    const birthdayIcon = '/birthday-circle.svg';
    const weddingDayIcon = '/wedding-circle.svg';
    const anniversaryIcon = '/flowers-circle.svg';
    const christmasIcon = '/christmas-circle.svg';
    const otherIcon = '/confetti-circle.svg';

    if (e.target.id === 'Birthday') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: birthdayIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Wedding') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: weddingDayIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Anniversary') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: anniversaryIcon,
        id: Date.now(),
      });
    }
    if (e.target.id === 'Christmas') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: christmasIcon,
        id: Date.now(),
      });
    } else if (e.target.id === 'Other') {
      setNewWishlist({
        ...newWishlist,
        categorie: e.target.id,
        icon: otherIcon,
        id: Date.now(),
      });
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    const updatedList = allWishlists.filter((list) => list.id !== id);

    setAllWishlists(updatedList);
  };

  return (
    <div className={styles.wishlistContainer}>
      <div>
        <h3>Mina önskelistor</h3>
        <div className={styles.newListWrapper}>
          <button
            type="default"
            onClick={() => setHeight(height === 0 ? 'auto' : 0)}
          >
            Skapa ny lista +
          </button>
        </div>

        <AnimateHeight id="panel" duration={500} height={height}>
          <form className={styles.newListForm}>
            <div className={styles.listHeader}>
              <NextImage
                src="/empty-circle.svg"
                alt="logo"
                width="35"
                height="35"
              />
              <h3>Ny lista ...</h3>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.nameInput}>
                  <label>Namn på ny lista</label>
                  <input
                    id="listname"
                    type="text"
                    name="listName"
                    value={newWishlist.listName}
                    placeholder="ex. önskelista"
                    onChange={(e) =>
                      setNewWishlist({
                        ...newWishlist,
                        listName: e.target.value,
                      })
                    }
                  ></input>
                </div>

                <div className={styles.categorieWrapper}>
                  <label>Välj kategori</label>
                  <div className={styles.radioButtonsWrapper}>
                    <div className={styles.radioButton}>
                      <input
                        id="Birthday"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Födelsedag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Wedding"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Bröllopsdag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Anniversary"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Årsdag</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Christmas"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Jul</label>
                    </div>

                    <div className={styles.radioButton}>
                      <input
                        id="Other"
                        type="radio"
                        name="categorie"
                        value={newWishlist.categorie}
                        onChange={(e) => onValueChange(e)}
                      />
                      <label>Övrigt</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <button onClick={(e) => handleAddWishlist(e)}>Klar</button>
              </div>
            </div>
          </form>
        </AnimateHeight>
      </div>

      <div className={styles.wishlistsWrapper}>
        {allWishlists &&
          allWishlists.map(({ icon, listName, items, id }, index) => (
            <div key={index} className={styles.wishlist}>
              <div className={styles.iconTitleWrapper}>
                <div onClick={() => openList(id)}>
                  <NextImage src={icon} alt="logo" width="35" height="35" />
                  <h4>{listName}</h4>
                </div>

                <Button onClick={(e) => handleDelete(e, id)} type="quaternary">
                  Ta bort
                </Button>
              </div>

              {open === id ? (
                <div className={styles.wrapper}>
                  <ul className={styles.addedItems}>
                    {items && items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <form className={styles.formContainer}>
                    <input
                      id="listItem"
                      type="text"
                      name="listItem"
                      placeholder="Skriv vad du önskar dig"
                      onChange={handleAddItemToList}
                    />

                    <button onClick={addNewItem(index)}>
                      Lägg till i listan +
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyWishLists;
