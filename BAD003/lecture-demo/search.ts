import pg from "pg";

function searchWithSQL(
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

  let result = client.query(sql, params);
}
