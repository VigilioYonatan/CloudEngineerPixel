# CLOUD ENGINEERING ACADEMY — MASTER SPEC

> **Documento maestro de producto, diseño UI/UX, arquitectura técnica, currículo y ejecución.**  
> **Versión:** 1.0 · **Fecha:** 11 de noviembre de 2026 · **Estado:** Especificación, **NO** aplicación implementada.  
> **Inspiración de interfaz:** GoPixel Academy, a partir del ZIP `screenshots(1).zip`.  
> **Estándares de ingeniería:** documentación `vigilio-docs` y catálogo `skills` suministrados por el propietario.  
> **Mascota oficial elegida:** la imagen exacta aprobada por el propietario, incluida como [`assets/cloud-mentor-reference.jpeg`](assets/cloud-mentor-reference.jpeg).  
> **Propósito:** construir una academia **Cloud Engineering multicloud** de básico a avanzado con laboratorio Senior y elección de **AWS / Azure / Google Cloud**.

![Mascota oficial aprobada: nube ingeniera con lentes, headset, equipo táctico y panel holográfico](assets/cloud-mentor-reference.jpeg)

---

## 0. Reglas de interpretación y decisiones congeladas

**Este documento es el contrato de implementación**, no evidencia de que todas sus funciones existan. Distinguir `REFERENCIA` (observado en GoPixel), `PROPUESTA` (diseño nuevo), `MVP` (se implementa primero) y `POSTERIOR` (solo cuando se justifique).

1. **Mismo lenguaje visual que GoPixel, identidad Cloud propia.** Copiar las reglas de composición, ritmo, layout, navegación, niveles, microinteracciones y experiencia; no sustituir arbitrariamente todo el diseño. No presentar la academia como curso de Go ni reutilizar sin revisar marcas/licencias de terceros.
2. **Una SPA, un currículo conceptual y tres rutas de proveedor.** El selector AWS/Azure/GCP debe estar siempre accesible en el header. No crear tres apps clonadas.
3. **Mascota aprobada sin rediseño accidental.** La imagen incluida determina rostro, lentes rectangulares, cejas, auricular, equipo azul marino, colores de borde, proporciones y estilo ilustrado. Para otras poses, preservar esas características. No reemplazarla por la variante graduada, casco amarillo o robot sin lentes.
4. **Cloud Engineering completo** significa fundamentos, infraestructura, administración, redes, IAM, Linux, IaC, automatización, contenedores, Kubernetes, serverless, CI/CD, observabilidad, seguridad, FinOps, resiliencia, SRE y arquitectura de soluciones. No limitarlo a pantallas de consola AWS.
5. **Sin falsos laboratorios.** Distinguir simulador (navegador), ejercicio local (Docker/Kind/Terraform) y ejercicio real (cuenta cloud con facturación posible). No etiquetar comprobaciones de texto como despliegue verdadero.
6. **MVP sin backend ni autenticación obligatoria**, al igual que GoPixel; preservar progreso local con exportación/importación. Backend solo para colaboración, verificación remota, sandboxes gestionados o certificados comprobables.
7. **Senior Mode no equivale a una certificación profesional automática.** Exige incidentes, evidencias, análisis de riesgos, decisiones y criterios mensurables; no solo checkboxes.
8. **Evitar sobreingeniería.** Preact, TypeScript, Vite, Signals, CSS tokens, contenidos tipados, tests. No instalar microfrontends, Redux, Kubernetes de hosting ni NestJS en la fase estática.
9. **Seguridad y costos como default.** Ninguna credencial en frontend, repositorio, capturas ni analíticas. Toda práctica con recursos reales indica región, permisos, límites, posibles costos y eliminación verificable.
10. **Paridad de experiencia no implica equivalencia de servicios.** Cada nube tiene reglas propias. Explicación común y adaptadores técnicos revisados independientemente.

### 0.1 Alcance del documento

Incluye: concepto de producto, diseño exacto, header interactivo, selección de proveedor, design tokens, mascota, rutas, pantallas, arquitectura del código, contratos TypeScript, progreso, currículo de 240 horas, matriz AWS/Azure/GCP, simuladores, juegos, Senior Mode (18 desafíos), laboratorios, seguridad, testing, accesibilidad, contenido, CI/CD, fases, estimación de alcance y criterios de aceptación. El tiempo de implementación dependerá del equipo, del nivel de detalle de los materiales y de las validaciones cloud; no tratar la carga docente como esfuerzo de desarrollo.

### 0.2 Fuentes internas consultadas

- `screenshots/README.md`: funcionalidades, Preact/Vite, idioma, temas, progresión, retos, laboratorios nativos.
- `screenshots/docs/design/UI_UX_ESPECIFICACION_PREVIA.md`, `ASSETS_Y_PALETA.md`, `COMPONENTES_UI.md`: composición, elementos de header, paleta, estados, a11y, portada, sidebar, lección, Senior.
- `screenshots/docs/architecture/ARQUITECTURA_VIGILIO_BASE.md`, `VIGILIO_ALIGNMENT_V6.md`, `LIMITES_RUNTIME_GO.md`: SPA modular, refactor del shell, límites del runtime educativo.
- `screenshots/docs/content/CURRICULUM_MANIFEST.md`, `screenshots/docs/senior/COMPETENCY_MODEL_V6.md`: diferencia entre módulos programados y prácticas efectivamente completas, evidencia pedagógica.
- `vigilio-docs`: normas de frontend Preact, NestJS para fase eventual, infraestructura Terraform, topologías de plataforma, seguridad, laboratorios locales, DevSecOps, SRE, FinOps y observabilidad.
- `skills`: skills de web-MFE, UI design system, pruebas, Terraform, AWS platform, operaciones y seguridad. Detectada menor cobertura específica de Azure/GCP, que debe ampliarse.
- `Cloud_Engineering_Academy_Blueprint.md`: primera propuesta técnica consolidada. Este documento profundiza la especificación de producto y ejecución.

---

# 1. Visión, usuarios y propuesta de valor

## 1.1 Visión

**Cloud Engineering Academy** es la versión de formación cloud del concepto GoPixel: una experiencia técnica amigable y visual, pero exigente, donde un alumno puede aprender el fundamento una vez y elegir su implementación en AWS, Microsoft Azure o Google Cloud, después defender decisiones de ingeniería ante escenarios de producción.

**Promesa honesta:** «De los fundamentos cloud a operar, automatizar y diseñar sistemas reales: teoría clara, simuladores, laboratorios reproducibles y práctica de decisiones profesionales».

**No prometer:** «ingeniero senior garantizado», «certificado oficial de AWS», «los tres clouds son idénticos», «laboratorios gratuitos» o «la SPA ejecuta Terraform en los servidores del proveedor».

## 1.2 Personas

| Perfil | Necesidad | Camino |
|---|---|---|
| Principiante en cloud | Entender Linux, redes, recursos y costos | Básico, simulación sin cuenta |
| Desarrollador backend/frontend | Aprender despliegue, IAM, datos, serverless y CI/CD | Básico acelerado → intermedio |
| DevOps / Sysadmin | Terraform, contenedores, clusters, monitoreo, redes | Intermedio → avanzado |
| Ingeniero cloud | Arquitectura, incidentes, gobernanza, SLO, FinOps | Avanzado + Senior Mode |
| Instructor / revisor | Evaluar comprensión y entregar actividades repetibles | Guías, rúbricas, laboratorio versionado |

## 1.3 Objetivos pedagógicos observables

Al terminar, el estudiante debería poder **explicar** conceptos, **construir** infraestructura de ejemplo, **demostrar** uso seguro de herramientas, **verificar** un despliegue, **documentar** decisiones y **eliminar** recursos correctamente. La práctica real se completa en el proveedor elegido; los otros dos se conocen mediante comparación y laboratorios puntuales.

---

# 2. ADN visual: «GoPixel adaptado a Cloud»

## 2.1 Lo que se conserva fielmente

