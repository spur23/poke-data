import React from "react";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/core";
import { capitalizeFirstLetter } from "../utils";

const Container = css`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 2px 3px lightgrey;
  background: #48dbfb;
  width: 8rem;
  height: 10rem;
  :hover {
    transform: scale(1.01);
    cursor: pointer;
  }
  & h3,
  p,
  h4 {
    text-align: center;
    margin: 0;
  }
  & h4 {
    margin-top: 0.1rem;
  }
  & .poke-image {
    align-self: center;
  }
`;
function CardData({ pokeId }) {
  const data = useStaticQuery(graphql`
    {
      allIndvpokemon {
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
          }
        }
      }
    }
  `);

  const pokeData = data.allIndvpokemon.edges.filter(
    (el) => el.node.name === pokeId
  );

  const types = pokeData[0].node.types;
  const abilities = pokeData[0].node.abilities;

  return (
    <>
      <h4>Type:</h4>
      {types.map((type) => (
        <p key={type.type.name}>{capitalizeFirstLetter(type.type.name)}</p>
      ))}
      <h4>Abilities:</h4>
      {abilities.map((ability) => (
        <p key={ability.ability.name}>
          {capitalizeFirstLetter(ability.ability.name)}
        </p>
      ))}
    </>
  );
}

function PokeCard({ title, image, id, onMouseEnter, onHoverId }) {
  return (
    <div css={Container} id={id} onMouseEnter={onMouseEnter}>
      <h3>{title}</h3>
      {id === onHoverId ? (
        <CardData pokeId={onHoverId} />
      ) : (
        <Img fixed={image} id={id} className="poke-image" />
      )}
    </div>
  );
}

export default PokeCard;
