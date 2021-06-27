import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import styled from 'styled-components';
import BlogList from '../components/BlogList';

const Container = styled.div`
  min-height: 100vh;
`;
const BlogsPage = () => {
  const [selections, setSelections] = useState({});
  return (
    <Container>
      <Filters selections={selections} setSelections={setSelections} />
      <BlogList selections={selections} />
    </Container>
  );
};

export default BlogsPage;