- Layout de producto moderno con estética tecnológica y acentos pixel (regla **80% UI moderna / 20% arte pixel**).
- Hero destacado en portada; mascota prominente, título, subtítulo, botón **START / CONTINUAR** y CTA secundaria «Explorar rutas».
- Header fijo/consistente con navegación a secciones, selector de tema, idiomas y acceso visible a **Senior Mode**.
- Tarjetas de rutas por nivel; indicadores de progreso; tarjetas de módulos identificables; sidebar en catálogo y aula.
- Dark y Light con jerarquía idéntica; Senior añade acento dorado, **no** sustituye el tema completo.
- Experiencia con mini-retos y minijuegos, simulaciones visuales, microanimaciones discretas, badges por competencias.
- Progreso local silencioso, continuar desde el último punto y opciones de exportar/importar.
- Tono cercano, técnico, no infantilizante: mascota simpática pero ejercicios exigentes.

## 2.2 Lo que cambia para Cloud

| GoPixel original | Cloud Engineering Academy |
|---|---|
| Mascota Go Gopher | **Mascota de nube ingeniera aprobada** |
| Color primario Go `#00ADD8` | Azul Cloud `#38BDF8` / acción `#0EA5E9` (tokens ajustables) |
| Módulos de lenguaje Go | 18 módulos del programa cloud, con unidades y lecciones reales |
| Editor Go | Consola didáctica cloud, ejemplos Terraform / YAML / Bash, diseñador de redes |
| Simulador de concurrencia | Simulador de VPC, IAM, escalado, HA, Kubernetes, costos e incidentes |
| Retos de código Go | Revisión de Terraform, políticas IAM, Kubernetes YAML, SLO, incidentes y ADR |
| Gopher y pixel badges | Nube mentora, insignias Cloud y acentos pixel en iconografía secundaria |
| Selector idioma/tema | **Selector cloud permanente**, idioma, tema y Senior Mode |

**No cambiar:** estructura reconocible del header/hero/cards/layout, tamaños relativos ni densidad de información sin una razón documentada. Primero recrear composición; luego sustituir contenido y elementos de marca.

## 2.3 Paleta y tokens propuestos

Partir de los tokens GoPixel y renombrar de forma semántica. **Dark por defecto** para material visual de referencia, con tema Light igualmente completo.

| Token | Dark | Light | Uso |
|---|---|---|---|
| `--bg` | `#081523` | `#F0F8FC` | Fondo general |
| `--surface` | `#102236` | `#FFFFFF` | Cards principales |
| `--surface-raised` | `#142B40` | `#ECF7FD` | Editor, menús, modales |
| `--text` | `#EDF8FF` | `#102638` | Texto principal |
| `--text-muted` | `#9CB4C5` | `#516477` | Apoyo, metadatos |
| `--primary` | `#38BDF8` | `#0369A1` | UI Cloud neutral |
| `--primary-strong` | `#0EA5E9` | `#075985` | Acción primaria |
| `--senior` | `#F7C55C` | `#A16207` | Acentos de Senior |
| `--success` | `#38CF9D` | `#047857` | Validado |
| `--danger` | `#FF687E` | `#BE123C` | Error / riesgo |
| `--warning` | `#FBBF24` | `#92400E` | Atención |
| `--border` | `#24435A` | `#CADCE6` | Separadores |

Los colores de proveedor son **identificación secundaria**, no sustituyen accesibilidad ni cambian la estructura: AWS naranja suave; Azure azul profundo; GCP mezcla cromática limitada en ilustraciones/logo. UI neutral, evitar tricolor agresivo y fragmentación visual.

Ejemplo:

```css
:root[data-theme='dark'] {
  --bg: #081523;
  --surface: #102236;
  --surface-raised: #142B40;
  --text: #EDF8FF;
  --text-muted: #9CB4C5;
  --primary: #38BDF8;
  --senior: #F7C55C;
  --border: #24435A;
}
:root[data-theme='light'] {
  --bg: #F0F8FC;
  --surface: #FFFFFF;
  --surface-raised: #ECF7FD;
  --text: #102638;
  --text-muted: #516477;
  --primary: #0369A1;
  --senior: #A16207;
  --border: #CADCE6;
}
```

Tipografía de cuerpo: interfaz sans legible; monospace solo código/comandos; pixel font solamente títulos pequeños o badges. Espaciado base 4/8 px, grid de 12 columnas desktop, cards con radios moderados, botones con hit-area de al menos 44×44 px. Reservar alturas y evitar saltos al cargar assets.

## 2.4 Componentes visuales imprescindibles

- `AppShell`, `AppHeader`, `AppFooter`, `MainNav`, `CloudProviderSwitcher`, `ThemeSwitcher`, `LanguageSwitcher`, `SeniorModeToggle`.
- `HeroCloud`, `MascotPose`, `QuickStats`, `ContinueLearning`, `LearningPathCard`, `CourseMap`, `ModuleCard`, `ModuleSidebar`.
- `LessonHeading`, `ConceptExplainer`, `ProviderImplementation`, `CloudServiceComparison`, `CodePanel`, `CopyCommand`, `ArchitectureDiagram`, `KnowledgeCheck`.
- `LabModeSwitch`, `SimulationCanvas`, `TerminalTranscript`, `TaskChecklist`, `EvidencePanel`, `CleanupChecklist`, `CostNotice`.
- `SeniorChallengeCard`, `ProductionBrief`, `EvidenceLab`, `DecisionLab`, `IncidentTimeline`, `ADRForm`, `RubricResult`.
- `ProgressDashboard`, `AchievementBadge`, `ImportExportPanel`, `SettingsPanel`.

Cada componente necesita estados: idle, hover, focus-visible, disabled, loading, error y success cuando corresponda; no agregar botones vacíos o links sin destino.

---

# 3. Mascota oficial: Cloud Mentor

## 3.1 Diseño aprobado y fuente única

La mascota **es EXACTAMENTE la del archivo** `assets/cloud-mentor-reference.jpeg` (imagen enviada por el propietario). Identidad visual:

- Cabeza blanca en forma de nube, contorno con azul, naranja, verde y otros acentos multicloud.
- **Lentes rectangulares oscuros**, cejas negras expresivas, mirada segura, sonrisa ligera.
- Auricular de ingeniería con icono cloud luminoso.
- Chaleco táctico azul marino/negro, correas y bolsillos naranjas, guantes y botas robustas.
- Parches AWS / Azure / GCP (verificar permisos de uso de marcas en piezas comerciales).
- Escudo de seguridad dorado, blueprint enrollado y panel holográfico cian de infraestructura.
- Dibujo digital ilustrado tipo vector/chibi con bordes oscuros, brillo controlado y fondo limpio.

**No usar** como mascota principal otras imágenes generadas luego con gorro de graduación/capa ni un robot azul sin lentes: son otras exploraciones, no la referencia seleccionada.

## 3.2 Usos y 15 poses de producto

| Pose | Escena | Ubicación/propósito |
|---|---|---|
| 01 Hero | Señala al usuario; tablet muestra arquitectura | Home |
| 02 Bienvenida | Saluda con la mano | Onboarding |
| 03 Pulgar arriba | Guiño, logro conseguido | Quiz correcto |
| 04 Pensando | Mano en barbilla, signo de interrogación | Pistas, tradeoffs |
| 05 Explicando | Mano abierta, diagrama de VPC | Aula |
| 06 Programando | En laptop con Terraform/HCL | IaC y CLI |
| 07 Arquitecto | Puntero frente a diagrama cloud | Avanzado |
| 08 Multicloud | Tarjetas AWS/Azure/GCP alrededor | Switcher/comparación |
| 09 CI/CD | Pipeline y despliegue | DevOps |
| 10 Observabilidad | Panel de métricas y logs | Monitoreo |
| 11 Seguridad | Escudo IAM y candado | Seguridad |
| 12 FinOps | Gráfica y costo estimado | Costos |
| 13 Incidente | Alerta crítica y consola de diagnóstico | Senior investigaciones |
| 14 Escalado | Flecha de capacidad y nodos | Kubernetes/HA |
| 15 Senior | De pie con blueprint y escudo | Dashboard Senior |

**Producción de assets**: original grande para hero (PNG/WebP con transparencia revisada), versiones web optimizadas, avatar de 64/128px, icono 32px redibujado simplificado, poses recortadas con espacio de seguridad. No reducir la imagen completa a 24px y esperar legibilidad. Generar las variantes a partir de la imagen original con hoja de consistencia del personaje; no aceptar poses con cambios de lentes, vestuario, manos o parches.

**Licencias**: conservar origen y permisos del personaje propio; logotipos de nube reconocibles deben utilizarse conforme a lineamientos de marca correspondientes. Se puede optar por insignias abstractas para evitar aval implícito.

