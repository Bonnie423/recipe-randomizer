export function seed(knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          id: 1,
          name: 'Spaghetti Carbonara',
          image: 'spaghetti.jpg',
          description: 'Classic Italian pasta dish',
          link: 'https://example.com/spaghetti-recipe',
        },
        {
          id: 2,
          name: 'Chicken Alfredo',
          image: 'chicken-alfredo.jpg',
          description: 'Creamy chicken pasta',
          link: 'https://example.com/chicken-alfredo-recipe',
        },
        // Add more recipe entries here
      ])
    })
}
