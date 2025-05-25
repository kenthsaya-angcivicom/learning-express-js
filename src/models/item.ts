interface ItemType {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ItemClass {
    save: () => Promise<ItemType>;
    find: () => Promise<ItemType[]>;
    findById: (id: string) => Promise<ItemType>;
    update: (id: string, item: ItemType) => Promise<ItemType>;
    delete: (id: string) => Promise<ItemType>;
    findByIdAndUpdate: (id: string, item: ItemType) => Promise<ItemType>;
    findByIdAndDelete: (id: string) => Promise<ItemType>;
}



export default class Item implements ItemClass {
    private item: ItemType;

    constructor(item: Partial<ItemType>) {
        const updatedAt = new Date();
        const createdAt = new Date();
        this.item = {
            id: item.id || '',
            name: item.name || '',
            price: item.price || 0,
            updatedAt,
            createdAt
        };
    };

    save(): Promise<ItemType> {
        return Promise.resolve(this.item);
    }

    find() {
        return Promise.resolve([this.item]);
    }

    findById(id: string) {
        return Promise.resolve(this.item);
    }

    update(id: string, item: ItemType) {
        this.item.updatedAt = new Date();
        return Promise.resolve(this.item);
    }

    delete(id: string) {
        return Promise.resolve(this.item);
    }

    findByIdAndUpdate(id: string, item: ItemType) {
        this.item.updatedAt = new Date();
        return Promise.resolve(this.item);
    }

    findByIdAndDelete(id: string) {
        return Promise.resolve(this.item);
    }
}

export const item = {
    id: '1',
    name: 'Product 1',
    price: 100,
};

