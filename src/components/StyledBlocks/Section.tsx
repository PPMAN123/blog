import React from 'react';
import styled from 'styled-components';

export enum ContentWidthRules {
  'HALF-HALF' = 'half-half',
  '7-3' = '7-3',
  '6-4' = '6-4',
}

export type ContentWidthPercentage = string;

const typeMapping: {
  [key in ContentWidthRules]: Array<ContentWidthPercentage>;
} = {
  [ContentWidthRules['HALF-HALF']]: ['50%', '50%'],
  [ContentWidthRules['7-3']]: ['70%', '30%'],
  [ContentWidthRules['6-4']]: ['60%', '40%'],
};

interface ContainerProps {
  size: ContentWidthPercentage;
}

const RightContainer = styled.section<ContainerProps>`
  width: ${(p) => p.size};
  display: flex;
  flex-direction: column;
  background-color: #abcdef;
`;

const LeftContainer = styled.section<ContainerProps>`
  width: ${(p) => p.size};
  display: flex;
  flex-direction: column;
  background-color: #fedcba;
`;

const SectionContainer = styled.article`
  display: flex;
`;

export type SectionProps = {
  leftChildren: JSX.Element;
  rightChildren: JSX.Element;
  type: ContentWidthRules;
};

const Section = ({ leftChildren, rightChildren, type }: SectionProps) => {
  const sizes = typeMapping[type];
  return (
    <SectionContainer>
      <LeftContainer size={sizes[0]}>{leftChildren}</LeftContainer>
      <RightContainer size={sizes[1]}>{rightChildren}</RightContainer>
    </SectionContainer>
  );
};

export default Section;
