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

export type RouteFormatOptions =
  | string
  | {
      resourceId?: string;
      unitIndex?: number;
      simId?: SimulatorRouteId;
      caseId?: string;
    };

export type ParsedHashRoute = {
  view: AppView;
  resourceId: string | undefined;
  unitIndex?: number;
  simId?: SimulatorRouteId;
  caseId?: string;
};

export function isAppView(value: string): value is AppView {
  return (APP_VIEWS as readonly string[]).includes(value);
}

function isSimulatorRouteId(value: string | undefined): value is SimulatorRouteId {
  return !!value && (VALID_SIMULATOR_ROUTE_IDS as readonly string[]).includes(value);
}

function parseUnitIndexSegment(segment: string | undefined): number | undefined {
  if (segment === undefined || !/^\d{1,2}$/.test(segment)) return undefined;
  return Number(segment);
}

export function parseHashRoute(raw_hash: string): ParsedHashRoute | null {
  const cleaned = raw_hash.replace(/^#\/?/, '').trim();
  if (!cleaned) {
    return { view: 'home', resourceId: undefined };
  }

  const [first, second, third] = cleaned.split('/');

  switch (first) {
    case 'home':
    case 'inicio':
      return { view: 'home', resourceId: undefined };

    case 'mapa':
    case 'map':
      return { view: 'map', resourceId: undefined };

    case 'aprender':
    case 'learn':
      return { view: 'learn', resourceId: undefined };

    case 'aula':
    case 'lesson': {
      const unit_idx = parseUnitIndexSegment(third);
      return {
        view: 'lesson',
        resourceId: second || undefined,
        ...(unit_idx !== undefined ? { unitIndex: unit_idx } : {}),
      };
    }

    case 'labs':
      return second ? { view: 'lab', resourceId: second } : { view: 'labs', resourceId: undefined };

    case 'lab':
      return second ? { view: 'lab', resourceId: second } : { view: 'labs', resourceId: undefined };

    case 'simuladores':
    case 'simulator': {
      const sim_id = isSimulatorRouteId(second) ? second : undefined;
      return {
        view: 'simulator',
        resourceId: sim_id,
        ...(sim_id ? { simId: sim_id } : {}),
      };
    }

    case 'senior': {
      const case_id =
        second && /^s(0[1-9]|1[0-8])$/i.test(second) ? second.toLowerCase() : undefined;
      return {
        view: 'senior',
        resourceId: case_id,
        ...(case_id ? { caseId: case_id } : {}),
      };
    }

    case 'proyectos':
    case 'projects':
      return { view: 'projects', resourceId: undefined };

    case 'progreso':
    case 'progress':
      return { view: 'progress', resourceId: undefined };

    case 'ajustes':
    case 'settings':
      return { view: 'settings', resourceId: undefined };

    case 'acerca':
    case 'about':
      return { view: 'about', resourceId: undefined };

    default:
      return null;
  }
}

export function formatHashRoute(target_view: AppView, options?: RouteFormatOptions): string {
  const normalized = typeof options === 'string' ? { resourceId: options } : options || {};

  switch (target_view) {
    case 'home':
      return '#/';
    case 'map':
      return '#/mapa';
    case 'learn':
      return '#/aprender';
    case 'lesson': {
      const mod_id = normalized.resourceId || 'cloud-fundamentals';
      return normalized.unitIndex !== undefined
        ? `#/aula/${mod_id}/${normalized.unitIndex}`
        : `#/aula/${mod_id}`;
    }
    case 'labs':
      return '#/labs';
    case 'lab':
      return normalized.resourceId ? `#/labs/${normalized.resourceId}` : '#/labs';
    case 'simulator': {
      const sim_id =
        normalized.simId ||
        (isSimulatorRouteId(normalized.resourceId) ? normalized.resourceId : undefined);
      return sim_id ? `#/simuladores/${sim_id}` : '#/simuladores';
    }
    case 'senior': {
      const case_id = normalized.caseId || normalized.resourceId;
      return case_id ? `#/senior/${case_id}` : '#/senior';
    }
    case 'projects':
      return '#/proyectos';
    case 'progress':
      return '#/progreso';
    case 'settings':
      return '#/ajustes';
    case 'about':
      return '#/acerca';
  }
}
