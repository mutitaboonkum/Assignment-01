const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = "mongodb+srv://superadmin:15114215642miew@cluster0.j1uk9.mongodb.net/sample_weatherdata?retryWrites=true&w=majority"
const client = new MongoClient(url, { userNewUrlParser: true, useUnifiedTopology: true})
async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async(req, res) =>  {
    try {
        const position = req.query.position
        const callLetters = req.query.callLetters
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query = {}
        if (callLetters) {
            query.callLetters = callLetters
        }
        if (position) {
            query.position = position
        }
        const cursor = collection.find(query).limit(10)
        let weatherdata = []
        await cursor.forEach(doc => weatherdata.push(doc.name))

        res.send(weather)
        } catch(e) {
            console.error(e)
        } 
 })

app.listen(3000, console.log('Start application at port 3000'))

