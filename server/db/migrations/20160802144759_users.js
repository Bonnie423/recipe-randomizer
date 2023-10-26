export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.link('link')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
