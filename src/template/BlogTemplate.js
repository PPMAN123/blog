import React from 'react';
import { graphql } from 'gatsby';
import PortableText from 'react-portable-text';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Quote from '../components/StyledBlocks/Quote';
import Section from '../components/StyledBlocks/Section';

const BlogContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;
  }
`;

const BannerImageContainer = styled.figure`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
`;

const BannerContainer = styled.section`
  height: 100vh;
  display: flex;
  width: 100%;
  z-index: 2;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  height: fit-content;
  font-size: 3rem;
  border-radius: 0.5rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
`;

const serializers = {
  blockQuote: ({ message, authorName }) => {
    return <Quote message={message} author={authorName} />;
  },
  section: ({ leftContent, rightContent, type }) => {
    return (
      <Section
        leftChildren={
          <PortableText
            content={leftContent}
            projectId={process.env.GATSBY_SANITY_PROJECT_ID}
            dataset={process.env.GATSBY_SANITY_DATASET}
            serializers={serializers}
          />
        }
        rightChildren={
          <PortableText
            content={rightContent}
            projectId={process.env.GATSBY_SANITY_PROJECT_ID}
            dataset={process.env.GATSBY_SANITY_DATASET}
            serializers={serializers}
          />
        }
        type={type}
      />
    );
  },
  centerAlign: ({ children }) => {
    return <span style={{ margin: '0 auto' }}>{children}</span>;
  },
  rightAlign: ({ children }) => {
    return <span style={{ marginLeft: 'auto' }}>{children}</span>;
  },
  normal: ({ children }) => {
    return <p style={{ display: 'flex', width: '100%' }}>{children}</p>;
  },
};

export default function BlogPage({ data }) {
  const { sanityPost } = data;
  console.log(sanityPost);
  const mainImage = getImage(sanityPost.mainImage.asset);
  return (
    <React.Fragment>
      <BlogContainer>
        <BannerImageContainer>
          <GatsbyImage image={mainImage} />
          <Title>{sanityPost.title}</Title>
        </BannerImageContainer>
        <BannerContainer></BannerContainer>
        <PortableText
          content={sanityPost._rawBody}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset={process.env.GATSBY_SANITY_DATASET}
          serializers={serializers}
        />
      </BlogContainer>
    </React.Fragment>
  );
}

export const query = graphql`
  query($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      title
      _rawBody
      publishedAt
      mainImage {
        asset {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      author {
        name
        slug {
          current
        }
      }
    }
  }
`;
