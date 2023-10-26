/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id')
    table.string('image')
    table.string('description')
    table.string('link')

    table.string('name')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('recipes', (table) => {
    return knex.schema.dropTable('recipes')
  })
}
