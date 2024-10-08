const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;    //it will be available at http://localhost:3000

// middleware 
app.use(cors({
    origin: ['http://localhost:5173','https://filter-flow-e7ca5.web.app'],
    credentials: true
  }));
  app.use(express.json())

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3ywizof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
     
    const database = client.db('filterflowdb');     
    const productCollection = database.collection("products");

     // to send products backend 
     app.post('/all-products', async (req, res) => {
        const newProduct = req.body;
        console.log(newAssignment);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
      })

     //Get the backend products
    app.get('/all-products', async (req, res) => {
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })

    } finally {
       
      }
    }
    run().catch(console.log);

  app.get('/', (req, res) => {
    res.send('Filter Flow Product Server Running')
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })