import companies from "../../data/companies.json";

export default (req, res) => {
  const pageSize = 20;
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  const results = companies.sort(() => 0.5 - Math.random()).slice(0, pageSize);

  res.end(
    JSON.stringify({
      companies: results,
      page: 1,
      totalPages: 1
    })
  );
};
