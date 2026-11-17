export const APP_VIEWS = [
  'home',
  'map',
  'learn',
  'lesson',
  'labs',
  'lab',
  'simulator',
  'senior',
  'projects',
  'progress',
  'settings',
  'about',
] as const;

export type AppView = (typeof APP_VIEWS)[number];

export const VALID_SIMULATOR_ROUTE_IDS = ['cidr', 'iam', 'scale', 'slo', 'architecture'] as const;

export type SimulatorRouteId = (typeof VALID_SIMULATOR_ROUTE_IDS)[number];

export const VALID_ABOUT_SECTIONS = [
  'metodologia',
  'seguridad-cloud',
  'privacidad',
  'no-afiliacion',
] as const;

export type AboutSectionId = (typeof VALID_ABOUT_SECTIONS)[number];

export type RouteRecoveryKind =
  | 'route'
  | 'module'
  | 'unit'
  | 'lab'
  | 'simulator'
  | 'senior'
  | 'about';

export type RouteRecoveryDiagnostic = {
  kind: RouteRecoveryKind;
  invalidValue: string;
  message: string;
  suggestedView: AppView;
  suggestedResourceId?: string;
  suggestedLabel: string;
};

export type RouteFormatOptions =
  | string
  | {
      resourceId?: string;
      unitIndex?: number;
      simId?: SimulatorRouteId;
      caseId?: string;
      aboutSection?: AboutSectionId;
    };

export type ParsedHashRoute = {
  view: AppView;
  resourceId: string | undefined;
  unitIndex?: number;
  simId?: SimulatorRouteId;
  caseId?: string;
  aboutSection?: AboutSectionId;
  routeRecovery?: RouteRecoveryDiagnostic;
};
