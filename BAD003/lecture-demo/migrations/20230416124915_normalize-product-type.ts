import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product_type", (table) => {
    table.increments("id").primary();
    table.string("name", 30).unique().notNullable();
  });

  let rows = await knex("product").distinct("type");
  for (const row of rows) {
    await knex("product_type").insert({ name: row.type });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("product_type");
}
