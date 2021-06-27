import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Card, Button } from 'semantic-ui-react';

const StyledLink = styled(Link)`
  opacity: 0;
  transition: opacity 0.1s ease-in;
  border: 2px solid white;
  background-color: rgba(200, 200, 200, 0.5);
  color: black;
  padding: 0.75rem 0.5rem;
  text-transform: uppercase;
  border-radius: 5px;
  z-index: 1;
  &:hover {
    color: white;
    background-color: rgba(150, 150, 150, 0.5);
  }
`;

const StyledImage = styled.figure`
  position: relative;
  margin: 0;
  background: url(${(p) => p.src});
  min-height: 200px;
  width: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    &:before {
      background-color: rgba(0, 0, 0, 0.5);
    }
    ${StyledLink} {
      opacity: 1;
    }
  }

  &:before {
    left: 0;
    top: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.25s ease-in;
  }
`;

const BlogPreview = ({ posts }) => {
  return posts.map((posts) => (
    <Card key={posts.slug.current}>
      <StyledImage src={posts.mainImage.asset.url} wrapped ui={false}>
        <StyledLink to={`/${posts.slug.current}/`}>Learn More</StyledLink>
      </StyledImage>
      <Card.Content>
        <Card.Header>
          <Link color="black" to={`/${posts.slug.current}/`}>
            {posts.title}
          </Link>
        </Card.Header>
        <Card.Meta>
          <Link to={`/${posts.author.slug.current}/`}>{posts.author.name}</Link>
        </Card.Meta>
        <Card.Description>{posts._updatedAt}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {posts.categories.map((category) => (
          <React.Fragment>
            <Button
              style={{ margin: '3px' }}
              size={'tiny'}
              color={category.colour}
              as={Link}
              to={`/${category.slug.current}/`}
            >
              {category.title}
            </Button>
          </React.Fragment>
        ))}
      </Card.Content>
    </Card>
  ));
};

export default BlogPreview;
