import { Suspense, lazy } from 'preact/compat';
import { AppShell } from './app/AppShell';
import { HomePage } from './features/home/pages/HomePage';
import { routeRecovery, view } from './lib/state';
import { RouteLoadingState } from './shared/ui/RouteLoadingState';
import { RouteRecoveryState } from './shared/ui/RouteRecoveryState';

const CurriculumMapPage = lazy(() =>
  import('./features/curriculum/pages/CurriculumMapPage').then((m) => ({
    default: m.CurriculumMapPage,
  })),
);
const CurriculumPage = lazy(() =>
  import('./features/curriculum/pages/CurriculumPage').then((m) => ({
    default: m.CurriculumPage,
  })),
);
const LessonPage = lazy(() =>
  import('./features/lessons/pages/LessonPage').then((m) => ({
    default: m.LessonPage,
  })),
);
const LabsCatalogPage = lazy(() =>
  import('./features/labs/pages/LabsCatalogPage').then((m) => ({
    default: m.LabsCatalogPage,
  })),
);
const LabPage = lazy(() =>
  import('./features/labs/pages/LabPage').then((m) => ({
    default: m.LabPage,
  })),
);
const ProjectsPage = lazy(() =>
  import('./features/projects/pages/ProjectsPage').then((m) => ({
    default: m.ProjectsPage,
  })),
);
const SimulatorsPage = lazy(() =>
  import('./features/simulators/pages/SimulatorsPage').then((m) => ({
    default: m.SimulatorsPage,
  })),
);
const SeniorWorkbench = lazy(() =>
  import('./SeniorWorkbench').then((m) => ({
    default: m.SeniorWorkbench,
  })),
);
const ProgressPage = lazy(() =>
  import('./features/progress/pages/ProgressPage').then((m) => ({
    default: m.ProgressPage,
  })),
);
const SettingsPage = lazy(() =>
  import('./features/settings/pages/SettingsPage').then((m) => ({
    default: m.SettingsPage,
  })),
);
const AboutPage = lazy(() =>
  import('./features/about/pages/AboutPage').then((m) => ({
    default: m.AboutPage,
  })),
);

export function App() {
  const active_view = view.value;
  const active_recovery = routeRecovery.value;

  return (
    <AppShell>
      {active_recovery ? (
        <RouteRecoveryState diagnostic={active_recovery} />
      ) : active_view === 'home' ? (
        <HomePage />
      ) : (
        <Suspense fallback={<RouteLoadingState />}>
          {active_view === 'map' ? (
            <CurriculumMapPage />
          ) : active_view === 'learn' ? (
            <CurriculumPage />
          ) : active_view === 'lesson' ? (
            <LessonPage />
          ) : active_view === 'labs' ? (
            <LabsCatalogPage />
          ) : active_view === 'projects' ? (
            <ProjectsPage />
          ) : active_view === 'lab' ? (
            <LabPage />
          ) : active_view === 'simulator' ? (
            <SimulatorsPage />
          ) : active_view === 'senior' ? (
            <SeniorWorkbench />
          ) : active_view === 'progress' ? (
            <ProgressPage />
          ) : active_view === 'about' ? (
            <AboutPage />
          ) : (
            <SettingsPage />
          )}
        </Suspense>
      )}
    </AppShell>
  );
}
