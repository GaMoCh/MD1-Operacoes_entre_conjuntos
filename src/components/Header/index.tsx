import React from 'react';

import { Card, Heading } from 'evergreen-ui';

import { header } from './styles';

const messages = {
  title: 'Operações entre conjuntos',
};

const Header = () => (
  <Card is="header" elevation={1} css={header}>
    <Heading is="h1" size={900}>
      {messages.title}
    </Heading>
  </Card>
);

export default Header;
