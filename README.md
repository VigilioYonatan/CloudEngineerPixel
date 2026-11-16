# Cloud Engineering Academy — V8 (Senior Mode, DevSecOps y QA)

> **Entrega V8**: se conserva íntegra la V7, se incorpora revisión docente local opcional en Senior Mode,  controles DevSecOps sin instalación y nuevas pruebas. Sigue pendiente ejecutar Vite, TypeScript completo, Biome y Playwright con dependencias reales. No se declara producción lista ni formación de 240 horas totalmente desarrollada. Lee `docs/RELEASE_NOTES_V8.md`, `docs/DEVSECOPS_V8.md` y `docs/SENIOR_REVIEW_V8.md`.

## Verificaciones rápidas

```bash
# Con Node y TypeScript global, sin descargar dependencias
npm run verify:offline
# Con npm instalado y un package-lock generado realmente
npm install
npm run verify
npx playwright install chromium
npm run test:e2e
```

---

# Cloud Engineering Academy ☁️ — V6 (código fuente)

> **Versión V6 (Senior Mode / DevSecOps / QA).** Se conservaron todos los archivos del ZIP V5. Se añadió evaluación con citas de evidencias, reversión, intentos, pruebas de motor y E2E, CI, CodeQL, SBOM e integridad verificable. La compilación y los tests de navegador requieren una instalación npm real; en el entorno de autoría no fue posible resolver registry.npmjs.org. No se simula que estas verificaciones hayan pasado. Ver `docs/PROJECT_STATUS_V6.md`, `docs/SENIOR_MODE_V6.md` y `docs/DEVSECOPS_V6.md`.

**Aplicación frontend educativa para AWS, Azure y Google Cloud**, construida con Preact + TypeScript + Vite + Signals, inspirada en el lenguaje de diseño de GoPixel Academy y en la documentación de ingeniería Vigilio. Incluye una mascota cloud aprobada, branding dinámico por nube y Senior Mode.

## Iniciar

