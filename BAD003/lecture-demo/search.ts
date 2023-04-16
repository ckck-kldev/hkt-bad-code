import pg from "pg";
import { Knex } from "knex";
import { knex } from "./db";

async function searchWithSQL(
  client: pg.Client,
  input: {
    product_type?: string;
    product_title?: string;
  }
) {
  let sql = /* sql */ `
    select
      product.id
    , product.name
    , product.price
    from product
    where true
    `;
  let params: Array<string | number> = [];

  if (input.product_type) {
    params.push(input.product_type);
    sql += `
    AND product.type = $${input.product_type}
    `;
  }

  if (input.product_title) {
    params.push(input.product_title);
    sql += `
    AND product.title = $${input.product_title}
    `;
  }

  // let result = await client.query(sql, params);
  // return result.rows;
  console.log({ sql, params });
}

async function searchWithKnex(
  knex: Knex,
  input: {
    product_type?: string;
    product_title?: string;
    price_range?: { lower: number; higher: number };
  },
  fields: string[]
) {
  knex.from("product").select("id");
  knex.select("id").from("product");
  knex("product").select("id").select("name").select("price");

  let query = knex("product");
  for (let field of fields) {
    query = query.select(field);
  }

  if (input.product_type) {
    query = query.where("product.type", "=", input.product_type);
  }
  if (input.product_title) {
    query = query.where("product.name", "=", input.product_title);
  }
  if (input.price_range) {
    query = query
      .where("price", ">=", input.price_range.lower)
      .where("price", "<=", input.price_range.higher);
  }
  let sql = query.toSQL();
  console.log("SQL query: ", sql);

  let rows = await query;
  console.log("rows: ", rows);

  knex.destroy();
}

// searchWithSQL(null as any, {
//   product_type: "food",
//   product_title: "Cat Can 123",
// });

searchWithKnex(
  knex,
  {
    product_type: "cat_food",
    product_title: "Cat Can 101",
  },
  ["id", "name", "price"]
);
