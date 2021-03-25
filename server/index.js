const express = require('express')
const app = express()
const port = 3000
const uidNum = require('uid')
let objs = {}

// express configuration
app.use(express.json({type: '*/*'}));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', function (req, res) {
    
    res.send(`Received object. ${JSON.stringify(req.body)}`);

});

app.post('/share', (req, res) => {
    let id = uidNum(4)
    objs[id] = req.body
    res.send({sucess: true, link: "http://localhost:3000/" + id});
})

app.get('/:id', (req, res) => {
    if (objs[req.params.id] != null) {
        res.send(objs[req.params.id])
        delete objs[req.params.id]
    }
    else{
        res.send({sucess: false, error: 404, message: "Not Found"})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))