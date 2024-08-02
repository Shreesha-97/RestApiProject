const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
app.use(express.json())

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'mydatabase'
// Welcome message
const welcome = 'Welcome to Rest API project.'

async function main () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)

  // Create a collection
  const collection = db.collection('documents')

  // Insert some documents
  const count = await collection.countDocuments()
  if (count === 0) {
    await collection.insertMany([
      {
        id: 1,
        name: 'Xiaomi iPhone 12',
        brand: 'Xiaomi',
        price: 60000,
        ram: 6,
        rom: 256,
        rating: 4.5,
        os: 'Android',
        camera: 108
      },
      {
        id: 2,
        name: 'Oppo Mi 10',
        brand: 'Xiaomi',
        price: 30000,
        ram: 6,
        rom: 512,
        rating: 4,
        os: 'iOS',
        camera: 64
      },
      {
        id: 3,
        name: 'Samsung Mi 10',
        brand: 'Oppo',
        price: 20000,
        ram: 4,
        rom: 256,
        rating: 4,
        os: 'Android',
        camera: 24
      },
      {
        id: 4,
        name: 'Apple Find X2',
        brand: 'Samsung',
        price: 60000,
        ram: 8,
        rom: 512,
        rating: 4.5,
        os: 'iOS',
        camera: 48
      },
      {
        id: 5,
        name: 'Oppo Mi 11',
        brand: 'Xiaomi',
        price: 30000,
        ram: 12,
        rom: 128,
        rating: 4,
        os: 'iOS',
        camera: 24
      },
      {
        id: 6,
        name: 'OnePlus Find X3',
        brand: 'Apple',
        price: 30000,
        ram: 12,
        rom: 64,
        rating: 4,
        os: 'Android',
        camera: 64
      },
      {
        id: 7,
        name: 'Apple Pixel 5',
        brand: 'Apple',
        price: 70000,
        ram: 4,
        rom: 512,
        rating: 4.5,
        os: 'iOS',
        camera: 24
      },
      {
        id: 8,
        name: 'Google Mi 10',
        brand: 'Oppo',
        price: 30000,
        ram: 8,
        rom: 64,
        rating: 5,
        os: 'iOS',
        camera: 108
      },
      {
        id: 9,
        name: 'Oppo Mi 11',
        brand: 'Samsung',
        price: 30000,
        ram: 4,
        rom: 64,
        rating: 4,
        os: 'Android',
        camera: 24
      },
      {
        id: 10,
        name: 'Xiaomi Mi 10',
        brand: 'Oppo',
        price: 60000,
        ram: 16,
        rom: 512,
        rating: 4.5,
        os: 'Android',
        camera: 12
      },
      {
        id: 11,
        name: 'OnePlus Pixel 5',
        brand: 'Apple',
        price: 60000,
        ram: 12,
        rom: 64,
        rating: 5,
        os: 'Android',
        camera: 12
      },
      {
        id: 12,
        name: 'Xiaomi OnePlus 8',
        brand: 'Xiaomi',
        price: 70000,
        ram: 8,
        rom: 64,
        rating: 4.5,
        os: 'Android',
        camera: 48
      },
      {
        id: 13,
        name: 'Xiaomi Pixel 6',
        brand: 'Oppo',
        price: 30000,
        ram: 4,
        rom: 64,
        rating: 5,
        os: 'Android',
        camera: 108
      },
      {
        id: 14,
        name: 'Samsung Find X2',
        brand: 'Oppo',
        price: 40000,
        ram: 12,
        rom: 512,
        rating: 4.7,
        os: 'Android',
        camera: 48
      },
      {
        id: 15,
        name: 'Google OnePlus 8',
        brand: 'Apple',
        price: 20000,
        ram: 16,
        rom: 64,
        rating: 5,
        os: 'iOS',
        camera: 24
      },
      {
        id: 16,
        name: 'OnePlus iPhone 12',
        brand: 'OnePlus',
        price: 20000,
        ram: 6,
        rom: 128,
        rating: 4.5,
        os: 'iOS',
        camera: 64
      },
      {
        id: 17,
        name: 'Google Mi 11',
        brand: 'Oppo',
        price: 70000,
        ram: 6,
        rom: 64,
        rating: 4,
        os: 'Android',
        camera: 64
      },
      {
        id: 18,
        name: 'Google OnePlus 9',
        brand: 'Apple',
        price: 20000,
        ram: 4,
        rom: 64,
        rating: 5,
        os: 'Android',
        camera: 64
      },
      {
        id: 19,
        name: 'Oppo Galaxy S22',
        brand: 'Samsung',
        price: 20000,
        ram: 16,
        rom: 256,
        rating: 4.7,
        os: 'Android',
        camera: 12
      },
      {
        id: 20,
        name: 'Apple Pixel 5',
        brand: 'Oppo',
        price: 40000,
        ram: 8,
        rom: 128,
        rating: 4.7,
        os: 'Android',
        camera: 108
      }
    ])
  }

  // // Update a document
  // const updateResult = await collection.updateOne(
  //   { name: 'Laptop Pro 15' },
  //   { $set: { inStock: true } }
  // )
  // console.log('Updated document =>', updateResult)

  // // Delete a document
  // const deleteResult = await collection.deleteOne({ name: 'Wireless Earbuds' })
  // console.log('Deleted document =>', deleteResult)

  // Close the connection
  // await client.close();

  // Get request with a predefined response.
  app.get('/welcome', (request, response) => {
    response.send(welcome)
  })

  // Fetch all products
  app.get('/products', async (req, res) => {
    try {
      const products = await collection.find({}).toArray()
      res.json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Fetch a single product by id
  app.get('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const product = await collection.findOne({ id: productId })
      if (product) {
        res.json(product)
      } else {
        res.status(404).json({ error: 'Product not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Post an object to the database using Postman.
  // Header => key = Content-Type, value = application/json.
  // Body => Complete json object with all the fields.
  app.post('/products', async (req, res) => {
    try {
      const newProduct = req.body
      const result = await collection.insertOne(newProduct)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update an existing data using Put api in Postman
  // Header => key = Content-Type, value = application/json.
  // Body => New json objects which is to be updated.
  app.put('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const updateData = req.body
      const result = await collection.updateOne(
        { id: productId },
        { $set: updateData }
      )
      if (result.matchedCount === 1) {
        res.json({ message: 'Product updated successfully' })
      } else {
        res.status(404).json({ error: 'Product not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete a single product by id
  app.delete('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const result = await collection.deleteOne({ id: productId })
      if (result.deletedCount === 1) {
        res.json({ message: 'Product deleted successfully' })
      } else {
        res.status(404).json({ error: 'Product not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete the whole collection.
  app.delete('/collection', async (req, res) => {
    try {
      const result = await collection.drop()
      if (result) {
        res.json({ message: 'Collection deleted successfully' })
      } else {
        res.json({ error: 'Failed to delete collection' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Fetch sorted products
  // Api end point - query parameter - /sorted-products?sortBy=price&order=asc
  // No need of order query, since asc is selected by default.
  app.get('/sorted-products', async (req, res) => {
    const { sortBy, order = 'asc' } = req.query
    const sortOrder = order === 'asc' ? 1 : -1

    try {
      const products = await collection
        .find({})
        .sort({ [sortBy]: sortOrder })
        .toArray()
      res.json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}

main().catch(console.error)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`))
