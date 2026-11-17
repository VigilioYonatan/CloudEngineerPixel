import { formatHashRoute, type SimulatorRouteId } from '../../../app/router';
import {
  levelInfo,
  moduleService,
  modules,
  services,
  type Level,
  type Provider,
} from '../../../data/course';
import { challenges } from '../../../data/senior';
import {
  CURRICULUM_MODULE_META,
  type LearningModality,
} from '../constants/curriculumMap.constants';

export type CurriculumUnitLink = {
  index: number;
  title: string;
  completed: boolean;
  href: string;
};

export type CurriculumModuleMapItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  hours: number;
  icon: string;
  outcome: string;
  tags: readonly string[];
  serviceLabel: string;
  prerequisites: readonly string[];
  modalities: readonly LearningModality[];
  linkedSimulator?: SimulatorRouteId;
  labCompleted: boolean;
  completedUnits: number;
  units: readonly CurriculumUnitLink[];
};

export type CurriculumLevelStage = {
  level: Level;
  stageNumber: string;
  name: string;
  description: string;
  totalHours: number;
  completedUnits: number;
  totalUnits: number;
  modules: readonly CurriculumModuleMapItem[];
};

export type SeniorIncidentMapItem = {
  id: string;
  title: string;
  category: string;
  severity: string;
  completed: boolean;
  href: string;
};

export type CurriculumMapModel = {
  cloudId: Provider;
  completedUnitsCount: number;
  totalUnitsCount: number;
  completedSeniorCount: number;
  levels: readonly CurriculumLevelStage[];
  seniorCases: readonly SeniorIncidentMapItem[];
};

const LEVEL_ORDER: readonly Level[] = ['fundamentos', 'intermedio', 'avanzado'];

export function buildCurriculumMapModel(
  cloud_id: Provider,
  completed_keys: readonly string[],
  completed_senior_keys: readonly string[],
): CurriculumMapModel {
  const levels: CurriculumLevelStage[] = LEVEL_ORDER.map((level_id, level_idx) => {
    const level_modules = modules.filter((mod) => mod.level === level_id);
    const mapped_modules: CurriculumModuleMapItem[] = level_modules.map((mod) => {
      const global_idx = modules.indexOf(mod);
      const meta = CURRICULUM_MODULE_META[mod.id] || {
        prerequisites: ['Fundamentos Cloud'],
        modalities: ['Concepto', 'Cloud Real'] as const,
      };
      const units: CurriculumUnitLink[] = mod.topics.map((topic_title, unit_idx) => ({
        index: unit_idx,
        title: topic_title,
        completed: completed_keys.includes(`${cloud_id}:${mod.id}:${unit_idx}`),
        href: formatHashRoute('lesson', { resourceId: mod.id, unitIndex: unit_idx }),
      }));
      return {
        id: mod.id,
        number: String(global_idx + 1).padStart(2, '0'),
        title: mod.title,
        subtitle: mod.subtitle,
        hours: mod.hours,
        icon: mod.icon,
        outcome: mod.outcome,
        tags: mod.tags,
        serviceLabel: services[cloud_id][moduleService(mod.id)].label,
        prerequisites: meta.prerequisites,
        modalities: meta.modalities,
        ...(meta.linkedSimulator ? { linkedSimulator: meta.linkedSimulator } : {}),
        labCompleted: completed_keys.includes(`${cloud_id}:${mod.id}:lab`),
        completedUnits: units.filter((u) => u.completed).length,
        units,
      };
    });

    return {
      level: level_id,
      stageNumber: `0${level_idx + 1}`,
      name: levelInfo[level_id].name,
      description: levelInfo[level_id].description,
      totalHours: mapped_modules.reduce((sum, item) => sum + item.hours, 0),
      completedUnits: mapped_modules.reduce((sum, item) => sum + item.completedUnits, 0),
      totalUnits: mapped_modules.reduce((sum, item) => sum + item.units.length, 0),
      modules: mapped_modules,
    };
  });

  const senior_cases: SeniorIncidentMapItem[] = challenges.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    category: challenge.category,
    severity: challenge.severity,
    completed: completed_senior_keys.includes(`${cloud_id}:${challenge.id}`),
    href: formatHashRoute('senior', { caseId: challenge.id }),
  }));

  return {
    cloudId: cloud_id,
    completedUnitsCount: levels.reduce((sum, st) => sum + st.completedUnits, 0),
    totalUnitsCount: levels.reduce((sum, st) => sum + st.totalUnits, 0),
    completedSeniorCount: senior_cases.filter((item) => item.completed).length,
    levels,
    seniorCases: senior_cases,
  };
}