**Interacciones**: mascota acompaña, no interrumpe; microanimación suave y apagable con `prefers-reduced-motion`. Texto alternativo describe acción cuando comunica estado; alt vacío si es puramente decorativa.

---

# 4. Header: selector de proveedor como control central

## 4.1 Wireframe desktop

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [CLOUD MENTOR] Cloud Engineering Academy │ Inicio  Rutas  Labs  Simuladores  Senior │ [AWS ▾] [ES ▾] [☾] │
└───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Es obligatorio que AWS/Azure/GCP permanezca visible. En móvil, logo compacto + selector proveedor + botón menú; idioma/tema/Senior en panel de navegación, con acceso directo a Senior visible en el menú.

## 4.2 Contrato exacto del switcher

- Opciones: `AWS`, `Microsoft Azure`, `Google Cloud` (id interno `aws`, `azure`, `gcp`).
- Accessible name: **«Proveedor cloud»**. Dropdown nativo o listbox con teclado, `aria` correcto y foco.
- Primera visita: onboarding explícito «¿Con qué nube deseas comenzar?»; recomendación contextual opcional, sin forzar AWS como decisión tácita.
- Preferencia `cloud.provider` persistente. URL compartible `/#/aprender/redes-virtuales?cloud=azure` y precedencia: **query válida > preferencia persistida > onboarding**.
- Cambio desde lección: conservar `conceptId`; abrir implementación específica si existe, o mensaje claro «Esta práctica aún no está disponible para Azure» con explicación y link de alternativa. Nunca presentar AWS como implementación Azure.
- Cambiar proveedor **no** borra notas, XP, quizzes ni logros conceptuales.
- Guardar progreso por `{lessonId, provider, labId, labVersion}` para práctica específica. Reusar progreso transversal de conceptos.
- Selector afecta nombres de servicios, diagramas, comandos (`aws`, `az`, `gcloud`), Terraform, políticas, costos, permisos, checklists y enlaces oficiales pertinentes.
- Añadir enlace «Comparar las 3 nubes» a la lección (no una cuarta opción falsa del selector).
- Los tres proveedores mantienen igual calidad de explicación aunque el material de referencia inicial esté más desarrollado en AWS.

## 4.3 Ejemplo de flujo

1. Alumno abre «Redes virtuales» con AWS y entiende IP/CIDR/rutas.
2. Ve AWS VPC, subnets, Internet Gateway, route tables y seguridad.
3. Cambia a Azure: permanece el **concepto**, pero se muestra VNet, subnets, NSG, rutas y las diferencias del modelo.
4. Cambia a GCP: se explica el alcance global de VPC, subredes regionales y reglas de firewall aplicables.
5. La lección conserva la marca conceptual de comprensión; **tres laboratorios tienen evidencias independientes**.

## 4.4 No equivalencias importantes

No definir una tabla ciega de alias. AWS VPC es regional y Azure VNet es regional; GCP VPC tiene alcance global con subredes regionales. Microsoft Entra ID no es simplemente «AWS IAM con otro nombre»; control de acceso a recursos de Azure se realiza con RBAC y componentes de identidad relacionados. AWS Lambda, Azure Functions y Cloud Run functions comparten un propósito, pero difieren en runtime, límites, integración y modelo operativo.

---

# 5. Mapa completo de pantallas

| Ruta propuesta | Pantalla | Contenido / interacción |
|---|---|---|
| `/#/` | Home | Hero, mascota, START, 3 rutas, progreso, proveedores |
| `/#/mapa` | Mapa curricular | Básico → Intermedio → Avanzado → Senior |
| `/#/aprender/:id` | Aula | Concepto, implementación cloud, CLI/IaC, práctica |
| `/#/labs` | Laboratorios | Filtros: nivel, proveedor, modo, costo posible |
| `/#/labs/:id` | Laboratorio | Prerrequisitos, comandos, validación, limpieza |
| `/#/simuladores` | Catálogo | Red, IAM, arquitectura, costos, incidentes |
| `/#/simuladores/:id` | Simulador | Escenario interactivo y resultado |
| `/#/senior` | Senior dashboard | 18 desafíos, competencias, progreso |
| `/#/senior/:id` | Challenge | Brief → evidencia → decisión → rúbrica |
| `/#/progreso` | Progreso | Conceptos, proveedor, habilidades, export/import |
| `/#/ajustes` | Settings | Tema, idioma, proveedor, datos, motion |
| `/#/acerca` | About | Marca, créditos, metodología, límites del producto |

El router hash debe preservar y parsear query **dentro del fragmento**. Ejemplo `/#/aprender/iam?cloud=gcp&senior=1`. Definir canonical route, parámetro inválido y fallback sin 404 del hosting estático.

## 5.1 Home

- Header igual a GoPixel y mascoteado con el Cloud Mentor aprobado.
- Hero: kicker «Aprende infraestructura real», H1 «Domina la ingeniería Cloud», descripción técnica breve y CTA **START**.
- Segundo CTA: «Explorar rutas». Indicadores 3 proveedores, 3 niveles, 18 módulos, 18 desafíos Senior, 3 modalidades de laboratorio (solo mostrar contadores de lecciones validadas, no de placeholders).
- Tres cards de nivel, resumen del perfil, ruta en curso, «Reanudar».
- Bloque «Aprendes los fundamentos una vez; los implementas con AWS / Azure / GCP».
- Acceso a galería de simuladores y Senior; mini-banner con mascota explicando.
- FAQ: costo de cuentas, qué se simula, requisitos, certificados, progresión.

### Wireframe Home

```text
┌ Header / Selector Cloud / Tema / Senior ─────────────────────────────────┐
│                                                                         │
│  KICKER   Aprende infraestructura real             [MASCOTA GRANDE]     │
│  H1       Cloud Engineering Academy                                     │
│  P        Aprende, despliega, automatiza y opera...                      │
│  [START / CONTINUAR]   [EXPLORAR RUTAS]                                  │
│                                                                         │
│  [AWS + Azure + GCP]  [3 niveles]  [simuladores]  [Senior Mode]           │
├─────────────────────────────────────────────────────────────────────────┤
│  Tu recorrido: [BÁSICO] [INTERMEDIO] [AVANZADO]                          │
│  Continúa donde estabas | Próximo laboratorio | Insignias               │
│  Visualizador concepto común / implementación por proveedor             │
├─────────────────────────────────────────────────────────────────────────┤
│  Simuladores destacados | Desafíos Senior | Preguntas frecuentes         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 5.2 Mapa curricular

Sidebar similar a GoPixel: niveles plegables, categoría y progreso; grid de módulos; búsqueda; filtros por provider / tipo de contenido; línea de avance. No permitir estados de «completado» sin criterios del módulo. Cards muestran horas, nivel, competencias, prueba de concepto y práctica; badges `Concepto`, `Simulación`, `Local`, `Cloud real`.

## 5.3 Aula / lección

Estructura desktop: sidebar 250–300 px; contenido central principal; panel lateral (opcional) con índice, Cloud Mentor, prerequisitos y notas. En tablet colapsa panel; en móvil navegación de unidad y secciones verticales.

Orden dentro de lección:

1. Breadcrumb, título y objetivo observable.
2. Prerrequisitos y tiempo aproximado de estudio (no cronómetro obligatorio).
3. Teoría común y un diagrama explicativo correcto.
4. Panel «Cómo se implementa en **[Proveedor seleccionado]**».
5. Comparación breve entre 3 nubes: similitudes y diferencias de ingeniería.
6. Ejemplo IaC / CLI, versión y prerequisitos; copiar código.
7. Simulador o ejercicio conceptual.
8. Laboratorio guiado (`sim`, `local`, `real-cloud`); aviso de costos.
9. Verificación / preguntas / análisis de fallos.
10. Limpieza de recursos si corresponde, reflexión y próximo paso.

No diseñar un «editor Terraform» como compilador cloud ficticio; para MVP es panel con fragmentos editables limitados o formulario didáctico y validación determinista. La ejecución real pertenece al entorno local/cloud con comandos y tests.

## 5.4 Laboratorio

Cabecera: ID, nivel, proveedor, modalidad, duración orientativa, habilidades, costo posible, botón «Preparar entorno». Tabs **Objetivo / Arquitectura / Pasos / Validación / Limpieza / Evidencias**. Mostrar resultado de pruebas verificables y diferenciar «marcado por el estudiante» de «verificado por herramienta». Botón de cleanup prioritario después de recursos reales.

## 5.5 Senior Mode

Botón/toggle visible en header, tal como en GoPixel. Mantiene tema y proveedor; acento dorado. Secciones: tablero 18 casos, competencia, incidentes, análisis, decisión, revisión, evaluación. Si el alumno lo activa durante una lección, mostrar reto relacionado cuando exista; no inventar uno. Senior desbloqueado para explorar, pero sugerir prerequisitos en vez de bloquear forzosamente toda la navegación.

## 5.6 Progreso y preferencias

Progreso conceptual compartido; progreso de laboratorios por proveedor; Senior por desafío y versión. «Continuar» lleva al punto correcto. Importar/exportar JSON con validación y esquema. Opción borrar con confirmación. No agregar en header indicadores inútiles «Guardado en localStorage» ni inflar XP por abrir una tarjeta.

---

# 6. Contenido: un núcleo común + adaptadores cloud

## 6.1 Regla editorial

Un concepto se escribe una vez: `what/why/tradeoffs`; después, una implementación específica de AWS, Azure y GCP describe `how/cost/security/validation/cleanup`. El alumno puede elegir uno para practicar y cambiar a otro sin rehacer la teoría. Todos los adaptadores deben ser revisados por un responsable técnico de esa nube.

Ejemplo árbol:

```text
src/content/
  manifest.ts
  capabilities/
    virtual-network/
      concept.md
      rubric.json
      visual.json
      aws/
        explanation.md
        commands.sh
        main.tf
        check.md
        cleanup.md
      azure/
        explanation.md
        commands.sh
        main.tf
        check.md
        cleanup.md
      gcp/
        explanation.md
        commands.sh
        main.tf
        check.md
        cleanup.md
