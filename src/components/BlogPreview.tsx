import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Card, Button } from 'semantic-ui-react';
import type { Post, Posts } from '../types/posts';
import type { Category } from '../types/category';

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

interface StyledImageProps {
  src: string;
}

const StyledImage = styled.figure<StyledImageProps>`
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

export type BlogPreviewProps = {
  posts: Posts;
};

const BlogPreview = ({ posts }: BlogPreviewProps) => {
  return (
    <React.Fragment>
      {posts.map((post: Post) => (
        <Card key={post.slug.current}>
          <StyledImage src={post.mainImage.asset.url}>
            <StyledLink to={`/${post.slug.current}/`}>Learn More</StyledLink>
          </StyledImage>
          <Card.Content>
            <Card.Header>
              <Link color="black" to={`/${post.slug.current}/`}>
                {post.title}
              </Link>
            </Card.Header>
            <Card.Meta>
              <Link to={`/blogs/?filters=${post.author.id}`}>
                {post.author.name}
              </Link>
            </Card.Meta>
            <Card.Description>{post._updatedAt}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {post.categories.map((category: Category) => (
              <React.Fragment>
                <Button
                  style={{ margin: '3px' }}
                  size={'tiny'}
                  color={category.colour}
                  as={Link}
                  to={`/blogs/?filters=${category.id}`}
                >
                  {category.title}
                </Button>
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default BlogPreview;
