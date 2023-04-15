import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product", (table) => {
    // table.integer('id').primary()
    // table.increments('id').primary()
    // table.increments('id')
    table.increments();
    table.string("name", 30).notNullable();
    table.string("type", 30).notNullable();
    table.float("price", 2).notNullable();

    // the type don't supported by knex
    // table.specificType('boundary', 'geometry')
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("product");
}
