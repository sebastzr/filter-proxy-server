const fetch = require("node-fetch");

const search = async (filters) => {
  const res = await fetch("https://hiring.condorlabs.io/api/countries/all");
  const results = await res.json();
  return results;
};

module.exports.search = search;
