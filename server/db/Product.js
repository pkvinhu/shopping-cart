const Sequelize = require('sequelize')
const conn = require('./_db')

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
})
module.exports = Product;