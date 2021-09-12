import path from 'path';

const createBlogPages = async ({ graphql, actions }) => {
  const blogTemplate = path.resolve('./src/template/BlogTemplate.tsx');

  const { data } = await graphql(`
    query {
      allSanityPost {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `);

  data.allSanityPost.nodes.forEach((post) => {
    actions.createPage({
      path: post.slug.current,
      component: blogTemplate,
      context: {
        title: post.title,
        slug: post.slug.current,
      },
    });
  });
};

const createAuthorPages = async ({ graphql, actions }) => {
  const authorTemplate = path.resolve('./src/template/AuthorTemplate.tsx');
  const { data } = await graphql(`
    query {
      allSanityAuthor {
        nodes {
          bio {
            children {
              text
            }
          }
          slug {
            current
          }
          image {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  data.allSanityAuthor.nodes.forEach((author) => {
    actions.createPage({
      path: author.slug.current,
      component: authorTemplate,
      context: {
        title: author.title,
        slug: author.slug.current,
      },
    });
  });
};

const createCategoriesPages = async ({ graphql, actions }) => {
  const categoryTemplate = path.resolve('./src/template/CategoryTemplate.tsx');
  const { data } = await graphql(`
    query {
      allSanityCategory {
        nodes {
          slug {
            current
          }
          title
          description
          colour
          id
        }
      }
    }
  `);

  data.allSanityCategory.nodes.forEach((category) => {
    actions.createPage({
      path: category.slug.current,
      component: categoryTemplate,
      context: {
        title: category.title,
        slug: category.slug.current,
        id: category.id,
        description: category.description,
      },
    });
  });
};

export async function createPages(params) {
  await createBlogPages(params);
  await createAuthorPages(params);
  await createCategoriesPages(params);
}
