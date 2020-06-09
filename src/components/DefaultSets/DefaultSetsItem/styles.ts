import { css } from '@emotion/core';

import { majorScale, minorScale, defaultTheme } from 'evergreen-ui';

export const setWrapper = css`
  display: flex;
  margin: ${majorScale(1)}px 0;
  & span {
    line-height: ${majorScale(4)}px;
    width: ${majorScale(5)}px;
  }
`;

export const inputElements = css`
  flex: 1;
  margin: 0 ${majorScale(1)}px;

  & * {
    text-transform: lowercase;
  }

  &::before,
  &::after {
    font-family: ${defaultTheme.typography.fontFamilies.ui};
    font-size: 16px;
  }

  &::before {
    content: '{';
    margin-right: ${minorScale(1)}px;
  }

  &::after {
    content: '}';
    margin-left: ${minorScale(1)}px;
  }
`;
