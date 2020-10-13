import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem auto;
  padding: 0 1rem;
  background: #ecf0f1;
  width: 20rem;
  justify-content: center;
  & input {
    margin-left: 0.5rem;
  }
`;

const SearchBar = ({ searchTerm, searchInput }) => {
  const onChange = (e) => {
    searchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          Search Pokemon:
          <input type="text" value={searchTerm} onChange={onChange} />
        </label>
      </form>
    </Container>
  );
};

export default SearchBar;
