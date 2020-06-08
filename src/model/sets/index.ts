import unicode from '~/utils/unicode';

import { SetsOperations, SetsOperationsType } from './types';

const data: SetsOperations = {
  [SetsOperationsType.UNION]: {
    name: 'UNIÃO',
    symbol: unicode(0x222a),
    operandsAmount: 2,
  },
  [SetsOperationsType.INTERSECTION]: {
    name: 'INTERSEÇÃO',
    symbol: unicode(0x2229),
    operandsAmount: 2,
  },
  [SetsOperationsType.COMPLEMENT]: {
    name: 'COMPLEMENTAR',
    symbol: unicode(0x2201),
    operandsAmount: 1,
  },
  [SetsOperationsType.DIFFERENCE]: {
    name: 'DIFERENÇA',
    symbol: unicode(0x2212),
    operandsAmount: 2,
  },
  [SetsOperationsType.POWER_SET]: {
    name: 'CONJUNTO DAS PARTES',
    symbol: unicode(0x1d443),
    operandsAmount: 1,
  },
};

export default data;
