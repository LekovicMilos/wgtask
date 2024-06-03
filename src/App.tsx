import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import store from './store/SelectionStore';
import SelectedItems from './components/SelectedItems';
import SelectionDialog from './components/SelectionDialog';
import { Button } from './components/ui';

const App: React.FC = observer(() => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selecteditems, setSelectedItems] = useState<string[]>(store.selectedItems);

  useEffect(() => {
    setSelectedItems(store.selectedItems);
  }, [isDialogOpen]);

  return (
    <div className="app-wrapper">
      <h3>Select Items</h3>
      <div className="selectedItemsWrapper">
        <div>
          You currently have {store.selectedItems.length} selected item{store.selectedItems.length === 1 ? '' : 's'}.
        </div>
        <SelectedItems items={store.selectedItems} toggleItem={store.toggleSelectedItem} />
      </div>
      <Button onClick={() => setIsDialogOpen(true)} variant="success">
        Change my choice
      </Button>
      {isDialogOpen && (
        <SelectionDialog
          selecteditems={selecteditems}
          setSelectedItems={setSelectedItems}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
});

export default App;
