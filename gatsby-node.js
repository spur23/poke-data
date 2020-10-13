const path = require("path");
const fs = require("fs");
const axios = require("axios");

const IND_POKEMON_NODE_TYPE = `Indvpokemon`;
const POKEMON_NODE_TYPE = `Pokemon`;

const getPokemon = async () => {
  try {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151");
    return results;
  } catch (err) {
    console.error(err);
  }
};

const getIdFromURL = (url) => url.split(/[/]/)[6];

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  const data = JSON.parse(fs.readFileSync("./src/data/pokemon-data.json"));
  const pokemon = await getPokemon();

  pokemon.forEach((pokemon) => {
    const pokeId = getIdFromURL(pokemon.url);
    createNode({
      ...pokemon,
      id: pokeId,
      parent: null,
      children: [],
      internal: {
        type: POKEMON_NODE_TYPE,
        content: JSON.stringify(pokemon),
        contentDigest: createContentDigest(pokemon),
      },
    });
  });

  data.forEach((pokemon) => {
    createNode({
      ...pokemon,
      id: createNodeId(pokemon.name),
      parent: null,
      children: [],
      internal: {
        type: IND_POKEMON_NODE_TYPE,
        content: JSON.stringify(pokemon),
        contentDigest: createContentDigest(pokemon),
      },
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allIndvpokemon {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  result.data.allIndvpokemon.edges.forEach(({ node }) => {
    createPage({
      path: node.name,
      component: path.resolve(`./src/templates/Page.js`),
      context: {
        slug: node.name,
      },
    });
  });
};
