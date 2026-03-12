const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.searchByName = async (req, res, next) => {
  try {
    const name = req.query.name || '';
    const products = await Product.find({
      productName: { $regex: name, $options: 'i' },
    });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.filterByCategory = async (req, res, next) => {
  try {
    const cat = req.query.cat;
    if (!cat) {
      return res.status(400).json({ message: 'Category query param cat is required' });
    }
    const products = await Product.find({ category: cat });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
