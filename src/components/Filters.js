import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { Checkbox } from 'semantic-ui-react';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
`;

const FilterTypeHeader = styled.h3`
  font-size: 1.5rem;
  margin: 1rem;
`;
const Filters = ({ toggleSelection, getFilterState }) => {
  const { allSanityAuthor, allSanityCategory } = useStaticQuery(graphql`
    query {
      allSanityAuthor {
        nodes {
          name
          id
        }
      }
      allSanityCategory {
        nodes {
          title
          id
        }
      }
    }
  `);

  return (
    <Container>
      <FilterTypeHeader>Categories</FilterTypeHeader>
      {allSanityCategory.nodes.map((category) => (
        <Checkbox
          label={category.title}
          checked={getFilterState(category.id)}
          onChange={() => toggleSelection(category.id)}
        />
      ))}
      <FilterTypeHeader>Authors</FilterTypeHeader>
      {allSanityAuthor.nodes.map((author) => (
        <Checkbox
          label={author.name}
          checked={getFilterState(author.id)}
          onChange={() => toggleSelection(author.id)}
        />
      ))}
    </Container>
  );
};

export default Filters;
