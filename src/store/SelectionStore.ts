import { makeAutoObservable } from 'mobx';

class SelectionStore {
  items: string[] = Array.from({ length: 300 }, (_, i) => `Element ${i + 1}`);
  selectedItems: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  toggleSelectedItem = (item: string) => {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter((i) => i !== item);
    } else if (this.selectedItems.length < 3) {
      this.selectedItems.push(item);
    }
  };

  saveSelection(items: string[]) {
    this.selectedItems = items;
  }
}

const store = new SelectionStore();
export default store;
