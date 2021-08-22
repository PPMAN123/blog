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

const createAuthorPages = async ({ graphql, actions }) => {};

export async function createPages(params) {
  await createBlogPages(params);
}
