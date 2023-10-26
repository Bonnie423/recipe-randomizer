export async function seed(knex) {
  await knex('comments').del()
}