```

Markdown es contenido de aprendizaje, **no código ejecutado arbitrariamente**. La aplicación sanitiza/renderiza el contenido y restringe HTML peligroso; assets locales revisados; no usar `dangerouslySetInnerHTML` sin justificación/limpieza.

## 6.2 Manifest / tipos TypeScript

```ts
type CloudProvider = 'aws' | 'azure' | 'gcp';
type Level = 'basic' | 'intermediate' | 'advanced';
type LabMode = 'simulation' | 'local' | 'real-cloud';

type ProviderMaterial = {
  explanationPath: string;
  serviceNames: string[];
  architecturePath?: string;
  commandsPath?: string;
  terraformPath?: string;
  officialDocs: string[];
  labs: Array<{ id: string; mode: LabMode; version: string }>;
};

type CloudLesson = {
  id: string;
  moduleId: string;
  level: Level;
  title: string;
  learningOutcomes: string[];
  prerequisites: string[];
  conceptsPath: string;
  competencyIds: string[];
  versionsReviewedAt: string;
  providers: Partial<Record<CloudProvider, ProviderMaterial>>;
  assessments: string[];
};
```

Un proveedor ausente no es «completado por equivalencia». El manifest debe marcar explícitamente `draft`, `reviewed`, `released`. Solo contenido `released` aparece como lección plenamente operativa.

## 6.3 Preferencias y progreso

```ts
type LearningPreferences = {
  provider: CloudProvider;
  theme: 'light' | 'dark' | 'system';
  language: string;
  seniorMode: boolean;
  reducedMotion: boolean;
};

type LessonProgress = {
  lessonId: string;
  conceptsPassed: string[];
  quizAttemptCount: number;
  lastVisitedAt: string;
};

type LabProgress = {
  labId: string;
  provider: CloudProvider;
  labVersion: string;
  mode: LabMode;
  status: 'not-started' | 'in-progress' | 'self-reported' | 'locally-verified' | 'remotely-verified';
  evidenceRefs: string[];
};

