import type { UnitContentSpec } from '../../../domain/curriculum';
import { m13To15Specs } from './m13-15';
import { m16To18Specs } from './m16-18';

export const level3UnitSpecs: Record<string, UnitContentSpec> = {
  ...m13To15Specs,
  ...m16To18Specs,
};
