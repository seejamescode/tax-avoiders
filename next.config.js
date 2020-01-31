require("dotenv").config();
const isDev = process.env.NODE_ENV !== "production";

const Dotenv = require("dotenv-webpack");
const path = require("path");
const withImages = require("next-images");
const withOffline = require("next-offline");

module.exports = withImages(
  withOffline({
    target: "serverless",
    transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
    webpack: function(config) {
      if (isDev) {
        config.plugins = config.plugins || [];

        config.plugins = [
          ...config.plugins,
          new Dotenv({
            path: path.join(__dirname, ".env"),
            systemvars: true
          })
        ];
      }

      return config;
    },
    // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
    // turn on the SW in dev mode so that we can actually test it
    generateInDevMode: true,
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  })
);