type PersistedState = {
  schemaVersion: number;
  preferences: LearningPreferences;
  lessons: Record<string, LessonProgress>;
  labs: LabProgress[];
  senior: Record<string, { challengeVersion: string; status: string; notes: string }>;
};
```

**Seguridad de evidencias**: resultados en browser son información didáctica manipulable. No llamarlos certificación ni «verified by cloud» a menos que una herramienta confiable de validación externa los compruebe. Mover evidencias a almacenamiento administrado y firmas solo si se implementa backend.

## 6.4 Matriz de correspondencia por capacidad

| Competencia | AWS | Azure | GCP | Nota didáctica |
|---|---|---|---|---|
| Cómputo VM | EC2 | Azure Virtual Machines | Compute Engine | Imágenes, tamaños, redes y facturación varían |
| Objetos | S3 | Blob Storage | Cloud Storage | Políticas, clases y nomenclatura difieren |
| Red virtual | VPC | Virtual Network (VNet) | VPC | Alcance y gestión de subredes no idénticos |
| IAM de recursos | IAM | Azure RBAC + identidades Entra | Cloud IAM | Jerarquía, políticas y alcance diferentes |
| PostgreSQL | RDS for PostgreSQL | Azure Database for PostgreSQL | Cloud SQL for PostgreSQL | Versiones/HA/costos diferentes |
| Funciones | Lambda | Azure Functions | Cloud Run functions | Diferencias de ejecución y activadores |
| Kubernetes | EKS | AKS | GKE | Gestión de nodos y costos cambian |
| Observabilidad | CloudWatch | Azure Monitor | Cloud Monitoring / Logging | Correlación y señales |
| Secretos | Secrets Manager | Key Vault | Secret Manager | Integración IAM y costos |
| Container registry | ECR | Azure Container Registry | Artifact Registry | Autenticación y permisos |
| Serveless containers | App Runner / Fargate (según caso) | Container Apps | Cloud Run | **No equivalentes exactos** |
| IaC portable | Terraform + proveedor AWS | Terraform + proveedor azurerm | Terraform + proveedor google | HCL común, recursos distintos |

Verificar docs y límites actuales antes de publicar cada implementación. Toda afirmación variable en el tiempo tiene fecha `verifiedAt` y enlace oficial.

---

# 7. Currículo 240 horas: 18 módulos (Básico 60 / Intermedio 80 / Avanzado 100)

> Horas **de dedicación del alumno**, no estimación de ingeniería del producto. Un módulo publicado debe contener suficientes actividades reales para justificar sus horas. Tres implementaciones completas en todas las nubes multiplicarían carga; se prioriza una nube elegida, más equivalencias comparativas validadas.

## NIVEL I — BÁSICO (60 h)

| ID | Módulo | Horas | Resultado observable | Laboratorio representativo |
|---|---|---:|---|---|
| B01 | Cloud y modelos de servicio | 10 | Diferenciar SaaS/PaaS/IaaS, responsabilidad y regiones | Analizar tres topologías |
| B02 | Fundamentos Linux, redes y DNS | 10 | Entender TCP/IP, CIDR, rutas, puertos y CLI | Diseñar subredes, SSH seguro |
| B03 | Cómputo y sistemas operativos | 10 | Crear y asegurar una VM | VM con web server y teardown |
| B04 | Almacenamiento y bases de datos | 10 | Seleccionar almacenamiento y durabilidad | Objetos + DB de ejemplo |
| B05 | IAM, seguridad inicial y presupuestos | 10 | Aplicar mínimo privilegio y alertas | Política de acceso restringido |
| B06 | Proyecto básico reproducible | 10 | Desplegar y documentar web simple | Web, tests y cleanup |

**Alcance mínimo del básico**: navegación cloud, creación de cuenta **con avisos** (no solicitar credenciales), IAM/MFA, CLI, redes, firewall, VM, discos, storage, conceptos de DB, observabilidad inicial, estimación de costos, eliminación.

## NIVEL II — INTERMEDIO (80 h)

| ID | Módulo | Horas | Resultado observable | Laboratorio representativo |
|---|---|---:|---|---|
| I07 | CLI, Linux y automatización | 12 | Automatizar operaciones seguras | Script idempotente con dry-run |
| I08 | Redes cloud y aplicaciones de varias capas | 14 | Separar capas públicas/privadas | App + DB privada + LB |
| I09 | Servicios administrados y serverless | 14 | Integrar API y eventos | Función HTTP + evento + DB |
| I10 | Docker, contenedores y Kubernetes | 14 | Contenerizar y desplegar workloads | Compose/Kind y EKS/AKS/GKE opcional |
| I11 | Terraform, Git y CI/CD | 12 | Aplicar cambios reproducibles | Pipeline lint/plan y aprobación |
| I12 | Monitoreo, depuración y proyecto | 14 | Operar app con logs/métricas | Incident drill de app multicapa |

**Alcance mínimo del intermedio**: Git, scripts, Docker, IaC, Terraform state/plan/apply, secret management, red/seguridad aplicacional, APIs, event-driven, contenedores, CI/CD, logs/métricas/alertas, prácticas de deshacer despliegues.

## NIVEL III — AVANZADO (100 h)

| ID | Módulo | Horas | Resultado observable | Laboratorio representativo |
|---|---|---:|---|---|
| A13 | Arquitectura de software cloud-native | 16 | Defender tradeoffs y límites | ADR monolito vs microservicios |
| A14 | Seguridad y gobernanza | 16 | Diseñar landing zone, IAM y políticas | Revisión de posture y permisos |
| A15 | Alta disponibilidad y DR | 16 | Diseñar según RTO/RPO | Ensayo de failover documentado |
| A16 | Datos distribuidos e integración | 18 | Elegir DB, mensajería, caché y consistencia | Cola idempotente + DLQ |
| A17 | SRE, platform engineering y FinOps | 16 | Usar SLO, GitOps, costo y observabilidad | Calcular burn rate + optimizar gasto |
| A18 | Capstone de arquitectura multicloud | 18 | Diseñar, probar, costear y defender solución | Arquitectura con necesidad multicloud justificada |

**Alcance mínimo del avanzado**: tradeoffs, resiliencia, performance, security architecture, regionalidad, SRE, GitOps, operaciones Kubernetes, control de costos, threat modeling, políticas, auditoría, arquitectura empresarial e informes de decisión.

## 7.1 Secuencia sugerida

24 semanas x 10 h. 6 semanas básico, 8 intermedio, 10 avanzado. Senior Mode puede explorarse en cualquier momento, pero completar sus retos exige evidencias y prerequisitos. Publicar itinerario de prerequisitos y competencias; no bloquear aprendizaje exploratorio.

## 7.2 Estructura estándar de cada módulo

- 4–8 lecciones sustantivas (cantidad ajustable por contenido), introducción, glosario, mapa conceptual.
- 1–2 simuladores o ejercicios interactivos con modelos correctos.
- 1 laboratorio por nube **al menos** para la competencia principal; no fingir paridad si falta validación.
- 1 ejercicio de comparación, 1 quiz razonado y feedback explicativo.
- 1 ejercicio final con rúbrica, checklist de seguridad/costo/cleanup.
- Bibliografía de documentación oficial y fecha de revisión.

---

# 8. Simuladores educativos interactivos

| ID | Simulador | Inputs del alumno | Salida/validación |
|---|---|---|---|
| SIM01 | Diseñador de subredes/CIDR | Rango, cantidad, segmentación | Solapamientos, rutas y rangos correctos |
| SIM02 | Inspector de IAM | Principal, acción, recurso, políticas | Permitido/denegado y por qué, con alcance declarado |
| SIM03 | Enrutamiento y firewall | CIDR, rutas, puertos, prioridades | Trayecto disponible/bloqueado y explicación |
| SIM04 | VM capacity | CPU, memoria, tráfico, tamaño | Alertas de sobreaprovisionamiento |
| SIM05 | Balanceo y autoescalado | RPS, instancias, targets, warmup | Capacidad, cola estimada, pérdidas modeladas |
| SIM06 | Alta disponibilidad/DR | AZ/región, RTO/RPO, fallos | Impacto y diseño de recuperación |
| SIM07 | Storage lifecycle | Clases, retención, acceso, tamaño | Tradeoffs de latencia/costo/durabilidad |
| SIM08 | Event-driven | Pub/sub, reintentos, DLQ, idempotencia | Flujo, duplicados y destino de mensajes |
| SIM09 | Terraform plan inspector | Diff de recursos, constraints | Riesgos create/update/replace/destroy |
| SIM10 | Kubernetes scheduler | Requests/limits, nodos, pods | Programación, Pending, saturación |
| SIM11 | SLO/error budget | SLI, objetivo, ventana, incidentes | Burn rate y budget restante |
| SIM12 | FinOps sandbox | Tasas de uso **hipotéticas** | Escenarios de gasto, no precios oficiales |

Los resultados deben derivarse de algoritmos deterministas probados con fixtures, y explicar limitaciones. Por ejemplo, SIM02 es una **simplificación educativa**, no replica toda la semántica AWS/Azure/GCP IAM. SIM12 nunca afirmar montos reales sin tarifas/región/fecha verificadas.

---

# 9. Minijuegos (adaptación fiel de GoPixel)

1. **Cloud Quiz:** elegir la mejor decisión; explicar correcta/incorrecta.
2. **Completar HCL/YAML/Bash:** rellenar un fragmento con criterios transparentes.
3. **Ordenar un despliegue:** seleccionar secuencia segura de acciones y cleanup.
4. **Predecir resultado:** simular efecto de ruta/firewall/terraform-plan/política.
5. **Bug Hunter:** descubrir un error de IAM, HCL, YAML, red o costo.
6. **Architecture Match:** asociar requerimientos con componentes, reconociendo falsas equivalencias.
7. **Incident Timeline:** ordenar eventos y acciones de diagnóstico.
8. **Cloud Decisions:** escoger bajo restricciones de costo, compliance, RTO y operabilidad.

Todas las preguntas requieren fuente/revisión, distractores plausibles, feedback y tests. Un juego no reemplaza laboratorio real. No elevar XP por refrescar página.

---

# 10. Senior Mode — 18 retos reales y motores de evaluación

## 10.1 Filosofía

Senior Mode enseña **tradeoffs, evidencia y consecuencias**. Cada reto tiene: contexto de negocio, arquitectura inicial, requisitos, inyección del problema, datos relevantes, restricciones, decisiones posibles, evidencia solicitada, mitigación, prevención, pruebas y rúbrica. Los resultados pueden ser evaluados por tests objetivos y una rúbrica abierta de documentación; jamás declarar competencia demostrada solo por hacer clic.

## 10.2 18 desafíos

| ID | Caso | Herramienta / modo | Evidencia requerida |
|---|---|---|---|
| S01 | Arquitectura fuera de escala/costos | Decision Lab | ADR y dimensionamiento |
| S02 | Error de routing entre subredes | Investigation Lab | Traza de rutas y fix |
| S03 | Privilegios IAM excesivos | Security Review | Principio/acción/recurso y política mejorada |
| S04 | Bucket de datos expuesto | Evidence Lab | Remediación y controles de acceso |
| S05 | Cambio Terraform destruye DB | Code Review / Plan Inspector | Bloqueo, análisis y recuperación |
| S06 | Credencial filtrada en CI/CD | Incident Response | Revocación, rotación, postmortem |
| S07 | Despliegue con latencia alta | Operations Lab | Diagnóstico p95/p99 y rollback |
| S08 | Cluster sin capacidad | Kubernetes Lab | Requests, escalamiento y límites |
| S09 | Balanceador y health checks rotos | Investigation Lab | Hipótesis y métricas |
| S10 | Observabilidad incompleta | Evidence Lab | Señales, alertas, trazas, SLO |
| S11 | Error budget consumiéndose | SRE Lab | Cálculo y política de release |
| S12 | API con 5xx generalizados | Incident Lab | Línea de tiempo y mitigación |
| S13 | Reintentos generan eventos duplicados | Architecture Lab | Idempotencia, DLQ, backpressure |
| S14 | Factura inesperada | FinOps Lab | Causas, gasto y acciones justificadas |
| S15 | Requisitos de residencia de datos incumplidos | Governance Lab | Flujo de datos, regiones, controles |
| S16 | Caída de AZ/región | DR Lab | RTO/RPO, prueba y plan de failover |
| S17 | Migración entre proveedores | Decision Lab | Portabilidad real, dependencia, costos |
| S18 | Plataforma empresarial final | Architecture Board | ADR, threat model, IaC, CI/CD, SLO, FinOps |

## 10.3 Motores heredados/adaptados

- `DecisionLab`: entradas, restricciones y matriz de alternativas.
- `EvidenceLab`: leer logs, eventos, recursos, políticas y métricas proporcionadas.
- `InvestigationLab`: hipótesis → experimento → observación → conclusión.
- `OperationsLab`: priorización, mitigación, rollback, comunicación, postmortem.
- `CodeReviewLab`: diffs Terraform, YAML, scripts, CI/CD y políticas; comentarios con líneas y severidad.
- `SimulationLab`: escenario parametrizado con engine determinista, condiciones de fallo y métricas.

## 10.4 Ejemplo redactado S05

**Contexto**: ecommerce en producción. Un PR cambia `aws_db_instance`, `azurerm_postgresql_flexible_server` o `google_sql_database_instance` con impacto de reemplazo según el plan **real mostrado en un fixture de proveedor**. Restricciones: RPO ≤ 15 min, RTO ≤ 60 min, tráfico activo, presupuesto mensual definido. Archivo del reto: `plan.json`, diff Terraform, métricas de salud, política de backup, mapa de dependencias, política de cambios.

**Objetivo**: detectar riesgo antes de `apply`, formular hipótesis, evaluar respaldo/restauración, definir ruta no destructiva o ventana controlada y demostrar cómo se verifica. **Respuesta esperada**: no aplicar ciegamente; reconocer que `prevent_destroy` puede evitar destrucción pero también bloquear cambios, y no sustituye un plan de recuperación probado. Calificación: 20% riesgo, 20% diagnóstico, 20% plan seguro, 20% evidencias, 20% comunicación/ADR.

## 10.5 Rúbrica estándar de Senior

| Criterio | Peso | Evidencia |
|---|---:|---|
| Identificación de riesgos y blast radius | 20% | Inventario de impacto |
| Hipótesis y datos de diagnóstico | 20% | Logs, métricas, plan, capturas reproducibles |
| Decisión y tradeoffs | 20% | ADR con alternativas |
| Seguridad y recuperación | 20% | Pasos de mitigación y rollback |
| Validación y comunicación | 20% | Tests, SLO, postmortem/operational notes |

Resultados: `sin iniciar`, `en curso`, `enviado`, `autoevaluado`, `verificado localmente`, `validado por revisor`. **No** transformar autoevaluación en acreditación externa.

---

# 11. Laboratorios: 3 modalidades y su seguridad

## 11.1 Simulación web (MVP)

Sin cuenta, sin API de proveedores, sin costo. Modelos deterministas TypeScript; puede hacerse completamente estático. **Etiqueta visible** `Simulación educativa — no ejecuta recursos cloud`. Pruebas unitarias de reglas y casos límite.

## 11.2 Práctica local (MVP progresivo)

Laboratorios descargables ejecutados por alumno en PC/VM con Docker Compose/Kind, Terraform `fmt/validate` y herramientas de prueba. Algunos módulos permiten sandbox local para HTTP, DNS, contenedores, sistemas distribuidos. No fingir que un emulador local reproduce políticas completas de AWS/Azure/GCP. README con prerequisitos, versiones, instrucciones OS, validación, cleanup y troubleshooting.

## 11.3 Cloud real con cuenta propia (guía desde MVP, ejecución fuera de app)

AWS/Azure/GCP **requieren identidad y pueden facturar**. Cada guía debe documentar: región, SKU/servicios, permisos mínimos, estimación **referencial** de costo con fuente y fecha, política de nombres, presupuesto/alertas, pasos CLI/IaC, `plan` y revisión, verificación, `destroy` o eliminación manual, comprobación de ausencia de recursos y advertencias sobre cargos residuales. EKS/AKS/GKE pueden ser costosos y no todos sus componentes están cubiertos por free tiers. Mantener labs costosos como opcionales, o usar Kind para la fase inicial.

**Prohibido**: pedir access keys en UI; pedir compartir secretos; almacenar tokens en localStorage; ejecutar `terraform apply` mediante código frontend; pedir credenciales de cuenta root/owner; provisionar recursos de producción; subir `terraform.tfstate` con secretos; recomendar scripts destructivos no delimitados.

## 11.4 Sandbox remoto gestionado (POSTERIOR)

Si se decide implementar: backend NestJS + identidad OIDC, cuenta/proyecto delegado, roles de mínimos privilegios, credenciales efímeras, aislamiento por estudiante, concurrencia y cuotas, límites de gasto, TTL y expiración, destrucción garantizada con reintento, guardrails, logs de auditoría, kill switch y seguimiento de recursos huérfanos. Revisión de amenaza obligatoria antes de activar. Presupuesto no siempre es límite duro: vigilar y detener en plataforma.

## 11.5 Plantilla obligatoria de cada lab

```yaml
id: networking-virtual-private-aws-01
version: 1.0.0
provider: aws
mode: real-cloud
level: basic
requiredCompetencies: [networking.cidr, security.least-privilege]
requiresAccount: true
potentialCharges: true
estimatedCost:
  status: needs-region-and-pricing-check
  pricingSource: https://aws.amazon.com/pricing/
  verifiedAt: null
