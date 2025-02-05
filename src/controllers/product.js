import { createProductModel } from '../models/Product.js'; 
import { Op } from '../models/ORM.js';

export const getProducts = async (req, res) => {
  try {
    const Product = createProductModel();
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const Product = createProductModel();
    const product = await Product.findOne({ where: { id } });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, storeId } = req.body;

  try {
    const Product = createProductModel();
    const product = await Product.create({ name, description, price, storeId });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, storeId } = req.body;

  try {
    const Product = createProductModel();
    const [updated] = await Product.update({ name, description, price, storeId }, {
      where: { id }
    });

    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id } });
      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const Product = createProductModel();
    const deleted = await Product.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProductsByName = async (req, res) => {
  const { name } = req.query;

  try {
    const Product = createProductModel();
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%` 
        }
      }
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No products found with the given name" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};