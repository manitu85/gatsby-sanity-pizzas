import { createGlobalStyle } from 'styled-components';

import font from 'assets/fonts/frenchfries.woff';

const Typography = createGlobalStyle`
  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  html {
    font-family: FrenchFries, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
  }
  span.mark {
    display: inline-block;
    transform: rotate(-2deg);
  }
  mark, .mark {
    background: var(--yellow);
    padding: 5px;
    margin: 0;
    display: inline;
    line-height: 1;
  }
  .center {
    text-align: center;
  }
  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
