import React from "react";
import NavBar from "./NavBar";
import styled from "@emotion/styled";
import "./layout.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
}

export default Layout;
