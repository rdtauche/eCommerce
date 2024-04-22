// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// RDT: Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// RDT: Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// RDT: Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});
// RDT: Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});


  // RDT: module export
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
