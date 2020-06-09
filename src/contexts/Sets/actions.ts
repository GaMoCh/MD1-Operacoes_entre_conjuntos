import { Draft } from 'immer';

import unicode from '~/utils/unicode';

import initialState from './initialState';

import { ActionMethods } from '../types';
import { SetsState, SetsActionType, SetsPayloads, SetType } from './types';

function readjustElements(state: Draft<SetsState>) {
  (Object.keys(state) as (keyof SetsState)[]).forEach((key) => {
    (state[key] as SetType).values = new Set(
      [...(state[key] as SetType).values].filter((e) => state.universe.values.has(e)),
    );
  });
}

const actions: ActionMethods<SetsState, SetsActionType, SetsPayloads> = {
  [SetsActionType.CREATE_SET](state, { source, values }) {
    if (Object.keys(state).length < 27) {
      const size = Object.keys(state).length;
      const key = String.fromCharCode(size + 64) as keyof SetsState;
      state.universe.values = new Set([...state.universe.values, ...values]);
      state[key] = {
        symbol: unicode(size + 0x1d433),
        source,
        values,
      };
    }
  },
  [SetsActionType.ADD_SET](state) {
    if (Object.keys(state).length < 27) {
      const size = Object.keys(state).length;
      const key = String.fromCharCode(size + 64) as keyof SetsState;
      state[key] = {
        values: new Set(),
        symbol: unicode(size + 0x1d433),
      };
    }
  },
  [SetsActionType.REMOVE_SET](state, { key }) {
    const keys = Object.keys(state).slice(1) as Exclude<keyof SetsState, 'universe'>[];
    if (key === 'universe') {
      state.universe.values.clear();
      readjustElements(state);
    } else if (Object.keys(state).length === 2) state.A?.values.clear();
    else {
      delete state[key];
      const values = Object.values(state).slice(1);
      keys.forEach((setKey, i) => {
        delete state[setKey];
        if (i < values.length) {
          state[setKey] = {
            ...(values[i] as SetType),
            symbol: unicode(setKey.charCodeAt(0) - 64 + 0x1d433),
          };
        } else delete state[setKey];
      });
    }
  },
  [SetsActionType.ADD_ELEMENT](state, { key, value }) {
    state.universe.values = new Set([...state.universe.values, value]);
    state[key]?.values.add(value);
  },
  [SetsActionType.REMOVE_ELEMENT](state, { key, value }) {
    state[key]?.values.delete(value);
    if (key === 'universe') readjustElements(state);
  },
  [SetsActionType.OVERRIDE](state, { key, value }) {
    state.universe.values = new Set([...state.universe.values, ...value]);
    state[key] = {
      values: value,
      symbol: (state[key] as SetType).symbol,
    };
    if (key === 'universe') readjustElements(state);
  },
  [SetsActionType.CLEAR_SET](state, { key }) {
    state[key]?.values.clear();
    if (key === 'universe') readjustElements(state);
  },
  [SetsActionType.CLEAR_SETS]() {
    return initialState;
  },
};

export default actions;
