import React from 'react';

import { enableMapSet } from 'immer';
import { useImmerReducer, Reducer } from 'use-immer';

import { Action, ActionMethods, ActionWithPayload, PayloadRelationship } from './types';

enableMapSet();

export default function makeContext<S, T extends string, P extends PayloadRelationship<P> = {}>(
  initialState: S,
  actions: ActionMethods<S, T, P>,
) {
  const StateContext = React.createContext<S | undefined>(undefined);
  const DispatchContext = React.createContext<React.Dispatch<Action<T, P>> | undefined>(undefined);

  const reducer: Reducer<S, Action<T, P>> = (state, action) => {
    const { type } = action;
    const reducerAction = actions[type];

    if (reducerAction === undefined) throw new Error(`Unhandled action type: ${type}`);
    return reducerAction(state, (action as ActionWithPayload<T, P>).payload);
  };

  const ContextProvider = ({ children }: Partial<React.ProviderProps<S>>) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useState = () => {
    const context = React.useContext(StateContext);
    if (context === undefined) throw new Error('State context not found');
    return context;
  };

  const useDispatch = () => {
    const context = React.useContext(DispatchContext);
    if (context === undefined) throw new Error('Dispatch context not found');
    return context;
  };

  return [ContextProvider, useState, useDispatch] as const;
}
