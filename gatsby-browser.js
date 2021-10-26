import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import Layout from './src/components/Layout';
import { NotificationProvider } from './src/context/NotificationContext';
import styled from 'styled-components';
import { FiltersProvider } from './src/context/FiltersContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return (
    <NotificationProvider>
      <FiltersProvider>{element}</FiltersProvider>
    </NotificationProvider>
  );
}
