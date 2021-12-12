import React from 'react';
import { graphql, PageProps } from 'gatsby';
import PortableText from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Quote from '../components/StyledBlocks/Quote';
import Section from '../components/StyledBlocks/Section';
import { Serializer } from '../types/sanity';
import { Post } from '../types/posts';
import ShareButtons from '../components/ShareButtons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockText from '../components/CodeBlockText';

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

const serializers: Serializer = {
  types: {
    blockQuote: ({ node: { message, authorName } }) => {
      return <Quote message={message} author={authorName} />;
    },
    codeBlock: ({node: {code, language}}) => {
      const languageMapping: {[key: string]: string} = {
        JS: 'javascript',
        Python: 'python',
        HTML: 'html',
        CSS: 'css',
        'C++': 'cpp',
        Typescript: 'typescript'
      }
      return <SyntaxHighlighter language={languageMapping[language]} displayLanguage={language} style={atomDark} showLineNumbers PreTag={CodeBlockText}>
        {code}
      </SyntaxHighlighter>
    },
    section: ({ node: { leftContent, rightContent, type } }) => {
      return (
        <Section
          leftChildren={
            <PortableText
              blocks={leftContent}
              serializers={serializers}
              projectId={process.env.GATSBY_SANITY_PROJECT_ID}
              dataset={process.env.GATSBY_SANITY_DATASET}
            />
          }
          rightChildren={
            <PortableText
              blocks={rightContent}
              serializers={serializers}
              projectId={process.env.GATSBY_SANITY_PROJECT_ID}
              dataset={process.env.GATSBY_SANITY_DATASET}
            />
          }
          type={type}
        />
      );
    },
  },
  marks: {
    centerAlign: ({ children }) => {
      return <span style={{ margin: '0 auto' }}>{children}</span>;
    },
    rightAlign: ({ children }) => {
      return <span style={{ marginLeft: 'auto' }}>{children}</span>;
    },
    normal: ({ children }) => {
      return <p style={{ display: 'flex', width: '100%' }}>{children}</p>;
    },
  },
};

export type BlogPageProps = PageProps<{ sanityPost: Post }>;

export default function BlogPage({ data, location }: BlogPageProps) {
  const { sanityPost } = data;
  let mainImage = null;
  if (sanityPost.mainImage) {
    mainImage = getImage(sanityPost.mainImage.asset) as IGatsbyImageData;
  }
  return (
    <React.Fragment>
      <BlogContainer>
        <BannerImageContainer>
          {mainImage && <GatsbyImage image={mainImage} alt="" />}
          <Title>{sanityPost.title}</Title>
        </BannerImageContainer>
        <BannerContainer />
        <ShareButtons link={location.href} message={sanityPost.title}/>
        <PortableText
          blocks={sanityPost._rawBody}
          serializers={serializers}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset={process.env.GATSBY_SANITY_DATASET}
        />
      </BlogContainer>
    </React.Fragment>
  );
}

export const query = graphql`
  query ($slug: String!) {
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
