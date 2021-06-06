import React from 'react';
import styled from 'styled-components';

const QuoteContainer = styled.div`
  background-color: #ddd;
  padding: 1.5rem;
  width: max-content;
  display: flex;
  flex-direction: column;
`;

const QuoteText = styled.h4`
  font-size: 1.5rem;
  font-style: italic;
`;

const AuthorName = styled.p`
  font-size: 1.25rem;
  position: relative;
  width: max-content;
  align-self: flex-end;

  &:before {
    content: '';
  }
`;

const Quote = ({ message, author }) => {
  return (
    <QuoteContainer>
      <QuoteText>{`"${message}"`}</QuoteText>
      <AuthorName>― {author}</AuthorName>
    </QuoteContainer>
  );
};

export default Quote;
