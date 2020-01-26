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

    const openSecrets = await fetch(
      `https://www.opensecrets.org/api/?method=getOrgs&org=${encodeURIComponent(
        company.name
      )}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
    )
      .then(res => {
        if (res.status === 400) return Promise.reject(res.statusText);
        if (res.status === 200) return res.json();
      })
      .then(json => json && json.response);

    if (
      openSecrets &&
      openSecrets.organization &&
      Object.values(openSecrets.organization)[0]
    ) {
      const orgId = Object.values(openSecrets.organization)[0].orgid;

      company.details = await fetch(
        `https://www.opensecrets.org/api/?method=orgSummary&id=${orgId}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      )
        .then(res => {
          if (res.status === 400) return Promise.reject(res.statusText);
          if (res.status === 200) return res.json();
        })
        .then(json => json && json.response.organization["@attributes"]);
    }

    res.statusCode = 200;
    // Cache on Zeit CDN for one month
    res.setHeader("Cache-Control", "s-maxage=31536000, max-age=0");
    res.end(JSON.stringify(company));
  } catch (e) {
    console.error(e);
  }
};
