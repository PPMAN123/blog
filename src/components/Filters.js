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
const Filters = () => {
  const { allSanityAuthor, allSanityCategory } = useStaticQuery(graphql`
    query {
      allSanityAuthor {
        node {
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

  const [selections, setSelections] = useState({});

  useEffect(() => {
    if (allSanityAuthor && allSanityAuthor.nodes.length > 0) {
      const newSelections = allSanityAuthor.nodes.reduce((acc, author) => {
        acc[author.id] = {
          name: author.name,
          checked: false,
        };
        return acc;
      }, {});
      setSelections((prevSelections) => ({
        ...prevSelections,
        ...newSelections,
      }));
    }
    if (allSanityCategory && allSanityCategory.nodes.length > 0) {
      const newSelections = allSanityCategory.nodes.reduce((acc, category) => {
        acc[category.id] = {
          name: category.name,
          checked: false,
        };
        return acc;
      }, {});
      setSelections((prevSelections) => ({
        ...prevSelections,
        ...newSelections,
      }));
    }
  }, [allSanityAuthor, allSanityCategory]);

  const toggle = (id) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [id]: {
        name: prevSelections[id].name,
        checked: !prevSelections[id].checked,
      },
    }));
  };
  return (
    <Container>
      <FilterTypeHeader>Categories</FilterTypeHeader>
      {allSanityCategory.nodes.map((category) => (
        <Checkbox
          label={category.title}
          checked={selections[category.id].checked}
          onChange={toggle(category.id)}
        />
      ))}
      <FilterTypeHeader>Authors</FilterTypeHeader>
      {allSanityAuthor.nodes.map((author) => (
        <Checkbox
          label={author.title}
          checked={selections[author.id].checked}
          onChange={toggle(author.id)}
        />
      ))}
    </Container>
  );
};

export default Filters;
