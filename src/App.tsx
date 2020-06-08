import React, { useState } from 'react';

import Body from './components/Body';
import DefaultSets from './components/DefaultSets';
import Footer from './components/Footer';
import Header from './components/Header';
import { SetsProvider } from './contexts/Sets';

const App = () => {
  const [defaultSetsAreFilled, setDefaultSetsAreFilled] = useState<boolean>(false);

  function startApp() {
    setDefaultSetsAreFilled(true);
  }

  return (
    <SetsProvider>
      <DefaultSets callback={startApp} />
      {defaultSetsAreFilled && (
        <>
          <Header />
          <Body />
          <Footer />
        </>
      )}
    </SetsProvider>
  );
};

export default App;
