const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
require("dotenv").config(); //to read the .env file in myapp6 directory

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const cors = require('cors');
app.use(cors({
    origin: '*' // allow all to access and read data
    // origin: ['http://www.section.io, 'https://www.google.com] // if we want to allow specific pages
}))

app.use('/', express.static('files'));

mongoose.set('strictQuery', false); // to supress mongoose warning 
mongoose.connect(
    process.env.MONGODB_URI, // to read the variable MONGODB_URI from the .env file
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }
    }
)

const user = require("./routes/user.routes");
const userProduct = require("./routes/user.product.routes");

app.use('/api/userproducts', userProduct);
app.use('/api/user', user);

const product = require("./routes/product.routes");
app.use('/api/product', product);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.options)
);

app.listen(port, () => {
    console.log(`Server is listening in port ${port}`);
})