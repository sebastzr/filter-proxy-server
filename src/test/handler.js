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

  // By region
  if (filters.region) results = _.filter(results, { region: filters.region });

  // Sort
  if (filters.sort)
    results = _.orderBy(
      results,
      Object.keys(filters.sort),
      Object.values(filters.sort)
    );

  //Pagination
  if (filters.pageNumber && filters.pageSize)
    results = _.slice(
      results,
      (filters.pageNumber - 1) * filters.pageSize,
      filters.pageNumber * filters.pageSize
    );

  return results;
};

/**
 * This function receive a string in the form:
 * @query (sort=sortField1:order1,sortField2:order2,...,sortFieldN:orderN)
 * and returns an object in the form of:
 * @object
 * {
 *      sortField1: order1,
 *      sortField2: order2,
 *      .
 *      .
 *      .
 *      sortFieldN: orderN
 * }
 *
 * @param {string} sortQuery
 * @returns {object}
 */

const sortQueryHandler = (sortQuery) => {
  const sortFields = sortQuery.split(",");
  let sortObject = {};
  sortFields.forEach((field) => {
    let [sortField, order] = field.split(":");
    sortObject[sortField] = order;
  });
  return sortObject;
};

module.exports.sortQueryHandler = sortQueryHandler;
module.exports.search = search;
