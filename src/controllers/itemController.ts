import { Request, Response, NextFunction } from 'express';
import itemRepository from '../db/itemRepository';

const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
}

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemRepository.getItems();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.updateItem(req.params.id, req.body);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.deleteItem(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

const findByIdAndUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

const findByIdAndDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await itemRepository.findByIdAndDelete(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

export default { createItem, getItems, getItemById, updateItem, deleteItem, findByIdAndUpdate, findByIdAndDelete };

