import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { IoIosMore } from 'react-icons/io';
import BlogPreview from './BlogPreview';
import { Posts } from '../types/posts';

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

const Title = styled.h2`
  font-size: 2rem;
  color: black;
  margin-bottom: 2rem;
`;

type StaticQueryData = {
  allSanityPost: {
    nodes: Posts;
  };
};

const RecentBlogs = () => {
  const { allSanityPost }: StaticQueryData = useStaticQuery(graphql`
    query {
      allSanityPost(sort: { order: ASC, fields: _createdAt }, limit: 3) {
        nodes {
          title
          categories {
            id
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
            id
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
