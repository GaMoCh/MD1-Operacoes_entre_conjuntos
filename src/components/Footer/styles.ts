import { css } from '@emotion/core';

import { majorScale, defaultTheme } from 'evergreen-ui';

export const footer = css`
  background-color: ${defaultTheme.colors.background.tint1};
  min-height: ${majorScale(5) * 10}px;
  overflow: auto;
  margin: ${majorScale(1)}px;
`;

export const setsDataWrapper = css`
  margin: ${majorScale(2)}px;
  padding: ${majorScale(1)}px 0;
  justify-content: space-between;
  display: flex;

  & > * {
    margin: 0 ${majorScale(2)}px;
    min-width: ${majorScale(5) * 2}px;
  }
`;
