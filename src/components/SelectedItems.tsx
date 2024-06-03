import React from 'react';
import styles from './SelectedItems.module.css';
import { Button } from '../components/ui';

interface SelectedItemsProps {
  items: string[];
  toggleItem: (_item: string) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, toggleItem }) => {
  return (
    <div>
      {items.map((item) => (
        <div className={styles.selectedItem} key={item}>
          {item}
          <Button variant="ghost" size="small" onClick={() => toggleItem(item)}>
            X
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SelectedItems;
