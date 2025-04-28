export class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.items = {}; //{ "placeableObject": 2 }
    }

    add(itemKey) {
        if (this.items[itemKey]) {
            this.items[itemKey]++;
        } else {
            this.items[itemKey] = 1;
        }
        console.log(`Added ${itemKey}. Inventory:`, this.items);
    }

    remove(itemKey) {
        if (this.items[itemKey]) {
            this.items[itemKey]--;
            if (this.items[itemKey] <= 0) {
                delete this.items[itemKey];
            }
            console.log(`Removed ${itemKey}. Inventory:`, this.items);
        }
    }

    has(itemKey) {
        return !!this.items[itemKey];
    }

    getQuantity(itemKey) {
        return this.items[itemKey] || 0;
    }

    listItems() {
        return this.items;
    }
}
