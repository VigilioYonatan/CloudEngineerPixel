export const APP_VIEWS = [
  'home',
  'learn',
  'lesson',
  'lab',
  'simulator',
  'senior',
  'progress',
  'settings',
] as const;

export type AppView = (typeof APP_VIEWS)[number];

export type ParsedHashRoute = {
  view: AppView;
  resourceId: string | undefined;
};

export function isAppView(value: string): value is AppView {
  return (APP_VIEWS as readonly string[]).includes(value);
}

export function parseHashRoute(raw_hash: string): ParsedHashRoute | null {
  const cleaned = raw_hash.replace(/^#\/?/, '').trim();
  if (!cleaned) {
    return { view: 'home', resourceId: undefined };
  }
  const [view_segment, resource_segment] = cleaned.split('/');
  if (!isAppView(view_segment)) {
    return null;
  }
  return {
    view: view_segment,
    resourceId: resource_segment ? resource_segment : undefined,
  };
}

export function formatHashRoute(target_view: AppView, resource_id?: string): string {
  return resource_id ? `${target_view}/${resource_id}` : target_view;
}
