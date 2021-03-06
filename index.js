const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { send } = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;


// midleware
app.use(cors());
app.use(express.json());


//hv2OOjUVNlkMv9y6
//assignment-11


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wnng0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('assaignment-11-gym').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/service/:id' , async (req , res )=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });



        // post 
        app.post('/product', async(req, res)=>{
            const newProduct = req.body;
            const result = await serviceCollection.insertOne(newProduct);
            res.send(result);
        })

        app.put("/service/:id", async(req, res)=>{
            const id = req.params.id;
            const data = req.body;
            console.log(data,id);
            const filter = {_id:ObjectId(id)};
            const options = {upset:true};
            const updatedoc = {
                $set:{
                    ...data
                },
            };
            const result = await serviceCollection.updateOne(filter,updatedoc,options);
            res.send(result);
        })


        // DELETE 
        app.delete('/service/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('look mama');
})

app.listen(port, () => {
    console.log('done all');
})