const Sequelize = require('sequelize')
const conn = require('./_db')

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 1
  },
})

module.exports = LineItem;