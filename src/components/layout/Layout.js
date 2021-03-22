import React from 'react';
import styled from 'styled-components';
import GlobalStyles from 'components/common/base/GlobalStyles';
import Typography from 'components/common/base/Typography';
import stripes from 'assets/images/stripes.svg';
import 'normalize.css';

import Menu from './Menu';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <SiteBorder>
      <SiteContent>
        <Menu />
        <main>{children}</main>
        <Footer />
      </SiteContent>
    </SiteBorder>
  </>
);

export default Layout;

const SiteContent = styled.div`
  background: white;
  padding: 2rem;
`;

const SiteBorder = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 1500px;
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;
