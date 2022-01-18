const fetch = require("node-fetch");
const _ = require("lodash");

const search = async (filters) => {
  const res = await fetch("https://hiring.condorlabs.io/api/countries/all");
  let results = await res.json();

  // By population
  if (filters.from)
    results = _.filter(
      results,
      (country) => country.population >= filters.from
    );

  if (filters.to)
    results = _.filter(results, (country) => country.population <= filters.to);

  return results;
};

module.exports.search = search;
