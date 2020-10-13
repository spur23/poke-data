import React from "react";
import Layout from "../components/layout";

function About() {
  return (
    <Layout>
      <p>
        Thanks for visiting this Gatsby App! I created this site to practice
        with Gatsby and React.
      </p>
      <p>
        This site Lists the original 151 Pokemon, all data is provided through
        the <a href="https://pokeapi.co/">PokeApi</a>
      </p>
    </Layout>
  );
}

export default About;
