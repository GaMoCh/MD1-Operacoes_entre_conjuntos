export type SetsValue = Set<string>;

export interface SetType {
  symbol: string;
  source?: string;
  values: Set<string>;
}

export interface SetsState {
  universe: SetType;
  A?: SetType;
  B?: SetType;
  C?: SetType;
  D?: SetType;
  E?: SetType;
  F?: SetType;
  G?: SetType;
  H?: SetType;
  I?: SetType;
  J?: SetType;
  K?: SetType;
  L?: SetType;
  M?: SetType;
  N?: SetType;
  O?: SetType;
  P?: SetType;
  Q?: SetType;
  R?: SetType;
  S?: SetType;
  T?: SetType;
  U?: SetType;
  V?: SetType;
  W?: SetType;
  X?: SetType;
  Y?: SetType;
  Z?: SetType;
}

export enum SetsActionType {
  CREATE_SET = 'createSet',
  ADD_SET = 'addSet',
  REMOVE_SET = 'removeSet',
  ADD_ELEMENT = 'addElement',
  REMOVE_ELEMENT = 'removeElement',
  CLEAR_SET = 'clearSet',
  CLEAR_SETS = 'clearSets',
  OVERRIDE = 'override',
}

export interface SetsPayloadKey {
  key: keyof SetsState;
}

export interface SetsPayloadKeyValue extends SetsPayloadKey {
  value: string;
}

export interface SetsPayloadKeyValues extends SetsPayloadKey {
  value: SetsValue;
}

export interface SetsPayloadSourceValues {
  source: string;
  values: SetsValue;
}

export type SetsPayloads = {
  [SetsActionType.CREATE_SET]: SetsPayloadSourceValues;
  [SetsActionType.REMOVE_SET]: SetsPayloadKey;
  [SetsActionType.ADD_ELEMENT]: SetsPayloadKeyValue;
  [SetsActionType.REMOVE_ELEMENT]: SetsPayloadKeyValue;
  [SetsActionType.OVERRIDE]: SetsPayloadKeyValues;
  [SetsActionType.CLEAR_SET]: SetsPayloadKey;
};
