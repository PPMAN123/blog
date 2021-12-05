import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import Layout from './src/components/Layout';
import { NotificationProvider } from './src/context/NotificationContext';
import { FiltersProvider } from './src/context/FiltersContext';
import { Helmet } from 'react-helmet';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return (
    <NotificationProvider>
      <FiltersProvider>{element}</FiltersProvider>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `window.twttr = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));`,
          },
        ]}
      ></Helmet>
    </NotificationProvider>
  );
}
