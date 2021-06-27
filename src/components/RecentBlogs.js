import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { IoIosMore } from 'react-icons/io';
import BlogPreview from './BlogPreview';

const BlogPreviewContainer = styled.section`
  flex-direction: column;
  margin-top: 10px;
  display: flex;
  width: 100%;
`;

const ViewMoreLink = styled(Link)`
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  padding: 2rem;
  font-size: 40px;
  color: rgba(0, 0, 0, 0.7);
  height: fit-content;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  box-shadow: 5px 5px 3px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: 0.5px solid rgba(0, 0, 0, 0.5);
  }
`;

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

const Title = styled.h2`
  font-size: 2rem;
  color: black;
  margin-bottom: 2rem;
`;

const RecentBlogs = () => {
  const { allSanityPost } = useStaticQuery(graphql`
    query {
      allSanityPost(sort: { order: ASC, fields: _createdAt }, limit: 3) {
        nodes {
          title
          categories {
            title
            colour
            slug {
              current
            }
          }
          mainImage {
            asset {
              url
            }
          }
          slug {
            current
          }
          author {
            name
            slug {
              current
            }
          }
          _updatedAt(formatString: "YYYY MMM DD")
        }
      }
    }
  `);

  const { nodes: posts } = allSanityPost;

  return (
    <BlogPreviewContainer>
      <Title>Recent Blogs</Title>
      <Card.Group stackable itemsPerRow={4} style={{ width: '100%' }}>
        <BlogPreview posts={posts} />
        <ViewMoreLink to="/blogs">
          <IoIosMore />
        </ViewMoreLink>
      </Card.Group>
    </BlogPreviewContainer>
  );
};

export default RecentBlogs;
