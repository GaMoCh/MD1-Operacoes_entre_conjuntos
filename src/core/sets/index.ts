import { SetsOperationsType } from '~/model/sets/types';

import sources from './sources';

import { SetsActions } from './types';

const actions: SetsActions = {
  [SetsOperationsType.UNION](setA, setB) {
    const source = sources[SetsOperationsType.UNION](setA, setB);
    const values = new Set([...setA.values, ...setB.values]);
    return { source, values };
  },
  [SetsOperationsType.INTERSECTION](setA, setB) {
    const source = sources[SetsOperationsType.INTERSECTION](setA, setB);
    const values = new Set([...setA.values].filter((e) => setB.values.has(e)));
    return { source, values };
  },
  [SetsOperationsType.COMPLEMENT](set, universe) {
    const source = sources[SetsOperationsType.COMPLEMENT](set);
    const values = new Set([...universe.values].filter((e) => !set.values.has(e)));
    return { source, values };
  },
  [SetsOperationsType.DIFFERENCE](setA, setB) {
    const source = sources[SetsOperationsType.DIFFERENCE](setA, setB);
    const values = new Set([...setA.values].filter((e) => !setB.values.has(e)));
    return { source, values };
  },
  [SetsOperationsType.POWER_SET](set) {
    const getAllSubsets = (elements: string[]) =>
      elements.reduce((sets, value) => sets.concat(sets.map((s) => [...s, value])), [[]] as string[][]);

    const source = sources[SetsOperationsType.POWER_SET](set);
    const values = new Set(getAllSubsets([...set.values]).map((e) => `{${e.join(', ')}}`));
    return { source, values };
  },
};

export default actions;
