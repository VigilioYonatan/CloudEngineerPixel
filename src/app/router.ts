import { modules } from '../data/course';
import {
  APP_VIEWS,
  VALID_ABOUT_SECTIONS,
  VALID_SIMULATOR_ROUTE_IDS,
  type AboutSectionId,
  type AppView,
  type ParsedHashRoute,
  type RouteFormatOptions,
  type RouteRecoveryDiagnostic,
  type SimulatorRouteId,
} from './router.types';

export * from './router.types';

const MODULE_MAP = new Map(modules.map((mod) => [mod.id, mod]));

export function isAppView(value: string): value is AppView {
  return (APP_VIEWS as readonly string[]).includes(value);
}

function isSimulatorRouteId(value: string | undefined): value is SimulatorRouteId {
  return !!value && (VALID_SIMULATOR_ROUTE_IDS as readonly string[]).includes(value);
}

function isAboutSectionId(value: string | undefined): value is AboutSectionId {
  return !!value && (VALID_ABOUT_SECTIONS as readonly string[]).includes(value);
}

function buildRecovery(
  kind: RouteRecoveryDiagnostic['kind'],
  invalidValue: string,
  message: string,
  suggestedView: AppView,
  suggestedLabel: string,
  suggestedResourceId?: string,
): RouteRecoveryDiagnostic {
  return {
    kind,
    invalidValue,
    message,
    suggestedView,
    suggestedLabel,
    ...(suggestedResourceId ? { suggestedResourceId } : {}),
  };
}

export function parseHashRoute(raw_hash: string): ParsedHashRoute {
  const cleaned = raw_hash.replace(/^#\/?/, '').trim();
  if (!cleaned) return { view: 'home', resourceId: undefined };

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
      const mod = second ? MODULE_MAP.get(second) : undefined;
      if (!second || !mod) {
        return {
          view: 'lesson',
          resourceId: undefined,
          routeRecovery: buildRecovery(
            'module',
            second || cleaned,
            'El módulo solicitado no existe en el plan curricular de 18 módulos.',
            'learn',
            'Ir al catálogo de módulos',
          ),
        };
      }
      if (third !== undefined && third !== '') {
        if (!/^\d{1,2}$/.test(third) || Number(third) >= mod.topics.length) {
          return {
            view: 'lesson',
            resourceId: second,
            routeRecovery: buildRecovery(
              'unit',
              `${second}/${third}`,
              `La unidad indicada está fuera del rango válido (0 a ${mod.topics.length - 1}) para ${mod.title}.`,
              'lesson',
              'Abrir primera unidad del módulo',
              second,
            ),
          };
        }
        return { view: 'lesson', resourceId: second, unitIndex: Number(third) };
      }
      return { view: 'lesson', resourceId: second };
    }

    case 'labs':
    case 'lab': {
      if (!second) return { view: 'labs', resourceId: undefined };
      if (!MODULE_MAP.has(second)) {
        return {
          view: 'lab',
          resourceId: undefined,
          routeRecovery: buildRecovery(
            'lab',
            second,
            'El laboratorio solicitado no corresponde a ningún módulo registrado.',
            'labs',
            'Ir al catálogo de laboratorios',
          ),
        };
      }
      return { view: 'lab', resourceId: second };
    }

    case 'simuladores':
    case 'simulator': {
      if (!second) return { view: 'simulator', resourceId: undefined };
      if (!isSimulatorRouteId(second)) {
        return {
          view: 'simulator',
          resourceId: undefined,
          simId: undefined,
          routeRecovery: buildRecovery(
            'simulator',
            second,
            'Ese motor de simulación no existe en el laboratorio interactivo.',
            'simulator',
            'Abrir simuladores disponibles',
          ),
        };
      }
      return { view: 'simulator', resourceId: second, simId: second };
    }

    case 'senior': {
      if (!second) return { view: 'senior', resourceId: undefined };
      if (!/^s(0[1-9]|1[0-8])$/i.test(second)) {
        return {
          view: 'senior',
          resourceId: undefined,
          caseId: undefined,
          routeRecovery: buildRecovery(
            'senior',
            second,
            'El expediente Senior indicado no existe (rango válido: S01 a S18).',
            'senior',
            'Volver al catálogo Senior Mode',
          ),
        };
      }
      const case_id = second.toLowerCase();
      return { view: 'senior', resourceId: case_id, caseId: case_id };
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
    case 'about': {
      if (!second) return { view: 'about', resourceId: undefined };
      if (!isAboutSectionId(second)) {
        return {
          view: 'about',
          resourceId: undefined,
          routeRecovery: buildRecovery(
            'about',
            second,
            'La sección informativa solicitada no existe en Acerca de la academia.',
            'about',
            'Abrir página Acerca completa',
          ),
        };
      }
      return { view: 'about', resourceId: second, aboutSection: second };
    }

    default:
      return {
        view: 'home',
        resourceId: undefined,
        routeRecovery: buildRecovery(
          'route',
          cleaned,
          'La dirección solicitada no corresponde a ninguna vista de la academia.',
          'home',
          'Ir al inicio',
        ),
      };
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
    case 'about': {
      const sec =
        normalized.aboutSection ||
        (isAboutSectionId(normalized.resourceId) ? normalized.resourceId : undefined);
      return sec ? `#/acerca/${sec}` : '#/acerca';
    }
  }
}
