import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Card } from 'semantic-ui-react';
import BlogPreview from './BlogPreview';

const BlogList = ({ selectedFilters }) => {
  const { allSanityPost } = useStaticQuery(graphql`
    query {
      allSanityPost(sort: { order: ASC, fields: _createdAt }) {
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

  const allCategoryIds = allSanityPost.nodes.reduce((acc, post) => {
    post.categories.forEach((category) => acc.add(category.id));
    return acc;
  }, new Set());

  const allAuthorIds = allSanityPost.nodes.reduce((acc, post) => {
    acc.add(post.author.id);
    return acc;
  }, new Set());

  const resultBlogSet = allSanityPost.nodes.filter((post) => {
    const postCategoryIds = post.categories.map((category) => category.id);
    const authorId = post.author.id;

    const allPostCategoriesIncluded = selectedFilters.every(
      (filterId) =>
        postCategoryIds.includes(filterId) || allAuthorIds.has(filterId)
    );

    const matchesCategoryFilter =
      allPostCategoriesIncluded || noCategoriesSelected;

    let noCategoriesSelected = true;
    if (!matchesCategoryFilter) {
      allCategoryIds.forEach((categoryId) => {
        if (selectedFilters.includes(categoryId)) {
          noCategoriesSelected = false;
        }
      });
    }

    let authorIdSelected = selectedFilters.includes(authorId);

    let noAuthorsSelected = true;

    if (!matchesAuthorId) {
      allAuthorIds.forEach((authorId) => {
        if (selectedFilters.includes(authorId)) {
          noAuthorsSelected = false;
        }
      });
    }

    const matchesAuthorId = authorIdSelected || noAuthorsSelected;

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
