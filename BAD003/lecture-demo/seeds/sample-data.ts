import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  async function seedProduct(product: {
    name: string;
    type: string;
    price: number;
  }) {
    let row = await knex
      .select("id")
      .from("product")
      .where({ name: product.name })
      .first();
    if (row) {
      await knex("product").where({ id: row.id }).update({
        type: product.type,
        price: product.price,
      });
    } else {
      await knex("product").insert({
        name: product.name,
        type: product.type,
        price: product.price,
      });
    }
  }
  let products = [
    { name: "Cat Can 101", type: "cat_food", price: 101 },
    { name: "Cat Can 102", type: "cat_food", price: 102 },
    { name: "Cat Can 103", type: "cat_food", price: 103 },
    { name: "Dog Can 101", type: "dog_food", price: 104 },
    { name: "Dog Can 102", type: "dog_food", price: 105 },
    { name: "Dog Can 103", type: "dog_food", price: 106 },
  ];
  for (const product of products) {
    await seedProduct(product);
  }
}
