import { CustomError } from "../errors/CustomError";
import { NotFoundError } from "../errors/NotFoundError";
import { Item, Unit, UpdateItem, UpdateUnit } from "../types/item.type";
import * as itemModel from "../models/item.model";

const addItem = async (data: Item, unit: Array<Unit>) => {
  try {
    const addedItem = await itemModel.addItem(data, unit);

    return addedItem;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new NotFoundError();
    }
    throw new CustomError("Database operation failed", 500);
  }
};

const getItems = async () => {
  try {
    const items = await itemModel.getItems();

    return items;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new NotFoundError("Items not found");
    }
    throw new CustomError("Database operation failed", 500);
  }
};

const updateItem = async (
  data: UpdateItem,
  unit: Array<UpdateUnit>,
  id: number,
) => {
  try {
    const updated = await itemModel.updateItem(data, unit, id);

    return updated;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new NotFoundError();
    }

    throw new CustomError("Database operation failed", 500);
  }
};

const deleteItem = async (id: number) => {
  try {
    const deleted = await itemModel.deleteItem(id);

    return deleted;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new NotFoundError();
    }

    throw new CustomError("Database operation failed", 500);
  }
};

export { addItem, getItems, updateItem, deleteItem };