security:
  secretHandling: no-repository-secrets
  permissionsDocumented: true
  destructiveImpactReviewed: true
validation:
  type: manual-plus-local-checks
cleanup:
  required: true
  checklistPath: cleanup.md
```

---

# 12. Arquitectura de software recomendada

## 12.1 Stack congelado para MVP

| Área | Elección | Por qué |
|---|---|---|
| Framework | **Preact** | Es el stack del producto GoPixel aportado |
| Lenguaje | **TypeScript estricto** | Contratos tipados para contenido/engines |
| Build | **Vite** | SPA rápida, sencilla y coherente con base |
| Estado | **Preact Signals** | Preferencias/progreso sin infraestructura pesada |
| Estilo | **CSS + design tokens**, responsive | Fidelidad al diseño GoPixel/Vigilio |
| Routing | Hash router robusto y testeado | GitHub Pages sin backend |
| Contenido | Markdown + manifest tipado + esquemas | Autoría estructurada, inspección Git y CI |
| Simulación | Funciones TS puras + workers opcionales | Testabilidad y aislamiento |
| Tests | Vitest, Playwright, validación de contenido, accesibilidad | Confianza por capas |
| Formato | Biome / tooling ya presente, sin cambios masivos | Consistencia |
| Hosting | GitHub Pages / CDN estático | MVP sin credenciales ni servidor |
| Labs | Terraform, Docker, Bash, YAML, Kind | Estándares de Cloud Engineering |
| CI/CD | GitHub Actions | Builds/tests/publicación reproducibles |

**No en MVP:** NestJS, PostgreSQL, microfrontends, servidor de ejecución Terraform, cuenta cloud compartida. **Posterior** si hay requisitos reales: NestJS + Zod + Drizzle + PostgreSQL + auth/OIDC + colas + observabilidad.

## 12.2 Estructura de carpetas propuesta

```text
cloud-engineering-academy/
├── public/
│   └── assets/
│       ├── mascot/              # poses optimizadas de la mascota aprobada
│       ├── badges/
│       ├── icons/
│       └── diagrams/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   ├── Router.tsx
│   │   └── providers.ts
│   ├── design-system/
│   │   ├── tokens.css
│   │   ├── components/
│   │   └── responsive.css
│   ├── features/
│   │   ├── landing/
│   │   ├── providers/
│   │   ├── curriculum/
│   │   ├── lessons/
│   │   ├── labs/
│   │   ├── simulators/
│   │   ├── games/
│   │   ├── senior/
│   │   └── progress/
│   ├── engines/
│   │   ├── cidr/
│   │   ├── routing/
│   │   ├── iam-simplified/
│   │   ├── terraform-plan/
│   │   ├── autoscaling/
│   │   └── sre/
│   ├── content/
│   │   ├── manifest.ts
│   │   └── capabilities/
│   ├── lib/
│   └── styles/
├── labs/
│   ├── common/
│   ├── aws/
│   ├── azure/
│   ├── gcp/
│   └── senior/
├── docs/
│   ├── adr/
│   ├── ux/
│   ├── curriculum/
│   ├── security/
│   └── operations/
├── tests/
│   ├── e2e/
│   └── content/
├── .github/workflows/
└── README.md
```

**Nota técnica:** el ejemplo ilustra ownership; no obliga a duplicar componentes en `design-system` y `features`. Poner lógica donde pertenezca. Mantener engines sin dependencias UI.

## 12.3 APIs internas de UI (esquema ilustrativo)

```ts
export type Provider = 'aws' | 'azure' | 'gcp';

