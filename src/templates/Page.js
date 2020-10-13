import React from "react";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { capitalizeFirstLetter } from "../utils/index";
import { css } from "@emotion/core";

const Container = css`
  width: 20rem;
  align-self: center;
  & h4,
  p {
    text-align: center;
  }
`;

const ParentContainer = css`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-self: center;
  text-align: center;
  & h3 {
    align-self: center;
  }
`;

const DataContainer = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  & p {
    margin: 0;
    text-align: center;
  }
  & h4 {
    margin-top: 1rem;
    margin-bottom: 0.1rem;
    text-align: center;
  }
`;

function PageTemplate({ data }) {
  console.log(data);
  const name = data.allIndvpokemon.edges[0].node.name;
  const evolvesFrom = data.allIndvpokemon.edges[0].node.evolves_from_species;
  const types = data.allIndvpokemon.edges[0].node.types;
  const abilities = data.allIndvpokemon.edges[0].node.abilities;
  const habitat = data.allIndvpokemon.edges[0].node.habitat;
  const pokeId = data.allPokemon.nodes.filter((el) => el.name === name);
  const image = data.allImageSharp.nodes.filter(
    (el) => el.parent.name === pokeId[0].id
  );
  const flavorText = data.allIndvpokemon.edges[0].node.flavor_text_entries;
  const number = Math.floor(Math.random() * 2);

  return (
    <Layout>
      <div css={ParentContainer}>
        <h3>Name: {capitalizeFirstLetter(name)}</h3>
        <div css={Container}>
          <Img fluid={image[0].fluid} className="poke-image" />
          <h4>Description</h4>
          <p>{flavorText[number].flavor_text}</p>
        </div>
        <h4>
          Evolves from:{" "}
          {!evolvesFrom ? (
            "None"
          ) : (
            <Link to={`/${evolvesFrom.name}`}>
              {capitalizeFirstLetter(evolvesFrom.name)}
            </Link>
          )}
        </h4>
        <div css={DataContainer}>
          <h4>Type</h4>
          {types.map(({ type }) => (
            <p key={type.name}>{capitalizeFirstLetter(type.name)}</p>
          ))}
        </div>
        <div css={DataContainer}>
          <h4>Abilities</h4>
          {abilities.map(({ ability }) => (
            <p key={ability.name}>{capitalizeFirstLetter(ability.name)}</p>
          ))}
        </div>
        <div css={DataContainer}>
          <h4>Habitat</h4>
          <p>{capitalizeFirstLetter(habitat)}</p>
        </div>
      </div>
    </Layout>
  );
}

export default PageTemplate;

export const query = graphql`
  query($slug: String!) {
    allIndvpokemon(filter: { name: { eq: $slug } }) {
      edges {
        node {
          name
          abilities {
            ability {
              name
            }
          }
          types {
            type {
              name
            }
          }
          evolves_from_species {
            name
          }
          habitat
          game_indices {
            version {
              name
            }
          }
          flavor_text_entries {
            flavor_text
          }
        }
      }
    }
    allImageSharp {
      nodes {
        parent {
          id
          ... on File {
            name
          }
        }
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allPokemon {
      nodes {
        id
        name
      }
    }
  }
`;
