import express from 'express'

import * as db from '../db/db.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/Images')
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

    if (recipes.length === 0) {
      return res.status(404).json({ error: 'no recipes were found' })
    }

    const randomIndex = Math.floor(Math.random() * recipes.length) + 1
    res.redirect(`/${randomIndex}`)
  } catch (error) {
    console.error('Error', error)
  }
})

router.get('/recipes', async (req, res) => {
  const recipes = await db.getAllRecipes()

  res.render('partials/showRecipes', { recipes })
})

router.post('/recipes', async (req, res) => {
  const recipe = req.body.search

  const recipes = await db.getRecipesBySearch(recipe)

  res.render('partials/showRecipes', { recipes })
})

router.get('/recipes/add', (req, res) => {
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
    const newRecipe = { name, description, link, image }
    await db.addRecipe(newRecipe)
    res.redirect('/recipes')
  } catch (err) {
    console.error(err)
  }
})

router.post('/comments/add', async (req, res) => {
  const recipeId = Number(req.body.recipeId)

  const comment = req.body.comment

  const newComment = { recipe_id: recipeId, comment }
  const comments = await db.addComments(newComment)
  console.log(comments)
  res.redirect(`/${recipeId}/comments`)
})

router.post('/delete', async (req, res) => {
  const id = Number(req.body.id)
  console.log(id)
  await db.deleteRecipe(id)
  res.redirect('/recipes')
})

router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  const recipe = await db.getSingleRecipeById(id)
  res.render('partials/editRecipe', recipe)
})

router.post('/:id/edit', async (req, res) => {
  const id = Number(req.body.id)

  const { name, description } = req.body
  const newRecipe = { id, name, description }
  await db.updateRecipe(newRecipe)

  res.redirect('/recipes')
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const recipe = await db.getSingleRecipeById(id)

  res.render('partials/singleRecipe', recipe)
})

router.get('/:id/comments', async (req, res) => {
  const recipeId = Number(req.params.id)
  const comments = await db.getComments(recipeId)
  res.render('partials/viewComments', { recipeId, comments })
})

export default router
