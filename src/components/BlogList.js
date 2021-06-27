import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Card } from 'semantic-ui-react';
import BlogPreview from './BlogPreview';

const BlogList = ({ selections }) => {
  const { allSanityPost } = useStaticQuery(graphql`
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

  const resultBlogSet = allSanityPost.nodes.filter((post) => {
    const postCategoryIds = post.categories.map((category) => category.id);
    const authorId = post.author.id;

    const allCheckedCategories = Object.keys(selections).filter(
      (categoryId) => {
        const { checked, type } = selections[categoryId];
        return checked && type === 'category';
      }
    );

    const matchesCategoryFilter =
      allCheckedCategories.every((categoryId) =>
        postCategoryIds.includes(categoryId)
      ) ||
      Object.values(selections)
        .filter(({ type }) => type === 'category')
        .every(({ checked }) => !checked);

    const matchesAuthorId =
      selections[authorId]?.checked ||
      Object.values(selections)
        .filter(({ type }) => type === 'author')
        .every(({ checked }) => !checked);
    return matchesCategoryFilter && matchesAuthorId;
  });
  return (
    <div>
      <h1>Filtered Results</h1>
      <Card.Group itemsPerRow={3} stackable={true} style={{ width: '100%' }}>
        <BlogPreview posts={resultBlogSet} />
      </Card.Group>
    </div>
  );
};

export default BlogList;
