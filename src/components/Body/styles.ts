import { css } from '@emotion/core';

import { majorScale, defaultTheme } from 'evergreen-ui';

export const body = css`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const aside = css`
  background-color: ${defaultTheme.colors.background.tint1};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: ${majorScale(5) * 8}px;
  margin: ${majorScale(1)}px;
  padding: ${majorScale(2)}px;

  & button {
    width: ${majorScale(5) * 5}px;
    margin: ${majorScale(1)}px;
    justify-content: center;
  }
`;

export const main = css`
  background-color: ${defaultTheme.colors.background.tint1};
  flex: 2;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: ${majorScale(1)}px;
  padding: ${majorScale(2)}px;

  & form > button {
    width: ${majorScale(5) * 8}px;
    justify-content: center;
  }
`;

export const setsInputs = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${majorScale(3)}px ${majorScale(1)}px;

  & * {
    user-select: none;
  }

  @media (max-width: ${majorScale(5) * 15}px) {
    flex-direction: column;
  }

  & button {
    width: ${majorScale(5) * 6}px;
    margin: ${majorScale(1)}px;
    justify-content: center;
  }
`;
