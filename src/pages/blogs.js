import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import { navigate } from 'gatsby';

const Container = styled.div`
  min-height: 100vh;
`;
const BlogsPage = ({ location }) => {
  const [selections, setSelections] = useState({});
  const { search } = location;
  const urlParse = new URLSearchParams(search);

  const updateURL = (filters) => {
    navigate(`?filters=${filters.filter((filter) => filter != '').join(',')}`);
  };

  const selectedFilters = urlParse.get('filters')?.split(',') || [];

  const toggleSelections = (id, state = null) => {
    if (state === null) {
      if (selectedFilters.includes(id)) {
        updateURL(
          selectedFilters.filter((existingFilterID) => existingFilterID != id)
        );
      } else {
        updateURL([...selectedFilters, id]);
      }
    } else {
      if (state) {
        updateURL([...selectedFilters, id]);
      } else {
        updateURL(
          selectedFilters.filter((existingFilterID) => existingFilterID != id)
        );
      }
    }
  };

  const getFilterState = (id) => selectedFilters.includes(id);

  return (
    <Container>
      <Filters
        toggleSelection={toggleSelections}
        getFilterState={getFilterState}
      />
      <BlogList selectedFilters={selectedFilters} />
    </Container>
  );
};

export default BlogsPage;
