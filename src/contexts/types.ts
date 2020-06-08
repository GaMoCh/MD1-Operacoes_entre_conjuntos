import { Draft } from 'immer';

export interface PayloadRelationship<P extends Record<string, P[string]>> {
  [type: string]: P[string];
}

export interface ActionWithoutPayload<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P extends PayloadRelationship<P>>
  extends ActionWithoutPayload<T> {
  payload: P[T];
}

export type Action<T extends string, P extends PayloadRelationship<P>> = T extends keyof P
  ? ActionWithPayload<T, P>
  : ActionWithoutPayload<T>;

export type ActionMethods<S, T extends string, P extends PayloadRelationship<P>> = keyof P extends T
  ? { [K in keyof P]: (state: Draft<S>, payload: P[K]) => void | S } &
      { [K in Exclude<T, keyof P>]: (state: Draft<S>) => void | S }
  : never;
