import { modules, type Provider } from '../../../data/course';
import type { ValidatedProgress } from '../../../lib/importValidation.mjs';

export type ProgressDimension = {
  id: string;
  label: string;
  value: number;
  total: number | null;
  detail: string;
};

export function computeSixDimensions(
  snap: ValidatedProgress,
  cloudId: Provider,
): ProgressDimension[] {
  const totalUnits = modules.reduce((sum, m) => sum + m.topics.length, 0);
  const completedTopics = snap.completed.filter(
    (k) => k.startsWith(`${cloudId}:`) && !k.endsWith(':lab'),
  ).length;
  const completedLabs = snap.completed.filter(
    (k) => k.startsWith(`${cloudId}:`) && k.endsWith(':lab'),
  ).length;

  const passedQuizzes = Object.entries(snap.quiz).filter(
    ([k, score]) => k.startsWith(`${cloudId}:`) && score >= 80,
  ).length;

  const projectCount = Object.keys(snap.notes || {}).filter(
    (k) => k.startsWith(`project-`) && snap.notes[k].length > 2,
  ).length;

  const seniorInCloud = snap.senior.filter((k) => k.startsWith(`${cloudId}:`)).length;

  return [
    {
      id: 'theory',
      label: 'Teoría / Unidades',
      value: completedTopics,
      total: totalUnits,
      detail: `Unidades leídas en ${cloudId.toUpperCase()}`,
    },
    {
      id: 'quizzes',
      label: 'Evaluaciones aprobadas',
      value: passedQuizzes,
      total: modules.length,
      detail: 'Quizzes >= 80% (conserva bestScore)',
    },
    {
      id: 'simulators',
      label: 'Simuladores practicados',
      value: snap.simRuns,
      total: null,
      detail: 'Ejecuciones en los 13 laboratorios',
    },
    {
      id: 'labs',
      label: 'Laboratorios con evidencia',
      value: completedLabs,
      total: modules.length,
      detail: `Autodeclarados en ${cloudId.toUpperCase()}`,
    },
    {
      id: 'projects',
      label: 'Proyectos integradores',
      value: Math.min(3, projectCount),
      total: 3,
      detail: 'Checklists/ADR guardados localmente',
    },
    {
      id: 'senior',
      label: 'Expedientes Senior',
      value: seniorInCloud,
      total: 18,
      detail: `Incidentes cerrados en ${cloudId.toUpperCase()}`,
    },
  ];
}
