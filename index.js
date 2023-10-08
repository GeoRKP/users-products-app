const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const port = 3000;

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

const user = require('./routes/user.route')
const product = require('./routes/product.route')
const user_products = require('./routes/user-product.route')



mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {
            console.log("Connected")
        },
        err => {
            console.log( "Failed to connect", err )
        })

app.use(cors({
    origin: '*'
    //origin: ['https//localhost:8000', '..', '...' , '....']
}))

app.use('/', express.static('files'))

app.use('/api/users', user)
app.use('/api/products', product)
app.use('/api/users-products', user_products)


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument.options))

app.listen(port, () => {
    console.log('Listening on port 3000')
})

