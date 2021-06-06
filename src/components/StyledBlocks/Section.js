import React from 'react';
import styled from 'styled-components';

const typeMapping = {
  'half-half': ['50%', '50%'],
  '7-3': ['70%', '30%'],
  '6-4': ['60%', '40%'],
};

const RightContainer = styled.section`
  width: ${(p) => p.size};
  display: flex;
  flex-direction: column;
  background-color: #abcdef;
`;

const LeftContainer = styled.section`
  width: ${(p) => p.size};
  display: flex;
  flex-direction: column;
  background-color: #fedcba;
`;

const SectionContainer = styled.article`
  display: flex;
`;

const Section = ({ leftChildren, rightChildren, type }) => {
  const sizes = typeMapping[type];
  return (
    <SectionContainer>
      <LeftContainer size={sizes[0]}>{leftChildren}</LeftContainer>
      <RightContainer size={[sizes[1]]}>{rightChildren}</RightContainer>
    </SectionContainer>
  );
};

export default Section;
