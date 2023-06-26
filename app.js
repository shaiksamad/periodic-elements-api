const express = require('express');
const routes = require('./routes/routes')

const DB = require('./database/db');
const PORT = process.env.EXPRESS_PORT || 5000

const app = express()


// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use('/api', routes)


new DB().connect().then(
    app.listen(PORT, ()=>{
        console.log(`Server Started at http://localhost:${PORT}`);
    })
)
