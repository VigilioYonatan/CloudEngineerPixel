import type { UnitContentSpec } from '../../../domain/curriculum';
import { m07To09Specs } from './m07-09';
import { m10To12Specs } from './m10-12';

export const level2UnitSpecs: Record<string, UnitContentSpec> = {
  ...m07To09Specs,
  ...m10To12Specs,
};
