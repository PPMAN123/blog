import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { Card, Divider } from 'semantic-ui-react';
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic';
import styled from 'styled-components';
import BlogPreview from '../components/BlogPreview';
import type { Posts } from '../types/posts';

const CategoryBlogsWrapper = styled.section`
  flex-direction: column;
  margin-top: 10px;
  display: flex;
  width: 100%;
`;

const AuthorBioWrapper = styled.section`
  display: flex;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledDescription = styled.p`
  white-space: pre-line;
  align-self: center;
  font-size: 18px;
  margin: 0 15px;
`;

const RecentPosts = styled.h2``;

const Title = styled.h1`
  align-self: start;
  font-size: 36px;
`;

export type CategoryTemplateProps = PageProps<
  {
    allSanityPost: { nodes: Posts };
  },
  {
    title: string;
    slug: string;
    id: string;
    description: string;
  }
>;

const CategoryTemplate = ({ data, pageContext }: CategoryTemplateProps) => {
  const { allSanityPost } = data;
  console.log(pageContext);
  const categoryId = pageContext.id;
  const itemsPerRow = (allSanityPost.nodes.length + 1) as SemanticWIDTHSNUMBER;

  return (
    <PageWrapper>
      <Title>{pageContext.title}</Title>
      <AuthorBioWrapper>
        {pageContext.description && pageContext.description ? (
          <StyledDescription>
            &mdash; {pageContext.description}
          </StyledDescription>
        ) : (
          <StyledDescription>
            there's no description for this category ;-;
          </StyledDescription>
        )}
      </AuthorBioWrapper>
      <Divider />
      <CategoryBlogsWrapper>
        <RecentPosts>
          Recent Posts under the category {pageContext.title}
        </RecentPosts>
        <Card.Group
          stackable
          itemsPerRow={itemsPerRow}
          style={{ width: '100%' }}
        >
          <BlogPreview posts={allSanityPost.nodes} />
          <ViewMoreLink to={`/blogs?filters=${categoryId}`}>
            <IoIosMore />
          </ViewMoreLink>
        </Card.Group>
      </CategoryBlogsWrapper>
    </PageWrapper>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query($slug: String!) {
    allSanityPost(
      filter: {
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
      limit: 3
      sort: { order: ASC, fields: _createdAt }
    ) {
      nodes {
        title
        categories {
          id
          title
          slug {
            current
          }
          colour
          description
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
`;
