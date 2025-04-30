export const InventoryStore = {
    items: {},

    add(itemKey) {
        if (this.items[itemKey]) {
            this.items[itemKey]++;
        } else {
            this.items[itemKey] = 1;
        }
    },

    remove(itemKey) {
        if (this.items[itemKey]) {
            this.items[itemKey]--;
            if (this.items[itemKey] <= 0) {
                delete this.items[itemKey];
            }
        }
    },

    has(itemKey) {
        return !!this.items[itemKey];
    },

    getQuantity(itemKey) {
        return this.items[itemKey] || 0;
    },

    listItems() {
        return { ...this.items };
    }
};
