import express from 'express'

import * as db from '../db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.render('home')
  } catch (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  }
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


router.get('/:id/comments', async (req, res) => {
  const recipeId = Number(req.params.id)
  const comments = await db.getComments(recipeId)
  res.render('partials/viewComments', { comments })
})
export default router
