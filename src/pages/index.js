import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "@emotion/styled";
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import Layout from "../components/layout";
import { capitalizeFirstLetter } from "../utils/index";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(4, auto);
  align-content: center;
  justify-contant: center;
  row-gap: 2rem;
  column-gap: 2rem;
  margin: 3rem auto;
  max-width: 50vw;
  padding: 0 1rem;
  background: #ecf0f1;
  & a {
    color: black;
    text-decoration: none;
  }
`;

function HomePage() {
  const data = useStaticQuery(graphql`
    {
      allPokemon {
        nodes {
          id
          name
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
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const {
    allPokemon: { nodes },
  } = data;
  const [hasMore, setMore] = useState(nodes.length > 20);
  const [currentList, addToList] = useState([...nodes.slice(0, 20)]);
  const [searchRender, setSearchRender] = useState([]);
  const [cardHover, setCardHover] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const imageMap = ({ name, id }) => {
    const pokeImage = data.allImageSharp.nodes.filter(
      (el) => el.parent.name === id
    );
    if (pokeImage.length < 1) return;

    return (
      <Link to={name} key={name}>
        <PokeCard
          title={capitalizeFirstLetter(name)}
          image={pokeImage[0].fixed}
          key={name}
          id={name}
          onMouseEnter={onHoverEnter}
          onHoverId={cardHover}
        />
      </Link>
    );
  };

  const loadEdges = () => {
    const currentLength = currentList.length;
    const more = currentLength < nodes.length;
    const nextEdges = more
      ? nodes.slice(currentLength, currentLength + 20)
      : [];
    setMore(more);
    addToList([...currentList, ...nextEdges]);
  };

  const handleScroll = () => {
    if (!hasMore) return;
    if (
      window &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
    ) {
      loadEdges(true);
    }
  };

  const onHoverEnter = (e) => {
    if (cardHover === e.target.id) {
      setCardHover("");
    }

    setCardHover(e.target.id);
  };

  const searchInputChange = (input) => {
    setSearchTerm(input);
  };

  useEffect(() => {
    window && window.addEventListener("scroll", handleScroll);
    const searchArray = nodes.filter((el) => el.name.includes(searchTerm));
    if (searchTerm.length === 0 || searchTerm === undefined) {
      setSearchRender([]);
    }
    setSearchRender(searchArray);
    return () => {
      // clean up function
      window && window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, currentList, searchTerm]);

  return (
    <Layout>
      <SearchBar searchTerm={searchTerm} searchInput={searchInputChange} />
      <Container>
        {searchRender.length === 0
          ? currentList.map(imageMap)
          : searchRender.map(imageMap)}
      </Container>
    </Layout>
  );
}

export default HomePage;
