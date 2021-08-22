import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import RecentBlogs from '../components/RecentBlogs';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const IndexPage = () => {
  return (
    <PageContainer>
      <RecentBlogs />
    </PageContainer>
  );
};

export default IndexPage;
