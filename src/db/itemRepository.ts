import Item, { item } from "../models/item";

const newItem = new Item({
    id: '1',
    name: 'Product 1',
    price: 100,
});

const createItem = async (item: Item) => {
    return newItem.save();
}

const getItems = async () => {
    return newItem.find();
}

const getItemById = async (id: string) => {
    return newItem.findById(id);
}

const updateItem = async (id: string, item: Item) => {
    return newItem.update(id, await newItem.findById(id));
}

const deleteItem = async (id: string) => {
    return newItem.delete(id);
}

const findByIdAndUpdate = async (id: string, item: Item) => {
    return newItem.findByIdAndUpdate(id, await newItem.findById(id));
}

const findByIdAndDelete = async (id: string) => {
    return newItem.findByIdAndDelete(id);
}

export default { createItem, getItems, getItemById, updateItem, deleteItem, findByIdAndUpdate, findByIdAndDelete };

