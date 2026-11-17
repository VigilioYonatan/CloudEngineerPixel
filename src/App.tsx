import { AppShell } from './app/AppShell';
import { CurriculumPage } from './features/curriculum/pages/CurriculumPage';
import { HomePage } from './features/home/pages/HomePage';
import { LabPage } from './features/labs/pages/LabPage';
import { LessonPage } from './features/lessons/pages/LessonPage';
import { ProgressPage } from './features/progress/pages/ProgressPage';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { SimulatorsPage } from './features/simulators/pages/SimulatorsPage';
import { view } from './lib/state';
import { SeniorWorkbench } from './SeniorWorkbench';

export function App() {
  const active_view = view.value;

  return (
    <AppShell>
      {active_view === 'home' ? (
        <HomePage />
      ) : active_view === 'learn' ? (
        <CurriculumPage />
      ) : active_view === 'lesson' ? (
        <LessonPage />
      ) : active_view === 'lab' ? (
        <LabPage />
      ) : active_view === 'simulator' ? (
        <SimulatorsPage />
      ) : active_view === 'senior' ? (
        <SeniorWorkbench />
      ) : active_view === 'progress' ? (
        <ProgressPage />
      ) : (
        <SettingsPage />
      )}
    </AppShell>
  );
}
