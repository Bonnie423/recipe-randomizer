import express from 'express'

import * as db from '../db/db.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
  try {
    res.render('home')
  } catch (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  }
})

router.get('/random', async (req, res) => {
  try {
    const recipes = await db.getAllRecipes()
    console.log(recipes)

    if (recipes.length === 0) {
      return res.status(404).json({ error: 'no recipes were found' })
    if (recipes.length === 0) {
      return res.status(404).json({ error: 'no recipes were found' })
    }

    const randomIndex = Math.floor(Math.random() * recipes.length) + 1
    res.redirect(`/${randomIndex}`)
  } catch (error) {
    console.error('Error', error)
    console.error('Error', error)
  }
})
})

router.get('/recipes', async (req, res) => {
  const recipes = await db.getAllRecipes()

  res.render('partials/showRecipes', { recipes })
})

router.post('/recipes', async (req, res) => {
  const recipe = req.body.search
  console.log(recipe)
  const recipes = await db.getRecipesBySearch(recipe)
  console.log(recipes)

  res.render('partials/showRecipes', { recipes })
})

router.get('/recipes/add', (req,res)=>{
  res.render('partials/addRecipe')
})

router.post('/recipes/add', upload.single('image'), async (req, res) => {
  try {
    let image = ''
    if (req.file) {
      image = `Images/${req.file.originalname}`
    } else if (req.body.imageURL) {
      image = req.body.imageURL
    }
    const { name, description, link } = req.body
    const newRecipe = {name, description, link, image}
    await db.addRecipe(newRecipe)
    res.redirect('/recipes')

  } catch (err) {
    console.error(err)
  }
})

router.get('/recipes/edit', async(req,res)=>{
  
})
router.post('/:id/comments/add', async(req,res)=>{
  const recipeId = Number(req.params.id)
  console.log(recipeId)
  const comment = req.body.comment
  console.log(comment)
  const newComment = { comment}
  const comments = await db.addComments(newComment)
  console.log(comments)
  res.redirect(`/comments`)

})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const recipe = await db.getSingleRecipeById(id)

  res.render('partials/singleRecipe', recipe)
})

router.get('/:id/comments', async (req, res) => {
  const recipeId = Number(req.params.id)
  const comments = await db.getComments(recipeId)
  res.render('partials/viewComments', { comments })
})




export default router
