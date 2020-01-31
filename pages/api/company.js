import fetch from "node-fetch";
import companies from "../../data/companies.json";

export default async (req, res) => {
  try {
    const {
      query: { name: queryName }
    } = req;
    res.setHeader("Content-Type", "application/json");
    const company = companies.find(
      ({ name }) => name === queryName.split("[ampersand]").join("&")
    );
    if (!company) {
      res.statusCode = 404;
      res.end(JSON.stringify({}));
      return;
    }

    if (company.openSecrets) {
      company.details = await fetch(
        `https://www.opensecrets.org/api/?method=orgSummary&id=${company.openSecrets}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      )
        .then(res => {
          if (res.status === 400) return Promise.reject(res.statusText);
          if (res.status === 200) return res.json();
        })
        .then(json => json && json.response.organization["@attributes"]);
    }

    res.statusCode = 200;
    // Cache on Zeit CDN for one year
    res.setHeader("Cache-Control", "s-maxage=378432000, max-age=0");
    res.end(JSON.stringify(company));
  } catch (e) {
    console.error(e);
  }
};
