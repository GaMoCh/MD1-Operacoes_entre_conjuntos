import { css } from '@emotion/core';

import { majorScale, minorScale } from 'evergreen-ui';

export const incrementButtonWrapper = css`
  display: flex;
  justify-content: center;
  margin: ${majorScale(2)}px 0;
`;

export const setsContainer = css`
  padding: ${minorScale(3)}px;
  margin: ${majorScale(1)}px 0;
  user-select: none;
`;
