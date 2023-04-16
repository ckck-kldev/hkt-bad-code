import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product_type", (table) => {
    table.increments("id").primary();
    table.string("name", 30).unique().notNullable();
  });

  let rows = await knex("product").distinct("type as name");
  console.log(rows);

  for (const row of rows) {
    let [{ id }] = await knex("product_type")
      .insert({ name: row.name })
      .returning("id");
  }
  throw new Error("stop");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("product_type");
}
