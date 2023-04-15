import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development" || process.env.NODE_ENV]);

async function main() {
  const staff = await knex
    .select("*")
    .from("staff")
    .where("id", ">", "0")
    .orderBy("id", "asc");

  console.log(staff);
  knex.destroy();
}

main();
