const Product = require('./Product')
const LineItem = require('./LineItem')
const Order = require('./Order')
const conn = require('./_db')

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)


const syncAndSeed = () => {
	return conn.sync()
	.then(() => {
	  console.log('I have synced.')
	})
}

module.exports = {
  syncAndSeed,
  models: {
  	Product,
  	LineItem,
  	Order
  }
}