import Fuse from "fuse.js";
import companies from "../../data/companies.json";

export default (req, res) => {
  const pageSize = 20;
  const fuse = new Fuse(companies, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "symbol"]
  });
  const {
    query: { page = 1, query }
  } = req;
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  const results = query ? fuse.search(query) : companies;
  const resultsTrimmed = results.slice(
    0 + pageSize * (page - 1),
    pageSize * page
  );
  const totalPages = Math.ceil(results.length / pageSize);

  // Cache on Zeit CDN for one year
  res.setHeader("Cache-Control", "s-maxage=378432000, max-age=0");
  res.end(
    JSON.stringify({
      companies: resultsTrimmed,
      page,
      totalPages
    })
  );
};
