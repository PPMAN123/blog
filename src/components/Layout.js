import React from 'react';
import Nav from './Nav';
import styled from 'styled-components';

const Container = styled.main`
  min-height: 100vh;
  margin: 10px
  width: 100%;

  @media(min-width: 480px){
    margin: 0 auto;
    max-width: 480px;
  }

  @media(min-width: 720px){
    margin: 0 auto;
    max-width: 720px;
  }

  @media(min-width: 960px){
    margin: 0 auto;
    max-width: 960px;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Nav>
        <Container>{children}</Container>
      </Nav>
    </>
  );
};

export default Layout;
