const path = require("path");

module.exports = {
  pathPrefix: "/poke-data",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "src", "images"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/data`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
  ],
};
