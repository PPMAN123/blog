import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { Card, Divider, Image } from 'semantic-ui-react';
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic';
import styled from 'styled-components';
import BlogPreview from '../components/BlogPreview';
import { SanityImage } from '../types/image';
import type { Posts } from '../types/posts';

const AuthorBlogsWrapper = styled.section`
  flex-direction: column;
  margin-top: 10px;
  display: flex;
  width: 100%;
`;

const AuthorBioWrapper = styled.section`
  display: flex;
  margin: 10px;
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

const StyledBio = styled.p`
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

export type AuthorTemplateProps = PageProps<{
  allSanityPost: { nodes: Posts };
}>;

const AuthorTemplate = ({ data }: AuthorTemplateProps) => {
  const { allSanityPost } = data;
  const authorId = allSanityPost.nodes[0].author.id;
  const authorBioImage: SanityImage = allSanityPost.nodes[0].author.image;
  const authorBio = allSanityPost.nodes[0].author.bio;
  const itemsPerRow = (allSanityPost.nodes.length + 1) as SemanticWIDTHSNUMBER;
  const fullAuthorBioArray = authorBio.map((p) => {
    return p.children[0].text;
  });
  let fullAuthorBio: string = '';
  fullAuthorBioArray.forEach((bioSentence) => {
    fullAuthorBio += bioSentence;
  });
  return (
    <PageWrapper>
      <Title>{allSanityPost.nodes[0].author.name}</Title>
      <AuthorBioWrapper>
        <Image src={`${authorBioImage.asset.url}`} size="medium" circular />
        <StyledBio>{fullAuthorBio}</StyledBio>
      </AuthorBioWrapper>
      <Divider />
      <AuthorBlogsWrapper>
        <RecentPosts>
          Recent Posts by {allSanityPost.nodes[0].author.name}
        </RecentPosts>
        <Card.Group
          stackable
          itemsPerRow={itemsPerRow}
          style={{ width: '100%' }}
        >
          <BlogPreview posts={allSanityPost.nodes} />
          <ViewMoreLink to={`/blogs?filters=${authorId}`}>
            <IoIosMore />
          </ViewMoreLink>
        </Card.Group>
      </AuthorBlogsWrapper>
    </PageWrapper>
  );
};

export default AuthorTemplate;

export const query = graphql`
  query($slug: String!) {
    allSanityPost(
      filter: { author: { slug: { current: { eq: $slug } } } }
      limit: 3
      sort: { order: ASC, fields: _createdAt }
    ) {
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
          image {
            asset {
              url
            }
          }
          slug {
            current
          }
          bio {
            children {
              text
            }
          }
        }
        _updatedAt(formatString: "YYYY MMM DD")
      }
    }
  }
`;
