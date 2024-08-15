const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware 
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

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
        // Connect the client to the server (optional starting in v4.7)
        // await client.connect();
        const database = client.db('filterflowdb');
        const productCollection = database.collection("products");

        // To add a new product to the database
        app.post('/all-products', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        // Get all products with pagination
        app.get('/all-products', async (req, res) => {
            try {
                // Get page and limit from query parameters, default to page 1 and limit 10
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;

                // Get the filtered and sorted products with pagination
                const cursor = productCollection.find().skip(skip).limit(limit);
                const products = await cursor.toArray();

                // Get the total number of products for pagination metadata
                const totalProducts = await productCollection.countDocuments();

                // Send response with products and pagination info
                res.send({
                    products,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalProducts / limit),
                        totalProducts,
                    }
                });
            } catch (error) {
                res.status(500).send({ message: 'Error fetching products', error });
            }
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