export interface CloudProviderState {
  selected: Provider;
  setSelected(provider: Provider): void;
}

export interface LessonRoute {
  lessonId: string;
  provider: Provider;
  senior: boolean;
}

export interface SimulationResult<T> {
  engineVersion: string;
  inputValid: boolean;
  output?: T;
  feedback: Array<{ code: string; severity: 'info' | 'warning' | 'error'; message: string }>;
  limitations: string[];
}
```

**Ejemplo del cambio de proveedor:** `setSelected('azure')` actualiza Signal, actualiza ruta hash query, vuelve a resolver `contentManifest[lessonId].providers.azure`, conserva scroll/ancla cuando exista y persiste preferencia; no cambia `conceptProgress` ni altera evidencias AWS.

## 12.4 Arquitectura de datos y límites

- Contenido público en Git/versionado, manifest construido en CI.
- Progreso local en storage con `schemaVersion`, migración y export/import.
- Nunca guardar secretos ni datos sensibles de cuentas cloud.
- Artículos Markdown y archivos de laboratorio no se ejecutan automáticamente.
- Preferir imágenes optimizadas, lazy load, code splitting en simuladores y Senior.
- SEO limitado por SPA hash: cuidar título/metadata; SSR no justificado para MVP salvo objetivo explícito de posicionamiento.

---

# 13. UX detallada de implementación

## 13.1 Breakpoints

- Móvil: <768px, header compacto, selector siempre visible, menú desplegable, sidebar plegable.
- Tablet: 768–1199px, dos columnas según lección, menú parcial.
- Desktop: ≥1200px, hero dos columnas, sidebar estable, contenido amplio.

Evitar tablas imposibles en móvil: scroll horizontal con indicador o tarjetas de comparación. Código desplazable dentro de panel propio, nunca romper layout. El selector provider no debe quedar oculto dentro de un panel en móvil sin necesidad.

## 13.2 Interacciones y estados

- Onboarding: «Elige tu nube» + 3 opciones + explicación «puedes cambiar cuando quieras».
- Start sin progreso: B01; con progreso: última lección válida.
- Lección con proveedor no implementado: estado vacío honesto y CTA volver al concepto, no fallback encubierto.
- Quiz: intento → feedback correcto/incorrecto → explicación → reintento.
- Cambio de nivel: progreso guardado y ruta preservada.
- Senior Mode: `data-senior=true` solo cambia contextos, CTA y acentos, no toda la UI.
- Preferencias se guardan sin notificaciones invasivas.
- Mascota hace aparición contextual en intro, pista, logro y warning, no en cada párrafo.
- Al cerrar lab real, mostrar aviso explícito de recursos activos si el estudiante no marcó limpieza.

## 13.3 Accesibilidad

WCAG 2.2 AA como objetivo: contraste verificado (no dar por aprobado cada color), foco visible, navegación por teclado, skip link, labels en formularios, estados no solo por color, zoom/reflow, lectores de pantalla, `aria-live` moderado para simuladores y resultados, controles ≥44px, reduced motion, textos alternativos. Las visualizaciones necesitan resumen textual; diagramas no son única fuente de instrucciones.

## 13.4 Internacionalización

Iniciar con español completo, preparar i18n por claves. GoPixel ofrece seis idiomas, pero **no declarar seis idiomas disponibles** mientras los contenidos cloud completos no estén traducidos y revisados. Segunda lengua recomendada: inglés. Mantener terminología técnica (IAM, SLO, RTO, VPC) y glosario.

---

# 14. Cómo construir la primera vertical slice

La entrega debe demostrar el modelo completo **con una capacidad**, antes de llenar el repositorio de tarjetas.

**Piloto recomendado:** `virtual-network` (redes virtuales). Razón: conceptos universales, diferencias AWS/Azure/GCP significativas, simulador útil, evaluación determinista y vínculo con seguridad.

### Checklist del módulo piloto

- [ ] Home similar a GoPixel, con mascota aprobada y START funcional.
- [ ] Header accesible con proveedor AWS/Azure/GCP, idioma y tema.
- [ ] URL `/#/aprender/virtual-network?cloud=...` con parsing correcto.
- [ ] Teoría común de CIDR, subredes, rutas, puertos y conectividad.
- [ ] Implementaciones AWS, Azure y GCP revisadas, no plantillas renombradas.
- [ ] Diagrama de cada proveedor reflejando diferencias reales.
- [ ] Simulador de CIDR/routing con reglas verificadas.
- [ ] Quiz con feedback razonado y distractores controlados.
- [ ] Laboratorio local (opcional si viable) y tres guías reales con advertencia de costo y cleanup.
- [ ] Progreso conceptual compartido y progreso por proveedor separado.
- [ ] Pruebas unitarias, de integración, browser y accesibilidad.
- [ ] README con comandos reproducibles y capturas de dark/light/mobile.

**Definición de éxito**: alumno puede comprender red virtual, alternar las tres nubes, resolver un caso, ejecutar validaciones disponibles y abandonar una práctica real sin recursos huérfanos, con diferencias de implementación claramente descritas.

---

# 15. CI/CD, pruebas, calidad y operación

## 15.1 Gates de CI obligatorios

1. Instalación reproducible y lockfile respetado.
2. Typecheck TypeScript y build producción.
3. Tests unitarios de engines: fixtures positivos/negativos, límites de CIDR, IAM educativo, rutas, costo estimado.
4. Schema validation de manifest y contenidos por proveedor.
5. Detección de links internos rotos, IDs duplicados, rutas inexistentes y assets faltantes.
6. Verificación de que `released` requiere teoría, laboratorio, validación, cleanup y referencias completas.
7. Tests E2E de header, provider switch, progreso persistido, refresh/URL deep link, móvil, Senior toggle.
8. Accesibilidad automatizada (axe o similar) y checklist manual de teclado.
9. Análisis de dependencias, secretos y workflows CI/CD con privilegios mínimos.
10. Smoke test del build estático en URL base de GitHub Pages o CDN.

## 15.2 Matriz de pruebas crítica

| Caso | AWS | Azure | GCP | Móvil | Claro/oscuro |
|---|---:|---:|---:|---:|---:|
| Selector y persistencia | ✓ | ✓ | ✓ | ✓ | ✓ |
| Deep-link a lección | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mapa de módulos | ✓ | ✓ | ✓ | ✓ | ✓ |
| Lab seguro y cleanup | ✓ | ✓ | ✓ | ✓ | ✓ |
| Juego + feedback | ✓ | ✓ | ✓ | ✓ | ✓ |
| Senior Mode | ✓ | ✓ | ✓ | ✓ | ✓ |

La matriz es un **objetivo de aceptación**, no un resultado de pruebas ya ejecutadas.

## 15.3 Calidad de contenidos

Checklist editorial: precisión técnica por proveedor, consistencia de nombres, fecha de revisión de docs/precios, objetivo observable, prerequisitos, duración realista, ejercicio accionable, feedback, solution/teacher notes, seguridad, costos y pasos de eliminación. Diferenciar content status `draft/reviewed/released`. No publicar como completo si solo tiene resumen, quiz o tarjetas.

## 15.4 Documentación y ADR

Registrar: ADR-001 SPA estática MVP; ADR-002 provider switch pedagógico; ADR-003 progreso local; ADR-004 laboratorios sin credenciales en browser; ADR-005 mascota aprobada y identidad; ADR-006 verificación de evidencias; ADR-007 criterios para backend/sandbox; ADR-008 política de versiones y costos.

---

# 16. Roadmap en fases y entregables verificables

## Fase 0 — Base visual y auditoría

**Meta:** bifurcar GoPixel legal y técnicamente, no romper lo que funciona.

- Revisar atribuciones/licencias del repositorio y assets; conservar licencia aplicable y separar gopher del nuevo branding.
- Capturar pantallas de GoPixel en dark/light, desktop/mobile; levantar mapa de componentes y tokens.
- Extraer `AppShell`, `Header`, routing, preferences y design system de los componentes monolíticos.
- Crear repo Cloud con mascot source y README de alcance.
- Establecer CI mínimo, snapshots/visual regression, budget de tamaño de bundle.

**Done:** shell visual comparable, navegación sin regresiones, mascota correcta, sin módulo falso.

## Fase 1 — Vertical slice funcional

