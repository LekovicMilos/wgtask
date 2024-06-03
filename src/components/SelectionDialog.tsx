import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/SelectionStore';
import styles from './SelectionDialog.module.css';
import SelectedItems from './SelectedItems';
import SearchBar from './SearchBar';
import { Button } from '../components/ui';

interface SelectionDialogProps {
  selecteditems: string[];
  setSelectedItems: (_item: string[]) => void;
  setIsDialogOpen: (_boolean: boolean) => void;
}

const SelectionDialog: React.FC<SelectionDialogProps> = observer(
  ({ selecteditems, setSelectedItems, setIsDialogOpen }) => {
    const [filter, setFilter] = useState('');
    const [numberFilter, setNumberFilter] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, []);

    const handleSave = () => {
      store.saveSelection(selecteditems);
      setIsDialogOpen(false);
    };

    const handleCancel = () => {
      setIsDialogOpen(false);
    };

    const toggleItem = (item: string) => {
      let tempSelecteditems = [...selecteditems];
      if (selecteditems.includes(item)) {
        tempSelecteditems = selecteditems.filter((i) => i !== item);
      } else if (selecteditems.length < 3) {
        tempSelecteditems.push(item);
      }
      setSelectedItems(tempSelecteditems);
    };

    const filteredItems = store.items
      .filter((item) => item.includes(filter) && Number(item.split(' ')[1]) > numberFilter)
      .sort((a, b) => Number(a.split(' ')[1]) - Number(b.split(' ')[1]));

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    };

    const handleNumberFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNumberFilter(Number(e.target.value));
    };

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCancel();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleCancel]);

    const handleOverlayClick = () => {
      handleCancel();
    };

    if (loading) {
      return (
        <>
          <button className={styles.overlay} onClick={handleOverlayClick}></button>
          <div className={styles.dialog}>
            <div>Loading...</div>
          </div>
        </>
      );
    }

    return (
      <>
        <button className={styles.overlay} onClick={handleOverlayClick}></button>
        <div className={styles.dialog}>
          <h3>Select Items</h3>
          <Button className={styles.closeDialog} variant="ghost" size="small" onClick={handleOverlayClick}>
            X
          </Button>
          <SearchBar
            filter={filter}
            handleFilterChange={handleFilterChange}
            numberFilter={numberFilter}
            handleNumberFilterChange={handleNumberFilterChange}
          />
          <div className={styles.dialogItems}>
            {filteredItems.map((item) => (
              <div className={styles.dialogItem} key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={selecteditems.includes(item)}
                    onChange={() => toggleItem(item)}
                    disabled={!selecteditems.includes(item) && selecteditems.length >= 3}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>
          <div className="selectedItemsWrapper">
            <div>{selecteditems.length ? 'Current selected items:' : ''}</div>
            <SelectedItems items={selecteditems} toggleItem={toggleItem} />
          </div>
          <div className={styles.dialogActions}>
            <Button
              variant="success"
              onClick={handleSave}
              className="mr-10"
              disabled={JSON.stringify(selecteditems) === JSON.stringify(store.selectedItems)}
            >
              Save
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </>
    );
  },
);

export default SelectionDialog;
