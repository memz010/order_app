import { createStoreModel } from '../models/store.js';
import { Op } from '../models/ORM.js'; 

export const getStores = async (req, res) => {
  try {
    const Store = createStoreModel();
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStore = async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const Store = createStoreModel();
    const store = await Store.create({ name, description, location });
    res.status(201).json({ message: "Store created successfully", store });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, description, location } = req.body;

  try {
    const Store = createStoreModel();
    const [updated] = await Store.update({ name, description, location }, {
      where: { id }
    });

    if (updated) {
      const updatedStore = await Store.findOne({ where: { id } });
      res.status(200).json({ message: "Store updated successfully", updatedStore });
    } else {
      res.status(404).json({ message: "Store not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStore = async (req, res) => {
  const { id } = req.params;

  try {
    const Store = createStoreModel();
    const deleted = await Store.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Store not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchStoresByName = async (req, res) => {
  const { name } = req.query; 

  try {
    const Store = createStoreModel();
    const stores = await Store.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });

    if (stores.length > 0) {
      res.status(200).json(stores);
    } else {
      res.status(404).json({ message: "No stores found with the given name" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};