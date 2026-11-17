import {
  Activity,
  Boxes,
  Cloud,
  Code2,
  Database,
  Gauge,
  Layers,
  LockKeyhole,
  Network,
  RefreshCcw,
  Route,
  Server,
  ShieldCheck,
  Terminal,
  Trophy,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-preact';

const MODULE_ICONS: Readonly<Record<string, LucideIcon>> = {
  cloud: Cloud,
  network: Network,
  server: Server,
  database: Database,
  shield: ShieldCheck,
  wallet: Wallet,
  terminal: Terminal,
  route: Route,
  zap: Zap,
  boxes: Boxes,
  code: Code2,
  activity: Activity,
  layers: Layers,
  lock: LockKeyhole,
  refresh: RefreshCcw,
  gauge: Gauge,
  trophy: Trophy,
};

type ModuleIconProps = {
  name: string;
  size?: number;
  class?: string;
};

export function ModuleIcon({ name, size = 20, class: class_name }: ModuleIconProps) {
  const SelectedIcon = MODULE_ICONS[name] || Cloud;
  return <SelectedIcon size={size} class={class_name} />;
}
