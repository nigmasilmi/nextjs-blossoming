const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "nextUser",
        mongodb_password: "5VG9XzCafvW8QdXt",
        mongodb_clustername: "cluster0",
        mongodb_database: "nextjs-blog",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "nextUser",
      mongodb_password: "5VG9XzCafvW8QdXt",
      mongodb_clustername: "cluster0",
      mongodb_database: "nextjs-blog",
    },
  };
};

module.exports = nextConfig;
