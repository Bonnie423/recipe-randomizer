export function seed(knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: 1,
          comment: 'Delicious recipe!',
          recipe_id: 1, // Referencing recipe with ID 1
        },
        {
          id: 2,
          comment: 'I added some extra cheese, and it was perfect!',
          recipe_id: 1, // Referencing recipe with ID 1
        },
        {
          id: 3,
          comment: `Great dish, I'll definitely make it again!`,
          recipe_id: 2, // Referencing recipe with ID 2
        },
        // Add more comment entries here
      ])
    })
}
