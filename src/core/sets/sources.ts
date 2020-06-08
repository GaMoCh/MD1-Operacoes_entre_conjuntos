import operations from '~/model/sets';
import { SetsOperationsType } from '~/model/sets/types';

import { SetsSources } from './types';

function operationSymbol(operationType: SetsOperationsType) {
  return operations[operationType].symbol;
}

const sources: SetsSources = {
  [SetsOperationsType.UNION]({ symbol: symbolA }, { symbol: symbolB }) {
    return `${symbolA} ${operationSymbol(SetsOperationsType.UNION)} ${symbolB}`;
  },
  [SetsOperationsType.INTERSECTION]({ symbol: symbolA }, { symbol: symbolB }) {
    return `${symbolA} ${operationSymbol(SetsOperationsType.INTERSECTION)} ${symbolB}`;
  },
  [SetsOperationsType.COMPLEMENT]({ symbol }) {
    return `${operationSymbol(SetsOperationsType.COMPLEMENT)} ${symbol}`;
  },
  [SetsOperationsType.DIFFERENCE]({ symbol: symbolA }, { symbol: symbolB }) {
    return `${symbolA} ${operationSymbol(SetsOperationsType.DIFFERENCE)} ${symbolB}`;
  },
  [SetsOperationsType.POWER_SET]({ symbol }) {
    return `${operationSymbol(SetsOperationsType.POWER_SET)}(${symbol})`;
  },
};

export default sources;
