const express = require('express')
const app = express()
const router = require('./api')
const db = require('./db')
const { Product } = db.models
const port = process.env.PORT || 3000
const path = require('path')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(process.cwd(), 'public')))
app.use('/api', router)

db.syncAndSeed()
// .then(()=>{
// 	Promise.all([
// 	  Product.create({ name: 'Shoes' }),
// 	  Product.create({ name: 'Gloves' }),
// 	  Product.create({ name: 'Jacket' }),
// 	  Product.create({ name: 'Scarf' }),
// 	  Product.create({ name: 'Fuzzy Socks' }),
// 	  Product.create({ name: 'Tent' }),
// 	  Product.create({ name: 'Portable Stove' }),
// 	  Product.create({ name: 'Rain Coat' })
// 	])
// })
.then(() => {
  app.listen(port, () => {
    console.log('listening')
  })
})


