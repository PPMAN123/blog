import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { FilterId } from '../types/filter';
import { useFiltersContext } from '../context/FiltersContext';

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

const Filters = ({ toggleSelection, getFilterState }: FiltersProps) => {
  const { getFilterDetails } = useFiltersContext();
  const dictionary = getFilterDetails();

  return (
    <Container>
      <FilterTypeHeader>Categories</FilterTypeHeader>
      <FilterContent>
        {Object.keys(dictionary).map((key: FilterId) => {
          if (dictionary[key].type === 'category') {
            return (
              <Checkbox
                label={dictionary[key].name}
                checked={getFilterState(key)}
                onChange={() => toggleSelection(key)}
              />
            );
          }
        })}
      </FilterContent>
      <FilterTypeHeader>Authors</FilterTypeHeader>
      <FilterContent>
        {Object.keys(dictionary).map((key) => {
          if (dictionary[key].type === 'author') {
            return (
              <Checkbox
                label={dictionary[key].name}
                checked={getFilterState(key)}
                onChange={() => toggleSelection(key)}
              />
            );
          }
        })}
      </FilterContent>
    </Container>
  );
};

export default Filters;
