// const React = require('react');
// const Layout = require('./src/components/layout/Layout').default;

import React from 'react';
import Layout from 'components/layout/Layout';
import { OrderProvider } from 'context/OrderContext';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);
