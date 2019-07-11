const db = require('./db')
const brands = ["Citroën", "Ford", "Volkswagen", "Renaud", "Tata", "Peugeot", "Nissan", "Tesla", "Citroen"]

const getCars = (req, res) => {
  db.query('SELECT * FROM cars ORDER BY id ASC')
    .then(results => res.status(200).json(results.rows))
    .catch(e => console.error(e.stack))
}

const getMileageByBrand = (req, res) => {
  const brand = req.query.brand
  if (!brands.includes(brand)) {
    res.status(404)
    .send("Not found");
  } else {
    db.query(`SELECT AVG("km_year") FROM cars WHERE "car_brand" = '${brand}'`)
      .then(results => res.status(200).json(results.rows))
      .catch(e => console.error(e.stack))
  }
}

const getSalesByBrand = (req, res) => {
  const date = req.query.date
  // here we split into two queries depending
  // on whether or not we have a body in the request
  if (!req.query.date) {
    db.query('SELECT "car_brand" as name, COUNT (id) as value FROM cars GROUP BY "car_brand";')
      .then(results => {
        results.rows.forEach((row) => {
          row.value = parseInt(row.value)
        })
        res.status(200).json(results.rows)
      })
      .catch(e => console.error(e.stack))
  } else {
    db.query(`SELECT "name", "value" FROM (SELECT "car_brand" as name, "purchase_date", COUNT (id) as value FROM cars GROUP BY "purchase_date", "car_brand" HAVING "purchase_date" = ${date}) AS CLEANEDUPDB;`)
      .then(results => {
        results.rows.forEach((row) => {
          row.value = parseInt(row.value)
        })
        res.status(200).json(results.rows)
      })
      .catch(e => console.error(e.stack))
  }
}

module.exports = {
  getCars,
  getMileageByBrand,
  getSalesByBrand
}
