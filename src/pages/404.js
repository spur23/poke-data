import React from "react";
import Layout from "../components/layout";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 50vw;
  padding: 0 1rem;
  background: #ecf0f1;
`;

function FourOhFourPage({ data }) {
  const image = data.allImageSharp.nodes.filter(
    (el) => el.parent.name === "psyduck-confused"
  );
  console.log(image);
  return (
    <Layout>
      <Container>
        <Img
          fluid={image[0].fluid}
          backgroundColor={"true"}
          style={{ width: "20vw" }}
        ></Img>
        <h4>
          You seem to be as confused as I am! Please head back
          <Link to="/"> Home</Link>
        </h4>
      </Container>
    </Layout>
  );
}

export default FourOhFourPage;

export const query = graphql`
  query {
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
  }
`;