- Header AWS/Azure/GCP, onboarding, URL compartible y persistencia.
- Home, ruta, aula y primera lección de redes virtuales.
- Simulador CIDR, quiz, ejemplo IaC y guía de lab para tres proveedores.
- Progreso separado y Senior toggle visible con solo retos implementados.

**Done:** camino completo START → lección → cambiar cloud → completar concepto → lab → continuar.

## Fase 2 — Básico completo

- B01–B06; guías de AWS/Azure/GCP y ejercicios, badges, costo, cleanup.
- Laboratorios locales/real-cloud apropiados; seguridad y limitaciones documentadas.

**Done:** seis módulos reales validados; no solo títulos.

## Fase 3 — Intermedio completo

- I07–I12: automatización, Docker, Terraform, serverless, CI/CD, observabilidad, redes.
- Nuevos simuladores y fixtures; labs CI/plan/validate.

**Done:** alumno puede desplegar y operar app en proveedor elegido con evidencias.

## Fase 4 — Avanzado + Senior

- A13–A18 y S01–S18; ADR, SLO, FinOps, seguridad, resiliencia, gobernanza, Kubernetes.
- Proyectos y rúbricas, evidencia reproducible.

**Done:** retos con evaluaciones objetivas y defensa documentada; no click-to-pass.

## Fase 5 — Funciones opcionales de plataforma

- Backend y cuentas **solo** si se necesitan multi-dispositivo, instructores, cohortes, calificaciones verificables o sandboxes efímeros.
- Separar producto de enseñanza de plataforma de ejecución, threat model formal y presupuesto operativo.

**Done:** autorización, límites, logs, aislamiento, limpieza y gestión de costos probados.

---

# 17. Criterios de aceptación / definición de terminado del producto

## Diseño

- [ ] La aplicación recuerda inmediatamente el layout y estilo GoPixel (hero, cards, sidebar, dark/light, niveles, Senior).
- [ ] Mascota oficial es la **imagen suministrada** con lentes y vestimenta de ingeniero, no otra variante.
- [ ] Header selector se ve en desktop y móvil; tema y accesibilidad funcionales.
- [ ] Dos temas con contraste suficiente y estados accesibles, sin pixel font en contenido técnico.

## Navegación, proveedor y progreso

- [ ] Cambiar AWS→Azure→GCP cambia ejemplos, diagramas, CLI, Terraform, prácticas y docs oficiales.
- [ ] Los conceptos comunes no se duplican ni pierden progreso.
- [ ] Progreso específico de lab mantiene provider+version; cambiar no sobrescribe.
- [ ] Un link con `?cloud=gcp` abre el proveedor correcto y funciona tras recarga.
- [ ] No existe fallback silencioso de un provider a otro.

## Formación

- [ ] 18 módulos de 240 horas son completos según rúbrica editorial.
- [ ] Los temas cubren Linux, redes, IAM, compute, storage, DB, Terraform, Docker, Kubernetes, CI/CD, serverless, arquitectura, resiliencia, SRE, seguridad y FinOps.
- [ ] Cada módulo publicado contiene teoría desarrollada, ejercicios, evaluación, validación, costo y cleanup cuando aplique.
- [ ] Se explica explícitamente la diferencia entre equivalencia conceptual y técnica.

## Laboratorios/Senior

- [ ] Simulación no se describe como cloud real.
- [ ] No se solicitan ni retienen credenciales de proveedor en frontend.
- [ ] Cada lab real advierte posibles cargos y cómo eliminar todos los recursos.
- [ ] Senior Mode incluye 18 escenarios con datos/evidencias y rúbricas; resultados manipulables localmente no son certificados.
- [ ] Se prueban errores y límites de los simuladores.

## Calidad

- [ ] CI verde, typecheck, tests unitarios/E2E, validación editorial, revisión a11y.
- [ ] Buen rendimiento en móvil; activos gráficos optimizados; sin operaciones pesadas bloqueando UI.
- [ ] Documentación de versiones, políticas de marca, licencias y fuentes oficiales.
- [ ] No se declaran features «implementadas» o «certificadas» sin pruebas.

---

# 18. Recomendaciones senior y decisiones que NO tomaría

1. **No construir tres aplicaciones:** tres fuentes de verdad, testing triple y divergencia permanente. Una app, un concepto, tres adaptadores.
2. **No saltar a NestJS por arquitectura ornamental:** el valor inicial está en el contenido y motores interactivos. Backend se justifica por identidad, verificación o ejecución controlada.
3. **No llamar «multicloud» a meter logos de tres proveedores:** enseñar alcance de redes, identidad, servicios no equivalentes, modelo operativo, costo y riesgos.
4. **No vender la ruta como AWS/Azure/GCP Professional certificada:** las certificaciones oficiales son de cada proveedor. El curso puede orientar a exámenes, pero no sustituirlos.
5. **No empezar con 18 módulos vacíos:** hacer una lección vertical completa en tres proveedores antes de escalar authoring.
6. **No ejecutar laboratorios reales sin guardrails:** riesgo financiero, credenciales y recurso residual requieren controles verificables.
7. **No copiar el Gopher ni su arte al producto nuevo:** mantener solo el ADN UI GoPixel y la mascota Cloud aprobada.
8. **No imponer Kubernetes en hosting de una SPA:** enseñar Kubernetes dentro del currículo, no como complejidad innecesaria del producto.
9. **No hacer del selector de proveedor un filtro cosmético:** cada adaptador ha de aportar valor, código y evaluación concreta.
10. **No sacrificar lectura/a11y por estética pixel:** el estilo pixel es ambientación, no interfaz de consola ni tipografía principal.

---

# 19. Prompt de implementación para equipo o agente de código

> Implementa **Cloud Engineering Academy** siguiendo este documento como fuente de verdad. Usa GoPixel Academy únicamente como referencia de diseño/composición y como base tecnológica compatible (Preact + TypeScript + Vite + Signals). Conserva su calidad de experiencia visual: mismo tipo de hero, cards, sidebar, niveles, temas, mini-retos, progreso y Senior Mode, con identidad Cloud propia. Coloca en el header un selector AWS/Azure/GCP visible en desktop/móvil que cambie materiales pedagógicos reales y persistencia por proveedor, sin perder progreso conceptual. Usa **exactamente** la mascota del archivo `assets/cloud-mentor-reference.jpeg` como identidad oficial; no sustituir por una versión graduada. Implementa primero una vertical slice completa de redes virtuales con teoría, contenido específico por nube, simulador verificable, quiz y laboratorio con cleanup. Mantén la app estática y sin credenciales cloud; usa Terraform/Docker como materiales de práctica externa, no para ejecutar en el navegador. Aplica los gates de pruebas, accesibilidad, seguridad y calidad de contenido definidos aquí. Entrega archivos ejecutables, pruebas reproducibles, capturas dark/light/móvil y listado honesto de funcionalidades implementadas frente a pendientes. No crear componentes vacíos, no declarar completados módulos de solo temario y no agregar backend hasta que un requisito real lo justifique.

---

# 20. Anexo: documentos de entrega esperados

Al iniciar el repositorio real, añadir:

- `README.md` — objetivo, estado real, requisitos y demo.
- `docs/architecture/OVERVIEW.md` — arquitectura, diagramas, responsables.
- `docs/ux/UI_SPEC.md` — capturas/comparativas contra GoPixel y tokens.
- `docs/branding/MASCOT.md` — fuente original aprobada, poses y licencias.
- `docs/curriculum/MANIFEST.md` — módulos, resultados, cobertura por nube y estado.
- `docs/security/LAB_SAFETY.md` — costos, credenciales, permisos, destroy, sandbox.
- `docs/quality/DEFINITION_OF_DONE.md` — contenido y criterios verificables.
- `docs/adr/` — decisiones y alternativas.
- `docs/operations/CONTENT_MAINTENANCE.md` — control de versiones cloud y docs oficiales.
- `tests/` — resultados verificables de simuladores y selector.

## Resultado buscado

**Una academia Cloud con la misma personalidad, diseño y experiencia de GoPixel, una mascota ingeniera ya aprobada, un selector que de verdad transforma el aprendizaje entre AWS/Azure/GCP, un programa de ingeniería cloud de 240 horas, prácticas seguras y un Senior Mode exigente.** La complejidad está en calidad de la enseñanza y simulación, no en multiplicar infraestructura de hosting.
