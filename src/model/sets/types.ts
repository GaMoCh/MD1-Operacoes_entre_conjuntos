import { SetsValue } from '~/contexts/Sets/types';

export interface Set {
  source: string;
  values: SetsValue;
}

export interface SimpleSet {
  symbol: string;
  values: SetsValue;
}

export interface SetDataType {
  name: string;
  symbol: string;
  operandsAmount: 1 | 2;
}

export enum SetsOperationsType {
  UNION = 'union',
  INTERSECTION = 'intersection',
  COMPLEMENT = 'complement',
  DIFFERENCE = 'difference',
  POWER_SET = 'powerSet',
}

export type SetsOperations = {
  [type in SetsOperationsType]: SetDataType;
};
