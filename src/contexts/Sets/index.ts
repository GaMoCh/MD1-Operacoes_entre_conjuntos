import makeContext from '../makeContext';
import actions from './actions';
import initialState from './initialState';

import { SetsState, SetsActionType, SetsPayloads } from './types';

const [SetsProvider, useSetsState, useSetsDispatch] = makeContext<SetsState, SetsActionType, SetsPayloads>(
  initialState,
  actions,
);

export { SetsProvider, useSetsState, useSetsDispatch };
