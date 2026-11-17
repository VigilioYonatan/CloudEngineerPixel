import { providers, type Provider } from '../data/course';

export const CLOUD_PROVIDER_IDS = ['aws', 'azure', 'gcp'] as const;

export type CloudProviderId = Provider;

export type CloudProviderThemes = {
  darkAccent: string;
  lightAccentText: string;
  surfaceTint: string;
};

export type CloudProviderMascot = {
  default: string;
  senior: string;
  poses: string;
  transparentDefault: string;
  transparentSenior: string;
  transparentPoses: string;
  alt: string;
  seniorAlt: string;
};

export type CloudCidrReservation = {
  reservedCount: number;
  firstUsableOffset: number;
  notes: string;
};

export type CloudProviderMetadata = {
  id: CloudProviderId;
  name: string;
  short: string;
  badgeMark: 'aws' | 'A' | 'G';
  selectorOptionLabel: string;
  tagline: string;
  consoleName: string;
  cliBinary: 'aws' | 'az' | 'gcloud';
  docsUrl: string;
  pricingUrl: string;
  freeTierUrl: string;
  wellArchitectedName: string;
  themes: CloudProviderThemes;
  mascot: CloudProviderMascot;
  cidrReservation: CloudCidrReservation;
};

export const PROVIDER_REGISTRY: Readonly<Record<CloudProviderId, CloudProviderMetadata>> = {
  aws: {
    id: 'aws',
    name: providers.aws.name,
    short: providers.aws.short,
    badgeMark: 'aws',
    selectorOptionLabel: '☁ AWS',
    tagline: providers.aws.tagline,
    consoleName: providers.aws.console,
    cliBinary: 'aws',
    docsUrl: providers.aws.docs,
    pricingUrl: 'https://aws.amazon.com/pricing/',
    freeTierUrl: 'https://aws.amazon.com/free/',
    wellArchitectedName: 'AWS Well-Architected Framework',
    themes: {
      darkAccent: providers.aws.accent,
      lightAccentText: '#b45309',
      surfaceTint: 'rgba(255, 153, 0, 0.14)',
    },
    mascot: {
      default: providers.aws.mascot,
      senior: '/assets/cloud-mentor-senior.png',
      poses: '/assets/cloud-mentor-poses.png',
      transparentDefault: '/assets/transparent/cloud-mentor-aws.png',
      transparentSenior: '/assets/transparent/cloud-mentor-senior.png',
      transparentPoses: '/assets/transparent/cloud-mentor-poses.png',
      alt: `Mentor Cloud en modo ${providers.aws.name}`,
      seniorAlt: `Mentor cloud ${providers.aws.short} experto`,
    },
    cidrReservation: {
      reservedCount: 5,
      firstUsableOffset: 4,
      notes:
        'AWS VPC reserva 5 direcciones por subred (.0 red, .1 router VPC, .2 DNS, .3 uso futuro y broadcast).',
    },
  },
  azure: {
    id: 'azure',
    name: providers.azure.name,
    short: providers.azure.short,
    badgeMark: 'A',
    selectorOptionLabel: '☁ AZURE',
    tagline: providers.azure.tagline,
    consoleName: providers.azure.console,
    cliBinary: 'az',
    docsUrl: providers.azure.docs,
    pricingUrl: 'https://azure.microsoft.com/pricing/calculator/',
    freeTierUrl: 'https://azure.microsoft.com/free/',
    wellArchitectedName: 'Microsoft Azure Well-Architected Framework',
    themes: {
      darkAccent: providers.azure.accent,
      lightAccentText: '#0369a1',
      surfaceTint: 'rgba(50, 169, 244, 0.14)',
    },
    mascot: {
      default: providers.azure.mascot,
      senior: '/assets/cloud-mentor-senior.png',
      poses: '/assets/cloud-mentor-poses.png',
      transparentDefault: '/assets/transparent/cloud-mentor-azure.png',
      transparentSenior: '/assets/transparent/cloud-mentor-senior.png',
      transparentPoses: '/assets/transparent/cloud-mentor-poses.png',
      alt: `Mentor Cloud en modo ${providers.azure.name}`,
      seniorAlt: `Mentor cloud ${providers.azure.short} experto`,
    },
    cidrReservation: {
      reservedCount: 5,
      firstUsableOffset: 4,
      notes:
        'Azure VNet reserva 5 direcciones por subred (.0 red, .1 default gateway, .2/.3 Azure DNS y broadcast).',
    },
  },
  gcp: {
    id: 'gcp',
    name: providers.gcp.name,
    short: providers.gcp.short,
    badgeMark: 'G',
    selectorOptionLabel: '☁ GOOGLE CLOUD',
    tagline: providers.gcp.tagline,
    consoleName: providers.gcp.console,
    cliBinary: 'gcloud',
    docsUrl: providers.gcp.docs,
    pricingUrl: 'https://cloud.google.com/pricing/list',
    freeTierUrl: 'https://cloud.google.com/free',
    wellArchitectedName: 'Google Cloud Architecture Framework',
    themes: {
      darkAccent: providers.gcp.accent,
      lightAccentText: '#15803d',
      surfaceTint: 'rgba(52, 168, 83, 0.14)',
    },
    mascot: {
      default: providers.gcp.mascot,
      senior: '/assets/cloud-mentor-senior.png',
      poses: '/assets/cloud-mentor-poses.png',
      transparentDefault: '/assets/transparent/cloud-mentor-gcp.png',
      transparentSenior: '/assets/transparent/cloud-mentor-senior.png',
      transparentPoses: '/assets/transparent/cloud-mentor-poses.png',
      alt: `Mentor Cloud en modo ${providers.gcp.name}`,
      seniorAlt: `Mentor cloud ${providers.gcp.short} experto`,
    },
    cidrReservation: {
      reservedCount: 4,
      firstUsableOffset: 2,
      notes:
        'Google Cloud VPC reserva 4 direcciones por rango primario (.0 red, .1 gateway, penúltima y broadcast).',
    },
  },
};

export function isCloudProviderId(value: unknown): value is CloudProviderId {
  return value === 'aws' || value === 'azure' || value === 'gcp';
}

export function getProviderMeta(provider_id: CloudProviderId): CloudProviderMetadata {
  return PROVIDER_REGISTRY[provider_id];
}
