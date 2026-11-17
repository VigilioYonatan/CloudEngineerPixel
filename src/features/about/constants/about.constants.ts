import type { AboutSectionId } from '../../../app/router';

export type AboutSectionContent = {
  id: AboutSectionId;
  shortLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  bullets: readonly string[];
};

export const ABOUT_SECTIONS: readonly AboutSectionContent[] = [
  {
    id: 'metodologia',
    shortLabel: 'Metodología',
    eyebrow: 'PEDAGOGÍA DE INGENIERÍA REAL',
    title: '1 concepto común → 3 implementaciones cloud → criterio Senior',
    lead: 'Enseñamos principios durables de sistemas distribuidos, redes, seguridad y FinOps antes de traducirlos a comandos o servicios concretos de AWS, Microsoft Azure y Google Cloud.',
    bullets: [
      'Un solo fundamento arquitectónico evita memorizar menús de consola que cambian cada trimestre.',
      'Tres traducciones explícitas (AWS, Azure y GCP) exponen tanto las equivalencias como lo que NO es idéntico entre nubes.',
      'Tres modalidades diferenciadas: simulador determinista en navegador, laboratorio local (Docker/Kind/Terraform) y guía para cuenta propia.',
      'Senior Mode entrena investigación de incidentes sintéticos con hipótesis, contención, rollback y rúbrica humana opcional.',
    ],
  },
  {
    id: 'seguridad-cloud',
    shortLabel: 'Seguridad Cloud',
    eyebrow: 'GUÍA OBLIGATORIA · CLOUD_SAFETY.MD',
    title: 'Reglas de seguridad antes de conectar una cuenta cloud real',
    lead: 'Esta aplicación web jamás solicita credenciales ni ejecuta infraestructura desde el navegador. Si decides practicar en una cuenta propia, aplica siempre estos controles:',
    bullets: [
      'Usa una cuenta, suscripción o proyecto exclusivo de capacitación; jamás producción.',
      'Activa MFA para identidades humanas y emplea permisos temporales de mínimo privilegio (OIDC / roles efímeros).',
      'Configura presupuestos y alertas de facturación antes de crear recursos; recuerda que una alerta no detiene el cobro automáticamente.',
      'Recopila únicamente evidencias anonimizadas y nunca pegues claves privadas, tokens ni archivos .tfstate en notas o repositorios.',
      'Evita exponer puertos administrativos globales (0.0.0.0/0 en SSH/RDP) o buckets de almacenamiento públicos.',
      'No ejecutes terraform apply ni terraform destroy a ciegas: inspecciona siempre el plan, el estado y las dependencias.',
      'Al finalizar cada sesión, elimina los recursos temporales y verifica posibles cargos diferidos en la consola de facturación.',
    ],
  },
  {
    id: 'privacidad',
    shortLabel: 'Privacidad',
    eyebrow: 'ALCANCE HONESTO Y DATOS LOCALES',
    title: 'Privacidad por diseño y límites explícitos de evaluación',
    lead: 'Cloud Engineering Academy funciona como SPA estática local sin servidores de seguimiento ni cuentas remotas obligatorias.',
    bullets: [
      'Tu progreso, quizzes, checklists y borradores Senior se almacenan localmente en tu navegador bajo schemaVersion 2.',
      'Puedes exportar una copia JSON portable en cualquier momento o descargar un respaldo crudo si el almacenamiento sufriera corrupción.',
      'Las puntuaciones automáticas en Senior Mode miden completitud estructural y citas de evidencia, no calidad técnica humana ni acreditación profesional.',
      'Nunca introduzcas información personal identificable (PII) ni secretos corporativos en los campos de texto libre.',
    ],
  },
  {
    id: 'no-afiliacion',
    shortLabel: 'No afiliación',
    eyebrow: 'AVISO LEGAL Y MARCAS INDEPENDIENTES',
    title: 'Independencia editorial y declaración de marcas registradas',
    lead: 'Esta plataforma es una iniciativa educativa independiente inspirada en GoPixel Academy y en los estándares de ingeniería de Vigilio.',
    bullets: [
      'Amazon Web Services (AWS), Microsoft Azure y Google Cloud Platform (GCP) son marcas registradas de sus respectivos titulares.',
      'Ninguno de dichos proveedores cloud patrocina, avala, audita ni certifica esta academia ni sus contenidos.',
      'Los comandos CLI, nombres de servicios y modelos de precios se citan con fines exclusivamente formativos y deben contrastarse siempre con la documentación oficial vigente.',
    ],
  },
];
