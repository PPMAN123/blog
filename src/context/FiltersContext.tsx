import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Authors } from '../types/author';
import { Categories } from '../types/category';

type FilterDetails = {
  [id: string]: { name: string; type: string };
};

export type FiltersContextValues = {
  getFilterDetails: () => FilterDetails;
};

type StaticQueryData = {
  allSanityAuthor: {
    nodes: Authors;
  };
  allSanityCategory: {
    nodes: Categories;
  };
};

const FiltersContext = React.createContext<FiltersContextValues>({
  getFilterDetails: () => {
    return {
      '9173218': {
        name: '',
        type: '',
      },
    };
  },
});

const FiltersProvider: React.FC = ({ children }) => {
  const { allSanityAuthor, allSanityCategory }: StaticQueryData =
    useStaticQuery(graphql`
      query {
        allSanityAuthor {
          nodes {
            name
            id
          }
        }
        allSanityCategory {
          nodes {
            title
            id
          }
        }
      }
    `);

  const getFilterDetails = () => {
    //add the authors
    const authors = allSanityAuthor.nodes.reduce((acc, author) => {
      acc[author.id] = {
        name: author.name,
        type: 'author',
      };
      return acc;
    }, {} as FilterDetails);

    const categories = allSanityCategory.nodes.reduce((acc, category) => {
      acc[category.id] = {
        name: category.title,
        type: 'category',
      };
      return acc;
    }, {} as FilterDetails);

    const details = {
      ...authors,
      ...categories,
    };

    return details;
  };

  return (
    <FiltersContext.Provider value={{ getFilterDetails }}>
      {children}
    </FiltersContext.Provider>
  );
};

const useFiltersContext = () => {
  const { getFilterDetails } = React.useContext(FiltersContext);
  return {
    getFilterDetails,
  };
};

export { FiltersProvider, useFiltersContext };
