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
  console.log('hi')
  try {
    const recipes = await db.getAllRecipes()
    console.log(recipes)

    if (recipes.length === 0) {
      return res.status(404).json({ error: 'no recipes were found' })
    }
    console.log(recipes)
    const randomIndex = Math.floor(Math.random() * recipes.length)
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
  console.log(recipe)
  const recipes = await db.getRecipesBySearch(recipe)
  console.log(recipes)

  res.render('partials/showRecipes', { recipes })
})

router.get('/:id', async (req, res) => {
  // const randomNumber = Math.floor(Math.random()*6)
  // console.log(randomNumber)
  // const id = Number(req.params.randomNumber)
  // console.log(id)
  const id = Number(req.params.id)
  // console.log(id)
  const recipe = await db.getSingleRecipeById(id)
  // console.log(recipe)
  res.render('partials/singleRecipe', recipe)
})

router.get('/:id/comments', async (req, res) => {
  const recipeId = Number(req.params.id)
  const comments = await db.getComments(recipeId)
  res.render('partials/viewComments', { comments })
})

router.get('/recipes/add', (req, res) => {
  res.render('partials/addRecipe')
})

// router.post('/recipes/add', upload.single('image'), async (req, res) => {
//   try {
//     let image = ''
//     if (req.file) {
//       image = `images/${req.file.originalname}`
//     } else if (req.body.imageURL) {
//       image = req.body.imageURL
//     }
//     const { name, discription, name } = req.body

//   } catch (err) {
//     console.error(err)
//   }
// })
export default router
