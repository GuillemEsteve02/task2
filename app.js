const express = require('express');
const productsRouter = require('./routes/products');
const app = express();

app.use(express.json()); // Middleware for parsing JSON


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  
app.get('/about', (req, res) => {
    res.send('This is about us page.')
  })

  
app.use('/products', productsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
