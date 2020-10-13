import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import "typeface-lato";

const Container = styled.nav`
  background: #ef5350;
  & .title {
    width: 20vw;
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
  & span {
    color: yellow;
    font-weight: 900;
    -webkit-text-stroke: 3px #3c5aa6;
    font-size: xxx-large;
    display: inline-block;
    margin: -0.15rem;
  }

  & span:nth-of-type(1) {
    transform: rotate(-20deg);
  }
  & span:nth-of-type(2) {
    transform: rotate(-10deg);
  }
  & span:nth-of-type(3) {
    transform: rotate(-5deg);
  }
  & span:nth-of-type(5) {
    transform: rotate(5deg);
  }
  & span:nth-of-type(6) {
    transform: rotate(10deg);
  }
  & span:nth-of-type(7) {
    transform: rotate(20deg);
  }
`;

const LinkContainer = styled.div`
  width: 20vw;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
  margin-bottom: 2rem;
  & a {
    color: yellow;
    -webkit-text-stroke: 0.25px #3c5aa6;
    font-size: x-large;
    text-decoration: none;
  }
`;

function NavBar() {
  return (
    <Container>
      <div className="title">
        <span>P</span>
        <span>o</span>
        <span>K</span>
        <span>e</span>
        <span>M</span>
        <span>o</span>
        <span>N</span>
      </div>
      <LinkContainer>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </LinkContainer>
    </Container>
  );
}

export default NavBar;
