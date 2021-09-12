import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Card } from 'semantic-ui-react';
import BlogPreview from './BlogPreview';
import type { FilterId } from '../types/filter';
import { CategoryId } from '../types/category';
import { Post } from '../types/posts';
import { AuthorId } from '../types/author';

export type BlogListProps = {
  selectedFilters: Array<FilterId>;
  title?: string;
};

const BlogList = ({ selectedFilters, title }: BlogListProps) => {
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

  const allCategoryIds = allSanityPost.nodes.reduce(
    (acc: Set<CategoryId>, post: Post) => {
      post.categories.forEach((category) => acc.add(category.id));
      return acc;
    },
    new Set()
  );

  const allAuthorIds = allSanityPost.nodes.reduce(
    (acc: Set<CategoryId>, post: Post) => {
      acc.add(post.author.id);
      return acc;
    },
    new Set()
  );

  const resultBlogSet = allSanityPost.nodes.filter((post: Post) => {
    const postCategoryIds = post.categories.map((category) => category.id);
    const authorId = post.author.id;

    const allPostCategoriesIncluded = selectedFilters.every(
      (filterId) =>
        postCategoryIds.includes(filterId) || allAuthorIds.has(filterId)
    );

    let noCategoriesSelected = true;

    allCategoryIds.forEach((categoryId: CategoryId) => {
      if (selectedFilters.includes(categoryId)) {
        noCategoriesSelected = false;
      }
    });

    const matchesCategoryFilter =
      allPostCategoriesIncluded || noCategoriesSelected;

    let authorIdSelected = selectedFilters.includes(authorId);
    let noAuthorsSelected = true;
    allAuthorIds.forEach((authorId: AuthorId) => {
      if (selectedFilters.includes(authorId)) {
        noAuthorsSelected = false;
      }
    });

    const matchesAuthorId = authorIdSelected || noAuthorsSelected;
    return matchesCategoryFilter && matchesAuthorId;
  });
  return (
    <div>
      {title && <h1>{title}</h1>}
      <Card.Group itemsPerRow={3} stackable={true} style={{ width: '100%' }}>
        <BlogPreview posts={resultBlogSet} />
      </Card.Group>
    </div>
  );
};

export default BlogList;
