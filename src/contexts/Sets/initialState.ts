import unicode from '~/utils/unicode';

import { SetsState } from './types';

const initialState: SetsState = {
  universe: {
    symbol: unicode(0x1d54c),
    values: new Set(),
  },
  A: {
    symbol: unicode(0x1d434),
    values: new Set(),
  },
};

export default initialState;
