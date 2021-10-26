import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { Checkbox } from 'semantic-ui-react';
import { FilterId } from '../types/filter';
import { Authors } from '../types/author';
import { Categories } from '../types/category';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
`;

const FilterTypeHeader = styled.h3`
  font-size: 1.5rem;
  margin: 1rem;
`;

const FilterContent = styled.section`
  margin: 0rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export type FiltersProps = {
  toggleSelection: (id: FilterId, overrideState?: boolean | null) => void;
  getFilterState: (id: FilterId) => boolean;
};

type StaticQueryData = {
  allSanityAuthor: {
    nodes: Authors;
  };
  allSanityCategory: {
    nodes: Categories;
  };
};

const Filters = ({ toggleSelection, getFilterState }: FiltersProps) => {
  const { allSanityAuthor, allSanityCategory }: StaticQueryData =
    useStaticQuery(graphql`
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
      <FilterContent>
        {allSanityCategory.nodes.map((category) => (
          <Checkbox
            label={category.title}
            checked={getFilterState(category.id)}
            onChange={() => toggleSelection(category.id)}
          />
        ))}
      </FilterContent>
      <FilterTypeHeader>Authors</FilterTypeHeader>
      <FilterContent>
        {allSanityAuthor.nodes.map((author) => (
          <Checkbox
            label={author.name}
            checked={getFilterState(author.id)}
            onChange={() => toggleSelection(author.id)}
          />
        ))}
      </FilterContent>
    </Container>
  );
};

export default Filters;
