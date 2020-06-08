import { css } from '@emotion/core';

import { defaultTheme } from 'evergreen-ui';

const globalStyle = css`
  html {
    height: 100%;
  }

  body {
    background-color: ${defaultTheme.palette.blue.base};
    height: inherit;
    margin: 0;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default globalStyle;
