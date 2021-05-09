module.exports = {
  siteMetadata: {
    title: "blog",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "",
        dataset: "",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
  ],
};
