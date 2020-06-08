import React from 'react';

import { Pane, Card, Text } from 'evergreen-ui';

import { useSetsState } from '~/contexts/Sets';
import { SetType } from '~/contexts/Sets/types';

import { footer, setsDataWrapper } from './styles';

const Footer = () => {
  const setsState = useSetsState();

  return (
    <Card is="footer" elevation={1} css={footer}>
      {(Object.values(setsState) as SetType[]).map((set, i) => (
        <Card css={setsDataWrapper} elevation={1} key={i.toString()}>
          <Pane>
            <Text>{set.symbol}</Text>
            {set.source && <Text> = {set.source}</Text>}
            <Text>{` = {${[...set.values].join(', ')}}`}</Text>
          </Pane>
          <Pane>
            <Text>{`|${set.symbol}| = ${set.values.size}`}</Text>
          </Pane>
        </Card>
      ))}
    </Card>
  );
};

export default Footer;
