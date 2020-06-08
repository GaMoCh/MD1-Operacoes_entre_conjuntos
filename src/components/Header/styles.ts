import { css } from '@emotion/core';

import { majorScale, defaultTheme } from 'evergreen-ui';

export const header = css`
  background-color: ${defaultTheme.colors.background.tint1};
  padding: ${majorScale(5)}px;
  margin: ${majorScale(1)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
