import type { Provider } from './course';
import type { CodeLanguage } from '../domain/commandRisk';

export type CodeReviewExercise = {
  caseId: string;
  provider: Provider;
  title: string;
  language: CodeLanguage;
  lines: readonly string[];
  defectLineNumbers: readonly number[];
  defectExplanation: string;
  safeLineHint: string;
  remediatedCode: string;
};

export function evaluateSelectedCodeLine(
  exercise: CodeReviewExercise,
  lineNumber: number,
): { isDefect: boolean; message: string } {
  if (exercise.defectLineNumbers.includes(lineNumber)) {
    return {
      isDefect: true,
      message: exercise.defectExplanation,
    };
  }
  return {
    isDefect: false,
    message: exercise.safeLineHint,
  };
}

export function getCodeReviewExercise(
  caseId: string,
  provider: Provider,
): CodeReviewExercise | null {
  if (caseId === 's01') {
    const resourceType =
      provider === 'aws'
        ? 'aws_db_instance'
        : provider === 'azure'
          ? 'azurerm_postgresql_flexible_server'
          : 'google_sql_database_instance';
    return {
      caseId,
      provider,
      title: `Auditoría HCL Terraform (${resourceType})`,
      language: 'hcl',
      lines: [
        `resource "${resourceType}" "orders_primary" {`,
        '  identifier          = "orders-prod-db"',
        '  storage_encrypted   = false',
        '  deletion_protection = false',
        '  backup_retention    = 7',
        '}',
      ],
      defectLineNumbers: [3, 4],
      defectExplanation:
        'Línea crítica detectada: desactivar cifrado en reposo fuerza la recreación destructiva (ForceNew) de la instancia productiva y deshabilitar deletion_protection elimina el seguro contra borrado.',
      safeLineHint:
        'Esta línea define metadatos o retención, pero no es el atributo que desencadena el reemplazo destructivo sin protección.',
      remediatedCode: [
        `resource "${resourceType}" "orders_primary" {`,
        '  identifier          = "orders-prod-db"',
        '  storage_encrypted   = true',
        '  deletion_protection = true',
        '  backup_retention    = 35',
        '  lifecycle {',
        '    prevent_destroy = true',
        '  }',
        '}',
      ].join('\n'),
    };
  }

  if (caseId === 's02') {
    const actionSample =
      provider === 'aws'
        ? 'lambda:UpdateFunctionCode'
        : provider === 'azure'
          ? 'Microsoft.Web/sites/functions/write'
          : 'cloudfunctions.functions.update';
    return {
      caseId,
      provider,
      title: `Revisión de Política de Identidad CI (${provider.toUpperCase()})`,
      language: 'json',
      lines: [
        '{',
        '  "Sid": "PipelineDeployAccess",',
        '  "Effect": "Allow",',
        '  "Action": "*",',
        '  "Resource": "*"',
        '}',
      ],
      defectLineNumbers: [4, 5],
      defectExplanation:
        'Violación de mínimo privilegio: Action "*" y Resource "*" otorgan control administrativo total al runner de CI en lugar de acotar el despliegue a la función específica.',
      safeLineHint:
        'La estructura base del statement es válida; inspecciona las líneas donde se conceden comodines globales.',
      remediatedCode: JSON.stringify(
        {
          Sid: 'PipelineLeastPrivilegeDeploy',
          Effect: 'Allow',
          Action: [actionSample],
          Resource: `arn:${provider}:serverless:prod:function:checkout-api`,
        },
        null,
        2,
      ),
    };
  }

  if (caseId === 's03') {
    return {
      caseId,
      provider,
      title: 'Inspección de Configuración con Secreto Expuesto',
      language: 'yaml',
      lines: [
        'name: sync-invoices',
        'on: [push]',
        'jobs:',
        '  sync:',
        '    runs-on: ubuntu-latest',
        '    env:',
        `      CLOUD_STATIC_CREDENTIAL: "${provider}_live_hardcoded_key_REDACTED"`,
        '    steps:',
        '      - run: ./scripts/sync.sh',
      ],
      defectLineNumbers: [7],
      defectExplanation:
        'Defecto crítico en línea 7: credencial estática incrustada en texto plano dentro del repositorio; debe revocarse de inmediato y migrarse a federación OIDC con secretos efímeros.',
      safeLineHint:
        'Esta línea forma parte del esqueleto del job; busca dónde se inyecta una credencial persistente en claro.',
      remediatedCode: [
        'permissions:',
        '  id-token: write',
        '  contents: read',
        'jobs:',
        '  sync:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        `      - name: Authenticate to ${provider.toUpperCase()} via OIDC (Keyless)`,
        '        uses: cloud-auth/oidc-login@b4ffde65f46336ab88eb53be808477a3936bae11',
      ].join('\n'),
    };
  }

  if (caseId === 's07') {
    return {
      caseId,
      provider,
      title: 'Auditoría de Deployment.yaml en CrashLoopBackOff',
      language: 'yaml',
      lines: [
        'apiVersion: apps/v1',
        'kind: Deployment',
        'spec:',
        '  template:',
        '    spec:',
        '      containers:',
        '        - name: billing-api',
        '          image: registry/billing-api@sha256:4a91f0',
        '          env:',
        '            - name: LEGACY_DB_URL',
        '              valueFrom:',
        '                secretKeyRef:',
        '                  name: billing-db-secret',
        '                  key: url',
      ],
      defectLineNumbers: [10],
      defectExplanation:
        'Causa exacta del ExitCode=1: el manifiesto inyecta LEGACY_DB_URL mientras la nueva versión del binario exige CONFIG_DATABASE_URL al arrancar.',
      safeLineHint:
        'La imagen fijada por digest y el secretKeyRef existen; revisa el nombre exacto de la variable de entorno expuesta al contenedor.',
      remediatedCode: [
        '          env:',
        '            - name: CONFIG_DATABASE_URL',
        '              valueFrom:',
        '                secretKeyRef:',
        '                  name: billing-db-secret',
        '                  key: url',
        '          startupProbe:',
        '            httpGet: { path: /healthz, port: 8080 }',
      ].join('\n'),
    };
  }

  if (caseId === 's09') {
    const publicField =
      provider === 'aws'
        ? '  "Principal": "*",'
        : provider === 'azure'
          ? '  "allowBlobPublicAccess": true,'
          : '  "members": ["allUsers"],';
    return {
      caseId,
      provider,
      title: `Política de Almacenamiento Expuesto (${provider.toUpperCase()})`,
      language: 'json',
      lines: [
        '{',
        '  "StorageResource": "prod-customer-exports",',
        '  "Effect": "Allow",',
        publicField,
        '  "AccessScope": "private/*"',
        '}',
      ],
      defectLineNumbers: [4],
      defectExplanation:
        'Exposición anónima directa: permitir Principal "*" / allUsers / allowBlobPublicAccess habilita lectura sin autenticar sobre prefijos sensibles.',
      safeLineHint:
        'Identificador de recurso; inspecciona la línea que define quién puede leer sin identidad autenticada.',
      remediatedCode: [
        '{',
        '  "StorageResource": "prod-customer-exports",',
        '  "PublicAccessPrevention": "enforced",',
        '  "AllowedPrincipal": "role/reporting-service-internal",',
        '  "Condition": { "TlsVersionMin": "1.2" }',
        '}',
      ].join('\n'),
    };
  }

  if (caseId === 's12') {
    return {
      caseId,
      provider,
      title: 'Inspección Forense de PodSpec Comprometido',
      language: 'yaml',
      lines: [
        'apiVersion: v1',
        'kind: Pod',
        'metadata:',
        '  namespace: kube-system',
        'spec:',
        '  automountServiceAccountToken: true',
        '  containers:',
        '    - name: debug-agent',
        '      securityContext:',
        '        privileged: true',
      ],
      defectLineNumbers: [6, 10],
      defectExplanation:
        'Combinación crítica de escalamiento: privileged: true entrega capacidades de root del nodo host y automountServiceAccountToken expone credenciales del clúster para movimiento lateral.',
      safeLineHint:
        'Metadatos del pod; revisa las directivas de montaje de token de cuenta de servicio y contexto de seguridad.',
      remediatedCode: [
        'spec:',
        '  automountServiceAccountToken: false',
        '  securityContext:',
        '    seccompProfile: { type: RuntimeDefault }',
        '  containers:',
        '    - name: app-worker',
        '      securityContext:',
        '        privileged: false',
        '        allowPrivilegeEscalation: false',
        '        runAsNonRoot: true',
      ].join('\n'),
    };
  }

  if (caseId === 's15') {
    return {
      caseId,
      provider,
      title: `Hardening de Cadena de Suministro CI/CD (${provider.toUpperCase()})`,
      language: 'yaml',
      lines: [
        'jobs:',
        '  deploy:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@main',
        '      - name: Deploy mutable tag with static key',
        '        env:',
        '          CLOUD_LONG_LIVED_KEY: ${{ secrets.PROD_KEY }}',
        '        run: deploy-cli --image registry/api:latest',
      ],
      defectLineNumbers: [5, 8, 9],
      defectExplanation:
        'Riesgo triple de supply chain: action referenciada por rama mutable (@main), llave estática de larga duración y despliegue de tag mutable (:latest) sin digest @sha256 ni verificación Cosign.',
      safeLineHint:
        'Cabecera estándar del workflow; inspecciona el pinneo de actions, credenciales e inmutabilidad de imagen.',
      remediatedCode: [
        'permissions:',
        '  id-token: write',
        '  contents: read',
        'jobs:',
        '  deploy:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683',
        '      - run: cosign verify registry/api@sha256:9c8e7f6a5b4d3c2e1f00',
        '      - run: deploy-cli --image registry/api@sha256:9c8e7f6a5b4d3c2e1f00',
      ].join('\n'),
    };
  }

  return null;
}
