import React from 'react';
import Filters from '../components/Filters';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
`;
const blogs = () => {
  return (
    <Container>
      <Filters />
    </Container>
  );
};

export default blogs;
