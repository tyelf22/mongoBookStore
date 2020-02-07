const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

   const adminRoutes = require('./routes/admin');
   const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e3ddb5ed6a6fd1c818c972f')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

  app.use('/admin', adminRoutes);
   app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://tyelf22:Nike2299@cluster0-yebcf.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User ({
        name: 'tyson',
        email: 'tyson@test.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })
  console.log(`Connected!`)
  app.listen(3000)
})
.catch(err => {
  console.log(err)
})