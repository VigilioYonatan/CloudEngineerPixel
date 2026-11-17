import type { UnitContentSpec } from '../domain/curriculum';
import { level1UnitSpecs } from './curriculum/level1/index';
import { level2UnitSpecs } from './curriculum/level2/index';
import { level3UnitSpecs } from './curriculum/level3/index';

export type QuizBankQuestion = {
  id: string;
  moduleId: string;
  unitIndex: number;
  kind: 'single' | 'snippet' | 'failure';
  prompt: string;
  choices: readonly [string, string, string];
  correct: 0 | 1 | 2;
  optionReasons: readonly [string, string, string];
};

function buildUnitQuestion(spec: UnitContentSpec): QuizBankQuestion {
  const modIdx = spec.unitIndex % 3;
  const kind: QuizBankQuestion['kind'] =
    modIdx === 0 ? 'single' : modIdx === 1 ? 'snippet' : 'failure';

  const goodChoice = spec.mentalModel;
  const badChoiceA = spec.antipattern;
  const badChoiceB = `Omitir validación previa en «${spec.title}» y aplicar cambios directos sin registro.`;

  const choicesBySlot: Record<0 | 1 | 2, readonly [string, string, string]> = {
    0: [goodChoice, badChoiceA, badChoiceB],
    1: [badChoiceA, goodChoice, badChoiceB],
    2: [badChoiceA, badChoiceB, goodChoice],
  };

  const reasonsBySlot: Record<0 | 1 | 2, readonly [string, string, string]> = {
    0: [
      `Correcto (${spec.unitCode}): ${spec.objective}`,
      `Incorrecto: ${spec.antipattern}`,
      'Incorrecto: todo cambio en producción requiere verificación y trazabilidad.',
    ],
    1: [
      `Incorrecto: ${spec.antipattern}`,
      `Correcto (${spec.unitCode}): ${spec.objective}`,
      'Incorrecto: todo cambio en producción requiere verificación y trazabilidad.',
    ],
    2: [
      `Incorrecto: ${spec.antipattern}`,
      'Incorrecto: todo cambio en producción requiere verificación y trazabilidad.',
      `Correcto (${spec.unitCode}): ${spec.objective}`,
    ],
  };

  const correct = modIdx as 0 | 1 | 2;
  return {
    id: `${spec.moduleId}:${spec.unitIndex}`,
    moduleId: spec.moduleId,
    unitIndex: spec.unitIndex,
    kind,
    prompt: `[${spec.unitCode}] Sobre «${spec.title}», ¿qué criterio refleja práctica Senior?`,
    choices: choicesBySlot[correct],
    correct,
    optionReasons: reasonsBySlot[correct],
  };
}

const allSpecs = {
  ...level1UnitSpecs,
  ...level2UnitSpecs,
  ...level3UnitSpecs,
};

export const quizBank: Record<string, QuizBankQuestion[]> = Object.values(allSpecs).reduce<
  Record<string, QuizBankQuestion[]>
>((acc, spec) => {
  if (!acc[spec.moduleId]) acc[spec.moduleId] = [];
  acc[spec.moduleId].push(buildUnitQuestion(spec));
  acc[spec.moduleId].sort((a, b) => a.unitIndex - b.unitIndex);
  return acc;
}, {});
