const getUrl = ({ ctx, isApi }) => {
  const apiRoute = "api/";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  let host = process.browser ? window.location.host : ctx.req.headers.host;

  if (host.includes("localhost")) {
    host = "localhost:3000";
  }

  return `${protocol}://${host}/${isApi ? apiRoute : ""}`;
};

export default getUrl;