**Requisitos**: Node.js 20.19+ o 22.12+ y npm con acceso a registry.npmjs.org.

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`). Para compilar:

```bash
npm run typecheck
npm run build
npm run preview
npm test
```

> **Validación V6:** las pruebas puras de Node, el escaneo heurístico local, la verificación de integridad y el análisis sintáctico de TypeScript se ejecutaron. No se pudo completar la instalación npm, ni validar el build real, Biome o Playwright. Ejecuta `npm run verify` y `npm run test:e2e` con conectividad a npm.

## Incluye

- **Home** responsiva con estética tecnológica, hero, mascota, tres niveles, rutas de proveedor y CTA a Senior Mode.
- **Provider switcher en el header**, persistente y reflejado en `?cloud=aws|azure|gcp`: color de tema, mascota ilustrada, CLI, servicio, documentación, laboratorios y progreso por proveedor.
- **18 módulos** distribuidos en fundamentos (60 h), ingeniería (80 h) y arquitectura (100 h), 90 unidades curriculares, con un taller focalizado y un reto de ingeniería específico por unidad. Son ejercicios y recursos de estudio, **no 240 horas de contenidos completamente producidos**; necesitan validación de docentes y demostraciones reales antes de uso comercial.
- **18 quizzes** con corrección y explicación. Cada quiz puede repetirse en las tres rutas.
- **18 laboratorios frontend** con listas de seguridad, comandos de lectura, notas locales y declaración de finalización. No verifican cuentas cloud.
- **5 simuladores calculados localmente**: CIDR, política IAM simplificada, réplicas de capacidad y error budget SLO.
- **18 casos Senior**, con señales de incidentes, decisiones, explicación, checklist de evidencias, notas/ADR, investigaciones contextualizadas por proveedor y registro local por nube. Son simulaciones; la aplicación no acredita competencias reales.
- **Dashboard de progreso**, exportación/importación JSON, tema claro/oscuro, navegación con hash y base responsive.
- **54 guías de práctica específicas por nube** (`labs/{aws,azure,gcp}/*.md`): una por módulo y proveedor, con evidencias, rúbrica y cleanup.
- **18 cuadernos de incidentes Senior** (`labs/senior/`) y manual docente.
- **Tres laboratorios Terraform introductorios** en `labs/aws`, `labs/azure`, `labs/gcp` para redes básicas (no se ejecutan en la aplicación).

## Arquitectura

```text
src/
├── App.tsx             # Shell y páginas del producto (primera entrega)
├── styles.css          # Sistema visual responsive con tokens por proveedor
├── data/
│   ├── course.ts       # Catálogo, servicios y preguntas
│   ├── knowledge.ts    # Explicaciones conceptuales verificables por módulo
│   └── senior.ts       # 18 escenarios Senior con evidencia
└── lib/
    └── state.ts        # Señales, navegación y persistencia local
public/assets/         # Mascota original y poses alternativas
labs/                   # Terraform inicial separado por proveedor
```

Se planeó mantener el frontend estático inicialmente. Evita almacenar tokens o ejecutar Terraform directamente desde el navegador. Para sandboxes administrados se requiere un backend seguro, cuotas, IAM temporal, aislamiento y limpieza automática, fuera del alcance de esta versión.

## Flujos de uso

1. Entra a **Inicio**, selecciona AWS, Azure o GCP y observa el cambio de paleta y mascota.
2. Abre **Aprender**, filtra por nivel y entra a un módulo.
3. Consulta la teoría, la implementación por proveedor, el comando de solo lectura y la documentación oficial.
4. Contesta el quiz, marca una lección, entra al laboratorio y guarda notas.
5. Abre **Simuladores** y experimenta con valores.
6. Resuelve un caso **Senior Mode** con decisión correcta y checklist de evidencias.
7. Abre **Mi progreso** y exporta/importa JSON.

## Límites relevantes

- La autenticación a un cloud **NO** está implementada.
- No existe control remoto de recursos, consola de proveedor, sandbox multicloud gestionado ni costes cloud en vivo.
- Simulaciones IAM, capacidad y SLO son educativas, no sustituyen herramientas de evaluación oficiales.
- Los labs Terraform son ejemplos pequeños; lee `labs/README.md` antes de aplicar.
- La mascota original se mantiene para AWS y se incluyen otras ilustraciones para Azure/GCP; son variantes estilísticas, no un conjunto de personajes canónicamente idénticos.
- Se necesita crear material pedagógico de profundidad real para cada unidad y validar manualmente todos los ejemplos antes de anunciar 240 horas de enseñanza impartible.
- No ofrecemos certificaciones de proveedores ni decimos que somos socios oficiales.

## Próximas mejoras priorizadas

1. Enriquecer cada una de las 90 lecciones con teoría única, diagramas, código comprobable y evaluación asociada.
2. Separar `App.tsx` en componentes por feature, incluir Vitest y E2E Playwright con CI.
3. Añadir simuladores más profundos de rutas, policy evaluation, Kubernetes y costos reales con fuentes versionadas.
4. Crear entornos locales Docker/Kind y ampliar los labs Terraform con validadores externos seguros.
5. Auditar accesibilidad, soporte para teclado, contrastes y visual en navegadores reales.
6. Crear variantes oficiales de la mascota a partir del personaje elegido, asegurando consistencia exacta de rostro/vestuario.

## Licencias y marcas

El uso de nombres AWS, Microsoft Azure y Google Cloud aquí es descriptivo. Sus marcas pertenecen a sus respectivos propietarios. Esta academia no está afiliada ni patrocinada por esos proveedores. Revisa derechos de reproducción de los assets de usuario antes de redistribuir comercialmente.

## Diferencias de V2 frente a V1

- 90 talleres de unidad con objetivos, ejercicios, evidencias, riesgos y comparación de proveedores (`src/data/study.ts`).
- 54 guías Markdown por proveedor y 18 cuadernos de incidentes para preparar sesiones.
- Comprobación de nombres de servicios por ruta en cada módulo y pistas de proveedor dentro de Senior Mode.
- Quinto simulador: Architecture Decision Studio (evaluación didáctica, no recomendación de diseño certificada).
- 11 pruebas de estructura y contenido; `.github/workflows/quality.yml` listo para validar instalación/compilación en GitHub Actions.

### Verificación real de esta entrega
- `npm test`: **11/11 pruebas superadas**.
- Parser oficial TypeScript: **7 archivos TS/TSX sin errores de sintaxis**.
- `npm run build` y navegación E2E: **no verificadas** porque no hubo acceso a instalar dependencias de npm en este entorno.
- Las ilustraciones Azure/GCP son alternativas artísticas, no ediciones exactas de la mascota aprobada. La original se usa en la ruta AWS.

### No incluido (no debe anunciarse como terminado)
- Sandbox cloud gestionado ni despliegue real automatizado desde la web.
- Lecciones audiovisuales extensas por cada unidad, ni revisión humana de evidencias.
- Autenticación de alumnos, aulas, pagos, instructor admin, notas en servidor o certificados oficiales.
- Validación práctica de cada comando/Terraform en cuentas activas de AWS/Azure/GCP.

Es una academia frontend avanzada y reproducible con materiales prácticos, **no una plataforma SaaS operativa ni un programa de 240 horas plenamente impartido**.

## Senior Mode V3 — Expedientes investigativos

- Nueva consola con investigación de 18 casos, logs/configuraciones sintéticas, decisión técnica, informes y exportación JSON.
- Cada nube modifica el servicio contextual y los comandos didácticos.
- Nuevo historial de intentos por proveedor, compatible con progreso V1/V2.
- El indicador numérico refleja **completitud de pasos**, no dominio técnico certificado. Para acreditar competencias se requiere evaluación humana.
- Guía detallada: [`docs/SENIOR_MODE_V3.md`](docs/SENIOR_MODE_V3.md).

**Verificación disponible en este entorno:** `npm test`, pruebas sintácticas mediante compilador TypeScript global y comparación de integridad ZIP. No se logró instalar dependencias desde npm por ausencia de acceso al registro; `npm run build`, render navegador y E2E siguen sin verificación aquí.

## Senior Mode V4 — Ampliación sin borrar archivos

V4 conserva todo V3. Añade **54 cuadernos de investigación Senior diferenciados por AWS, Azure y GCP**, descarga desde cada expediente, criterios de evidencia, comandos de diagnóstico de solo lectura y una bitácora de intentos en la interfaz. La decisión seleccionada no crea un intento persistente hasta que se registra la simulación completa. Consulta [`docs/SENIOR_MODE_V4.md`](docs/SENIOR_MODE_V4.md).

La versión sigue siendo frontend educativo estático; **no** incluye sandboxes cloud reales, evaluación semántica automática ni certificación profesional. La cifra de 240 horas representa el plan curricular, no una validación de docencia impartida. La compilación y pruebas E2E deben repetirse en un entorno con dependencias npm disponibles.


## V5 — DevSecOps y revisión Senior

Se incorporan controles de importación segura, Biome progresivo, pruebas de seguridad, flujo CI de análisis, comprobación heurística de secretos, Dependabot y una rúbrica descargable para revisión docente. Ver `docs/DEVSECOPS_V5.md` y `SECURITY.md`.

---

## Cambios relevantes V6

- Senior Mode tiene un motor determinista separado en `src/lib/seniorEvaluation.mjs`, con evidencia examinada y referenciada, decisión confirmada, informe de 4 partes y reconocimiento expreso del carácter educativo.
- Se conservan las 90 unidades, 18 retos Senior, 54 cuadernos específicos por nube, mascotas y rutas de V5.
- DevSecOps y pruebas: `npm run lint` (Biome sobre `src`, `tests` y `scripts`), `npm test`, `npm run security:scan`, `npm run integrity`, `npm run test:e2e`.
- Se agregan guías DevSecOps de federación OIDC para AWS, Azure y GCP en `labs/devsecops/`.
- `docs/FILE_MANIFEST_V6.json` registra SHA-256 de todos los archivos de la V5 y el estado de cada cambio.
- **Advertencia:** el porcentaje de completitud de Senior Mode no acredita pericia técnica. Se requiere revisión docente.
- **Sin lockfile fabricado:** generar un lockfile real desde `npm install` en un equipo conectado a npm y versionarlo; a continuación reemplazar `npm install` por `npm ci` en CI.

## V7 — Senior Mode con diagnóstico y reanudación

- Cuatro etapas: **Investigar → Diagnosticar → Decidir → Informe**.
- 18 diagnósticos técnicos específicos; hipótesis defendible obligatoria antes de confirmar contención.
- Expedientes autoguardados por proveedor y caso (sin compartir progreso de evidencia entre nubes).
- Se preservan informes y avances antiguos; validación versionada de datos, límites de texto y archivo de progreso de hasta 8 MB.
- Más pruebas unitarias y dos recorridos Playwright nuevos. Ver [`docs/SENIOR_MODE_V7.md`](docs/SENIOR_MODE_V7.md) para criterios y limitaciones.

**No declares la plataforma certificada ni lista para producción antes de ejecutar `npm run verify` y `npm run test:e2e` en un equipo con dependencias instaladas.**

---

## V9 · Expedientes Senior portables y guías operativas

Esta versión incorpora 18 guías operativas de incidente y respaldo **por caso/proveedor** en el panel Senior. Entra en Senior Mode, selecciona un caso y usa **Guardar JSON del caso** o **Importar JSON del caso** en la columna de herramientas. La importación rechaza un caso o nube distintos. Los campos importados siguen siendo datos educativos sin firma y no confieren una aprobación técnica.

Comprobación previa del entorno (sin conexiones cloud):

```bash
npm run doctor
npm run verify:offline
```

Para usar Vite, Biome, los tipos y Playwright es necesario instalar paquetes reales mediante `npm install`. Si el entorno no dispone de acceso al registro npm, esos checks **no se consideran ejecutados**. Consulta `docs/VERIFICATION_V9.md`.
