import Knex from "knex";

let configs = require("./knexfile");
let profile = configs.development;

export let knex = Knex(profile);
