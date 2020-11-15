const express = require('express'); //Подключение Express
const mongoose = require('mongoose'); //Подключение MongoDB (mongoose for nodejs)
const exphbs = require('express-handlebars') //Для рендеринга страниц и взаимодействия с ними
const path = require('path');

const todoRoutes = require('./routes/todos')

const app = express() //объект всего приложения
const PORT = process.env.PORT || 3000
const hbs = exphbs.create({  //настройка конфигурации для шаблонизатора
   defaultLayout:'main',
   extname:'hbs'
})

app.engine('hbs', hbs.engine) //Регистрация движка для рендеринга страниц
app.set('view engine', 'hbs')
app.set('views', 'views')
//Middlewear
app.use(express.urlencoded({extended: true})) //для считывания body
app.use(todoRoutes) //для подключения какого-либо middlewear
app.use(express.static(path.join(__dirname, 'public')))

async function start(){
   try {
      await mongoose.connect(
         'mongodb+srv://leonid:1w3r5y7i@cluster0.jtbtu.mongodb.net/todos',
         {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true   
         })
      app.listen(PORT, () =>{
         console.log(`[Server has been started on ${PORT}...]`)
      })
   } catch (error) {
      console.log(error)
   }
}
start()