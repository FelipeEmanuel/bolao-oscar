const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.REACT_APP_PORT || 5000;
const cors = require('cors')

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/categoria', require('./routes/categoriaRoutes'))
app.use('/api/palpites', require('./routes/palpiteRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));