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

Object.defineProperty(initialState, 'universe', { configurable: false });
Object.defineProperty(initialState, 'A', { configurable: false });

export default initialState;
