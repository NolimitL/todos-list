const {Router} = require('express')
const Todo = require('../models/todo')

const router = Router()

router.get('/', async (req, res) => {
   const todos = await Todo.find({}).lean()

   res.render('index', {
      title:'Home todos',
      isHome: true,
      todos
   })
})

router.get('/create', (req, res) => {
   res.render('create', {
      title:'Create todo',
      isCreate: true
   })
})

router.post('/create', async (req, res) => {
   const todo = new Todo({
      title: req.body.title
   })

   await todo.save()
   res.redirect('/')
})

router.post('/complete', async (req, res) => {
   const id = req.body.id 
   const todo = await Todo.findById(id)
   todo.completed = !!req.body.completed 
   await todo.save()
   res.redirect('/')
})

module.exports = router