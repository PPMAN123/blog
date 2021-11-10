import React from 'react';
import Filters from '../components/Filters';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import { navigate, PageProps } from 'gatsby';
import { Grid } from 'semantic-ui-react';
import { FilterId, FilterIds } from '../types/filter';
import { useNotificationContext } from '../context/NotificationContext';
import { NotificationType } from '../components/Notification';
import { useFiltersContext } from '../context/FiltersContext';
import { usePrevious } from '../hooks/usePrevious';
import _ from 'lodash';

const Container = styled.div`
  min-height: 100vh;
  padding: 2.5rem 0;
`;

const BlogsPage = ({ location }: PageProps) => {
  const { search } = location;
  const urlParse = new URLSearchParams(search);
  const selectedFilters: FilterIds = urlParse.get('filters')?.split(',') || [];
  const { triggerNewNotification } = useNotificationContext();
  const { getFilterDetails } = useFiltersContext();
  const prevSelectedFilters = usePrevious(selectedFilters);

  //dictionary with all the details of each id
  const dictionary = getFilterDetails();

  const updateURL = (filters: FilterIds) => {
    navigate(
      `?filters=${filters.filter((filter: FilterId) => filter != '').join(',')}`
    );
  };

  React.useEffect(() => {
    selectedFilters.forEach((filter) => {
      if (!prevSelectedFilters?.includes(filter) && filter !== '') {
        triggerNewNotification({
          message: `You added a ${dictionary[filter].type} called ${dictionary[filter].name}`,
          type: NotificationType.POSITIVE,
          id: _.uniqueId('NotificationId'),
        });
      }
    });
    if (prevSelectedFilters) {
      prevSelectedFilters.forEach((filter) => {
        if (!selectedFilters?.includes(filter) && filter !== '') {
          triggerNewNotification({
            message: `You deleted a ${dictionary[filter].type} called ${dictionary[filter].name}`,
            type: NotificationType.NEGATIVE,
            id: _.uniqueId('NotificationId'),
          });
        }
      });
    }
  }, [selectedFilters]);

  const toggleSelections = (id: FilterId, state: boolean | null = null) => {
    if (state === null) {
      if (selectedFilters.includes(id)) {
        updateURL(
          selectedFilters.filter(
            (existingFilterID: FilterId) => existingFilterID != id
          )
        );
      } else {
        updateURL([...selectedFilters, id]);
      }
    } else {
      if (state) {
        updateURL([...selectedFilters, id]);
      } else {
        updateURL(
          selectedFilters.filter(
            (existingFilterID: FilterId) => existingFilterID != id
          )
        );
      }
    }
  };

  const getFilterState = (id: FilterId): boolean =>
    selectedFilters.includes(id);

  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <Filters
            toggleSelection={toggleSelections}
            getFilterState={getFilterState}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <BlogList
            selectedFilters={selectedFilters}
            title="Filtered Results"
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default BlogsPage;
