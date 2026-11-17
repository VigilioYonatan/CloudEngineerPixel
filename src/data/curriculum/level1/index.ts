import type { UnitContentSpec } from '../../../domain/curriculum';
import { m01To03Specs } from './m01-03';
import { m04To06Specs } from './m04-06';

export const level1UnitSpecs: Record<string, UnitContentSpec> = {
  ...m01To03Specs,
  ...m04To06Specs,
};
