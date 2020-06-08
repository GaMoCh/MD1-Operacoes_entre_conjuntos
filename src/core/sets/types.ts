import { Set, SimpleSet, SetsOperationsType } from '~/model/sets/types';

export interface SetsSources {
  [SetsOperationsType.UNION](setA: SimpleSet, setB: SimpleSet): string;
  [SetsOperationsType.INTERSECTION](setA: SimpleSet, setB: SimpleSet): string;
  [SetsOperationsType.COMPLEMENT](set: SimpleSet): string;
  [SetsOperationsType.DIFFERENCE](setA: SimpleSet, setB: SimpleSet): string;
  [SetsOperationsType.POWER_SET](set: SimpleSet): string;
}

export interface SetsActions {
  [SetsOperationsType.UNION](setA: SimpleSet, setB: SimpleSet): Set;
  [SetsOperationsType.INTERSECTION](setA: SimpleSet, setB: SimpleSet): Set;
  [SetsOperationsType.COMPLEMENT](set: SimpleSet, universe: SimpleSet): Set;
  [SetsOperationsType.DIFFERENCE](setA: SimpleSet, setB: SimpleSet): Set;
  [SetsOperationsType.POWER_SET](set: SimpleSet): Set;
}
