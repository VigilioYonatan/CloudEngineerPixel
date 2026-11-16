# TODO_LO_QUE_DEBE_TENER_ESTA_APP.md

> **CLOUD ENGINEERING ACADEMY · CONTRATO MAESTRO DE PRODUCTO, UX, ARQUITECTURA, CONTENIDOS Y CALIDAD**  
> **Versión de especificación:** 1.0 — 11 de noviembre de 2026  
> **Línea base examinada:** `CLOUD_ENGINEERING_ACADEMY_V9_SENIOR_DEVSECOPS_FINAL.zip`  
> **Producto:** formación integral de ingeniería cloud, de fundamentos a arquitectura profesional, para **AWS, Microsoft Azure y Google Cloud**.  
> **Estado de este archivo:** especificación y plan de aceptación. **No significa que todos sus requisitos estén implementados.**  
> **Regla fundamental:** preservar todos los archivos originales de la V9, migrar mediante cambios controlados y nunca sustituir contenido real por maquetas vacías.

---

## ÍNDICE MAESTRO

1. Cómo interpretar este documento y distinguir realidad de objetivos
2. Visión, objetivos y principios de producto
3. Público, roles y recorridos de aprendizaje
4. Alcance funcional completo y navegación
5. Diseño visual heredado del lenguaje de GoPixel
6. Paletas por AWS, Azure y GCP
7. Mascota oficial, variantes, poses y usos
8. Header y selector multicloud: contrato de comportamiento
9. Inicio / Dashboard público
10. Catálogo, rutas y navegación por niveles
11. Aula, lecciones, teoría y editor de actividades
12. Evaluaciones, cuestionarios y feedback
13. Laboratorios: simulados, locales y reales
14. Simuladores interactivos y motores verificables
15. Senior Mode: experiencia integral de ingeniería
16. Senior Mode: evaluación, rúbrica, historial y revisión docente
17. Progreso, sesiones, exportación e importación
18. Matriz multicloud por capacidad y diferencias relevantes
19. Plan académico de 240 horas y 18 módulos
20. Diseño pedagógico estándar de las 90 unidades
21. Proyectos integradores y portfolio profesional
22. Arquitectura frontend, componentes y estructura de carpetas
23. Modelo de datos y contratos TypeScript
24. Estrategia de contenidos Markdown, validación y versionado
25. Seguridad por diseño, privacidad y riesgos
26. DevSecOps, cadena de suministro y seguridad de CI/CD
27. Biome, TypeScript y estándares de ingeniería
28. Pruebas: unitarias, integración, E2E, accesibilidad y seguridad
29. Accesibilidad, responsive, estados de UI y rendimiento
30. Infraestructura de despliegue, entornos, observabilidad y operación
31. Autenticación, LMS, docentes y laboratorios gestionados futuros
32. Arquitectura del motor de simulaciones y modo offline
33. Analytics educativos y cumplimiento responsable
34. Documentación, mantenimiento y gobernanza del contenido
35. Plan de implementación por etapas
36. Matriz de aceptación por pantalla y proveedor
37. Definition of Done técnico, pedagógico y de seguridad
38. Inventario real de la V9 y brechas pendientes
39. Reglas de compatibilidad, migración y conservación de archivos
40. Checklist maestro de entrega
41. Anexos: matriz de servicios, requisitos de lección, incidentes, comandos y referencias del repositorio

> Las casillas `- [ ]` expresan una **obligación pendiente de demostrar mediante prueba o evidencia**, no la afirmación de que falta el código en todos los casos. Cuando ya exista una implementación V9 se indica expresamente `EXISTE EN V9`, pero sigue siendo necesaria la validación funcional completa donde corresponda.

---

## 1. CÓMO INTERPRETAR EL DOCUMENTO

### 1.1 Estados de ejecución

| Marca | Significado | Requisito para declararlo completo |
|---|---|---|
| `EXISTE EN V9` | Archivo, estructura o funcionalidad identificada en el ZIP de origen. | Compilación, prueba de navegador y revisión técnica correspondiente. |
| `PARCIAL` | Hay un prototipo, cobertura básica o lógica incompleta. | Completar el contrato y superar pruebas objetivas. |
| `PENDIENTE` | Función, contenido o infraestructura aún no presente como solución completa. | Implementación + pruebas + documentación + demostración. |
| `FUTURO CONDICIONAL` | Solo si la academia necesita backend, SaaS, sandboxes o gestión de usuarios. | Diseño aprobado, riesgos y costes evaluados y nuevas pruebas. |
| `NO APLICABLE` | No tiene sentido en la fase local/estática. | Documentar la decisión; no construir por moda. |

La versión V9 se entrega como **frontend educativo local**. No posee autenticación verificada, ejecución de Terraform desde el navegador, cuentas cloud administradas, revisión docente autenticada ni certificados oficiales. La declaración «240 horas» es una **malla de estudio proyectada**, no 240 horas de clases completas ya auditadas. Los ejercicios Senior actuales emplean **datos sintéticos** y su nota automática mide principalmente completitud.

### 1.2 Jerarquía de decisiones

1. Seguridad y conservación de datos/archivos.
2. Exactitud técnica y claridad sobre la naturaleza simulada de los entornos.
3. Aprendizaje comprobable y diseño pedagógico.
4. Accesibilidad y buena experiencia móvil.
5. Consistencia con GoPixel y con la mascota oficial.
6. Rendimiento y mantenibilidad del stack.
7. Funciones opcionales, gamificación, animaciones y ornamento.

### 1.3 Regla de control de cambios

- Conservar **la totalidad** de los 291 archivos originales del ZIP V9 salvo autorización específica, documentada y respaldada para eliminar alguno en futuras versiones.
- Los cambios deben revisar su impacto sobre rutas, progresos locales anteriores, contenidos y pruebas.
- Nunca reescribir archivos originales para «hacer que el manifiesto pase»; registrar cambios con sus hashes y regenerar el manifiesto según una regla explícita.
- Mantener separado el documento de requisitos de los resultados reales de QA.
- No añadir porcentajes ficticios de avance o distintivos de producción cuando faltan pruebas.
- Las nuevas versiones deben tener changelog, inventario, checksums, instrucciones reproducibles y riesgos conocidos.

---

## 2. VISIÓN DEL PRODUCTO

### 2.1 Nombre y posicionamiento

**Cloud Engineering Academy** es una academia interactiva de computación en la nube que enseña capacidades transferibles entre AWS, Azure y GCP. Hereda el **lenguaje visual de GoPixel Academy**, pero enseña un ámbito propio: infraestructura, operaciones, automatización, seguridad, confiabilidad y arquitectura cloud.

**Promesa académica:** «Aprende el concepto común, domina la implementación de tu proveedor y demuestra criterio frente a problemas reales de producción». No prometer trabajo, certificación oficial ni suficiencia profesional por solo completar casillas.

### 2.2 Objetivos observables

- Un estudiante principiante comprende red, identidad, cómputo, almacenamiento, presupuesto y región antes de desplegar recursos.
- Un estudiante intermedio implementa infraestructura reproducible, automatización, contenedores, serverless, conectividad y observabilidad.
- Un estudiante avanzado analiza amenazas, disponibilidad, costos, fallos, calidad de servicios y decisiones de arquitectura.
- La ruta principal se puede cambiar en cualquier momento sin rehacer el currículo conceptual.
- Senior Mode enseña investigación basada en evidencias, mitigación segura, reversión, validación y postmortem.
- El desarrollo de la academia aplica el mismo rigor que enseña: pruebas, seguridad de suministro, estándares y accesibilidad.

### 2.3 Principios innegociables

1. **Una academia, tres proveedores, sin tres clones.**
2. **Capacidades compartidas; comportamientos específicos por proveedor.**
3. **Primero explicar, luego practicar, después justificar decisiones.**
4. **Sin credenciales en frontend ni despliegues destructivos automáticos.**
5. **Los simuladores nunca fingen desplegar recursos reales.**
6. **Costos, seguridad y limpieza presentes en todos los laboratorios reales.**
7. **El modo Senior no se aprueba por acertar una respuesta de opción múltiple.**
8. **Los materiales deben ser auditables y medibles, no colecciones de tarjetas.**
9. **Conservar el diseño reconocido por el usuario y el personaje seleccionado.**
10. **Frontend estático primero; backend solo por una necesidad demostrada.**

---

## 3. DESTINATARIOS, ROLES Y RECORRIDOS

### 3.1 Perfiles de estudiantes

- **Principiante absoluto:** necesita explicaciones de IP, HTTP, Linux, identidades y costos; nunca obligarlo a conocer previamente la consola cloud.
- **Desarrollador de aplicaciones:** conoce código, pero necesita infraestructura, CI/CD, observabilidad y servicios de nube.
- **Administrador/DevOps/Cloud Engineer:** necesita redes, IaC, seguridad, operación, contenedores y resolución de incidentes.
- **Arquitecto de soluciones aspirante:** necesita requisitos no funcionales, modelos de amenazas, riesgos, SLO, DR y trade-offs.
- **Instructor/revisor:** necesita rúbricas, reportes y criterios de validación, sin confundir revisión local con autenticación formal.

### 3.2 Modos de aprendizaje

| Modo | Objetivo | Resultado |
|---|---|---|
| Explorar | Consultar el catálogo, requisitos y ruta. | Entender por dónde comenzar. |
| Aprender | Leer teoría y ejemplos, resolver microejercicios. | Base conceptual. |
| Practicar | Simulación y laboratorio guiado. | Comportamiento reproducible. |
| Construir | Laboratorios locales o propios de cloud. | Entregable ejecutable y documentado. |
| Senior Mode | Investigar y decidir con evidencias. | Informe y postmortem revisable. |
| Repasar | Detectar debilidades y repetir actividades. | Mejora explicable, no solo más puntos. |

### 3.3 Roles de la fase estática y fase futura

- **Actual:** alumno local y revisor local opcional, ambos en el navegador; sin identidad verificada.
- **Futuro condicional:** estudiante autenticado, instructor autenticado, autor de contenido, administrador de plataforma, operador de laboratorios y auditor. Cada rol requiere RBAC del lado del servidor, auditoría, separación de datos y controles de sesión.
- Nunca simular un sistema de permisos real mediante botones ocultos en el frontend.

---

## 4. ALCANCE FUNCIONAL Y NAVEGACIÓN

### 4.1 Menú principal obligado

1. **Inicio:** hero, mascota, niveles, selección de proveedor, vista de progreso y entrada a Senior.
2. **Aprender:** lista filtrable de 18 módulos y 90 unidades.
3. **Aula:** explicación, ejemplos, ejercicios, evaluación y descarga de recursos por unidad.
4. **Laboratorios:** guías con instrucciones, seguridad, evidencia y cleanup.
5. **Simuladores:** motores CIDR, IAM, escalamiento, SLO y decisiones de arquitectura, ampliables.
6. **Senior Mode:** 18 incidentes, expedientes por proveedor, investigaciones, diagnóstico, contención, informe y revisión.
7. **Mi progreso:** logros académicos, resultados, exportación/importación y próximos pasos.
8. **Configuración:** nube, tema, accesibilidad, preferencias, exportación, eliminación controlada y privacidad.

**EXISTE EN V9:** menú responsive, hash navigation, pantallas principales y progreso en cliente. **PENDIENTE DE ACEPTACIÓN:** navegación real E2E, focus/teclado, móviles, errores y casos límite.

### 4.2 Contrato de navegación

- Todas las acciones hacen algo real o están claramente marcadas como futuras: prohibidos botones decorativos que simulen funcionalidad.
- El logo vuelve a inicio; «Continuar» recupera módulo/unidad cuando exista progreso.
- El menú móvil se cierra al navegar y no bloquea scroll accidentalmente.
- Breadcrumb y encabezado muestran siempre módulo, nivel y proveedor activo.
- La ruta activa es inequívoca para lector de pantalla y usuario visual.
- Confirmar antes de borrar progreso, sustituir un expediente o importar sobre un borrador.
- Si una ruta deja de existir tras cambios de contenido, mostrar recuperación y enlace de retorno, no pantalla vacía.
- La navegación tras recargar debe restaurar una vista coherente sin exponer un estado incompleto.

### 4.3 Estados comunes de cada pantalla

`loading` si hay recursos pendientes; `ready`; `empty`; `error`; `offline`; `permission-denied` si hay roles futuros; `success`; `unsaved-changes`; `storage-error`. Incluir siempre mensaje comprensible y acción recuperable; no colorear silenciosamente un control sin feedback.

---

## 5. DISEÑO VISUAL: GOPIXEL COMO LENGUAJE, CLOUD COMO IDENTIDAD

### 5.1 ADN visual

Mantener la composición del referente GoPixel: hero fuerte con mascot art, navegación compacta, tarjetas legibles de nivel, jerarquías claras, iconografía tecnológica, bloques de código, barras de avance, etiquetas de laboratorio, estados de éxito y una estética de ingeniería moderna. La nueva marca es **Cloud Engineering Academy**, no GoPixel renombrado superficialmente.

### 5.2 Sistema de diseño

- **Tokens semánticos, no valores repetidos:** `--accent`, `--accent-strong`, `--accent-soft`, `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`, `--success`, `--warning`, `--danger`, `--focus`.
- **Spacing:** escala recomendada de 4/8/12/16/24/32/48/64 px; espaciar por componentes, no por ajustes arbitrarios.
- **Radios:** pequeños para badges/inputs, medios para tarjetas, mayores para hero y módulos Senior.
- **Tipografía:** interfaz legible con escala consistente; código monoespaciado y scroll seguro; no descargar fuentes propietarias sin licencia.
- **Iconos:** usar `lucide-preact` existente, con texto y `aria-label` cuando el significado no sea evidente.
- **Elevación:** sombras discretas, bordes y superficies; el fondo no debe disminuir el contraste.
- **Animación:** transiciones suaves para cambio de proveedor, hover y progreso; respetar `prefers-reduced-motion`.
- **Layout:** container de ancho máximo definido, grids que colapsan limpiamente, sidebar sticky solo donde no tape controles.

### 5.3 Dark y light mode

- Ambos temas son de primera clase, no una inversión automática de colores.
- Contraste mínimo WCAG AA y foco visible para enlaces, controles, campos y respuestas.
- Guardar preferencia local; al entrar por primera vez respetar preferencia del sistema salvo diseño aprobado distinto.
- Las imágenes deben mantener legibilidad en ambos temas, sin halos blancos dañinos.
- Los gráficos y resultados nunca dependen únicamente del color.

### 5.4 Responsive obligatorio

| Ancho orientativo | Comportamiento requerido |
|---|---|
| 320–389 px | Una columna, textos sin recortes, controles accesibles, selector fácil de tocar. |
| 390–599 px | Hero apilado, navegación colapsada y tarjetas verticales. |
| 600–899 px | Grids adaptativos y sin overflow horizontal. |
| 900–1279 px | Dos columnas para vistas que lo permitan; sidebars no invasivas. |
| ≥1280 px | Hero en dos columnas, tarjetas múltiples, espacios equilibrados. |

Pruebas obligatorias: zoom al 200%, 400% cuando aplique, orientación vertical/horizontal, teclado, contenido de códigos largos, menús desplegables y lectura de tablas de laboratorios.

---

## 6. IDENTIDAD MULTICLOUD: PALETAS Y MARCA

### 6.1 Tokens por proveedor

| Ruta | Acento base V9 | Complementos propuestos | Iconografía | Tono emocional |
|---|---|---|---|---|
| AWS | `#FF9900` | naranja profundo, azul marino, neutros | nube, terminal, infraestructura | pragmático y operativo |
| Azure | `#32A9F4` | azules medios/profundos, cian, neutros | nube, red, identidad | claro y empresarial |
| GCP | `#34A853` | verde base con azul/amarillo/rojo secundarios | red global, datos, nube | moderno y multicolor |

**EXISTE EN V9:** `providers` define esos acentos y rutas de mascota. **A VERIFICAR:** cobertura completa de CSS, contraste de botones, inputs, charts, tooltips y Senior Workbench. El color principal puede cambiar; los estados semánticos de error, advertencia o éxito NO deben perder su significado.

### 6.2 Al elegir un proveedor DEBE cambiar

- El acento, fondos destacados, focus rings, elementos seleccionados y CTA; manteniendo accesibilidad.
- La mascota específica, preservando la identidad principal del personaje.
- Nombre y jerarquía de servicio (por ejemplo EC2/VM/Compute Engine, VPC/VNet/VPC).
- CLI, snippets, Terraform, controles IAM, documentación y ejemplos por proveedor.
- Contexto de los casos Senior, guías y expedientes guardados.
- Etiquetas de progreso de los ejercicios específicos de esa nube.
- Enlace a documentación oficial vigente de la capacidad correspondiente.

**NO DEBE cambiar:** la teoría esencial independiente del proveedor; las 18 capacidades del currículo; conclusiones de seguridad universales; el rendimiento del navegador; el progreso conceptual compartido; el idioma y preferencia de accesibilidad.

### 6.3 Reglas legales y neutralidad

- AWS, Azure y GCP se mencionan de forma descriptiva, como plataformas educativas no patrocinadoras.
- Evitar imitar marcas o inducir afiliación oficial; enlazar fuentes de proveedores.
- Revisar licencias de logos y derechos de uso de las imágenes antes de distribución comercial.
- No presentar ofertas, tarifas o certificaciones como actuales sin fecha de verificación.

---

## 7. MASCOTA OFICIAL — CONTRATO VISUAL

### 7.1 Referencia inequívoca

La mascota aprobada es una **nube ingeniera simpática, con lentes, headset, equipo táctico/tecnológico y panel holográfico**. La imagen de referencia compartida por el propietario es el origen canónico. **No sustituirla** por la variante de birrete, casco amarillo, superhéroe sin lentes ni un robot genérico.

**Assets de V9 identificados:**

- `public/assets/cloud-mentor-original.jpg`
- `public/assets/cloud-mentor-azure.png`
- `public/assets/cloud-mentor-gcp.png`
- `public/assets/cloud-mentor-poses.png`
- `public/assets/cloud-mentor-senior.png`

Estos archivos se preservarán íntegros. La referencia original tiene prioridad si las variantes no son perfectamente consistentes.

### 7.2 Rasgos permanentes del personaje

Rostro de nube redondeado; lentes visibles; ojos y cejas expresivos; headset con micrófono; equipo de ingeniero cloud azul/oscuro con iluminación tecnológica; guantes y botas; panel holográfico o blueprint cuando proceda; proporciones chibi; contorno legible y contraste con el entorno. Mantener una silueta reconocible incluso a 64 px.

### 7.3 Poses requeridas en la biblioteca visual

1. Bienvenida / saludar desde Inicio.
2. Explicar concepto en aula, señalando un diagrama.
3. Escribir o programar en terminal/laptop.
4. Celebrar un quiz aprobado (sin prometer competencia certificada).
5. Pensando ante una decisión difícil.
6. Mostrar alerta en incidente Senior.
7. Investigar logs y métricas.
8. Proteger un recurso / seguridad IAM.
9. Conectar nodos de red.
10. Desplegar IaC/Terraform.
11. Operar Kubernetes.
12. Revisar costos y FinOps.
13. Recuperar de un fallo / postmortem.
14. Mostrar una certificación interna de finalización *no oficial* si se implementa.
15. Error / resultado fallido con tono respetuoso.
16. Empty state sin progreso con invitación a iniciar.
17. Variante AWS de la mascota canónica.
18. Variante Azure de la mascota canónica.
19. Variante GCP de la mascota canónica.
20. Variante Senior Mode para análisis de incidentes.

### 7.4 Reglas de integración del personaje

- Entregar formatos web optimizados y originales conservados por separado; `srcset`/responsive si hay varios tamaños.
- ALT útil si comunica contenido; ALT vacío si es decorativo (evitar repetición con texto).
- Evitar animaciones que distraigan en lectura o sobrecarguen GPU.
- El cambio de nube no debe provocar un salto de layout; reservar espacio de imagen.
- Paleta del traje adaptada con discreción, **sin alterar la identidad base**.
- No inventar nuevas versiones canónicas sin aprobación visual.

---

## 8. HEADER Y SELECTOR AWS / AZURE / GCP

### 8.1 Composición

**Desktop:** logo + navegación `Inicio / Aprender / Simuladores / Senior Mode / Mi progreso` + selector de proveedor visible + botón tema + configuración. **Móvil:** logo, selector sencillo y menú accesible. El cambio de proveedor es una función principal, nunca queda oculto únicamente en Configuración.

### 8.2 Comportamiento transaccional del selector

**Al elegir AWS → Azure, por ejemplo:**

1. Guardar `provider = azure` de forma local.
2. Actualizar la URL (`?cloud=azure` u otra ruta estable documentada).
3. Actualizar paleta y mascota sin recarga completa.
4. Mantener la unidad conceptual visible cuando exista una equivalente.
5. Resolver la implementación técnica Azure de la unidad; si no existe, mostrar `contenido específico pendiente`, no insertar comandos AWS con rótulo Azure.
6. Recuperar el progreso exclusivo Azure y conservar el progreso AWS sin sobrescribirlo.
7. Separar sesiones Senior y sus evidencias por `provider + incidentId`.
8. Si existe un import/file picker o un borrador sin guardar, terminar o confirmar la operación antes de mutar el contexto.
9. Comunicar el nuevo proveedor a lectores de pantalla sin interrupciones innecesarias.
10. No mezclar resultados de ejercicios, roles, estados ni cuadernos de otra nube.

### 8.3 Estado y URLs

- Tipos estrictos: `Provider = 'aws' | 'azure' | 'gcp'`.
- El valor inicial se resuelve con precedencia documentada: URL válida → preferencia local válida → AWS por defecto.
- Entradas inválidas deben normalizarse sin errores de ejecución.
- El cambio se refleja en todos los componentes consumidores de contexto, incluidas páginas ya abiertas.
- Las decisiones de tema (`light` / `dark`) son independientes del proveedor.
- Definir migraciones explícitas de versiones de almacenamiento, no borrar storage ante un fallo.

### 8.4 Pruebas mínimas

- [ ] Cambiar AWS→Azure→GCP→AWS desde Inicio, Aula, Simuladores y Senior.
- [ ] Verificar acento, mascota, CLI, nombres de servicios y documentación correspondientes.
- [ ] Recargar cada ruta y verificar persistencia/URL.
- [ ] Cambiar de nube durante un formulario, una exportación y una importación.
- [ ] Confirmar aislamiento de progreso y sesiones Senior.
- [ ] Confirmar que el lector de pantalla anuncia selección y que funciona con teclado.
- [ ] Confirmar tema claro/oscuro con cada proveedor y contraste AA.

---

## 9. INICIO / DASHBOARD DE ENTRADA

La portada es la puerta de entrada al producto y debe conservar el impacto de GoPixel, pero explicar inmediatamente el valor multicloud.

### 9.1 Bloques obligatorios

1. Hero con claim principal, promesa realista y mascota del proveedor seleccionado.
2. CTA «Empezar» o «Continuar mi ruta» según progreso, ambos funcionales.
3. CTA «Explorar Senior Mode» y aviso de su naturaleza simulada.
4. Resumen `18 módulos · 240 h planificadas · 3 rutas cloud`.
5. Tres tarjetas de nivel (Fundamentos, Ingeniería, Arquitectura) con horas, competencia y acceso.
6. Tres tarjetas de proveedor con estado seleccionado y diferencias esenciales.
7. Vista breve de herramientas: simuladores, talleres, laboratorios, arquitectura y Senior Mode.
8. Avance del estudiante si existe progreso; estado vacío si es primera visita.
9. Sección «Aprende sin riesgos»: presupuesto, cleanup, credenciales y alcance de laboratorios.
10. Footer con privacidad, seguridad, documentación y descargo de no afiliación.

### 9.2 Criterios de aceptación

- Hero sin texto cortado a 320 px y sin sobreposición de mascota.
- CTA no abre una ruta rota; «Continuar» llega a la siguiente unidad.
- Todos los conteos se derivan de datos tipados y no de números escritos manualmente.
- El catálogo de módulos y los contadores cambian si el currículo cambia.
- No mostrar «certificado profesional» por completar un simulador.

---

## 10. CATÁLOGO Y RUTAS DE FORMACIÓN

### 10.1 Filtros y exploración

- Lista de 18 módulos con título, descripción, nivel, horas, requisitos, habilidades, estado y progreso.
- Búsqueda por módulo, tema y habilidades; normalizar acentos para español.
- Filtro por nivel y estado de avance; opción para reiniciar filtros.
- Señalizar módulos recomendados, bloqueados por prerrequisito (solo si se habilita la regla) y completados.
- Resumen de teoría común y ejemplos propios de la nube seleccionada.
- «Ver ruta completa» y «Continuar» con navegación predecible.
- Acceso a vista de competencias que muestra qué demuestra cada módulo.

### 10.2 Progreso académico

Separar explícitamente:

1. **Teoría vista** (nunca equivale a competencia).
2. **Quiz aprobado** con umbral visible y posibilidad de reintento.
3. **Simulador superado** con condiciones verificables.
4. **Práctica local completada** con evidencia específica.
5. **Laboratorio real validado** por script o instructor autorizado (futuro, no inventar).
6. **Incidente Senior revisado** (local o docente autenticado, según fase).

No sumar todas esas métricas como un único porcentaje ambiguo. Mostrar progreso común + progreso por proveedor por separado.

---

## 11. AULA Y EXPERIENCIA DE UNA UNIDAD

### 11.1 Esqueleto de clase obligatoria

Cada lección debe incluir, en este orden lógico adaptable:

1. Título claro y competencia observable.
2. Requisitos previos, tiempo estimado y dificultad.
3. Motivación con problema real (qué se rompe si se ignora).
4. Modelo mental explicado desde cero.
5. Diagrama original accesible; descripción textual de la arquitectura.
6. Glosario de términos técnicos y expansión de siglas.
7. Implementación AWS, Azure o GCP según selección.
8. Fragmentos CLI/IaC/código con explicación, permisos y efecto.
9. Diferencias que **no** son equivalentes entre proveedores.
10. Actividad guiada y actividad de diagnóstico sin pista inmediata.
11. Seguridad por diseño: IAM mínimo, redes y secreto/PII cuando aplique.
12. Costos/riesgos y plan de eliminación si crea infraestructura.
13. Laboratorio o simulación con instrucciones verificables.
14. Preguntas con feedback específico y enlaces a refuerzo.
15. Rúbrica de evidencia y condiciones de finalización.
16. Material de ampliación y documentación oficial con fecha de revisión.
17. Siguiente unidad y navegación anterior/siguiente.

### 11.2 Componentes de aula

- Sidebar navegable por temas y estado del estudiante.
- Lector de Markdown sanitizado si se incorporan contenidos externos; no renderizar HTML arbitrario.
- Tabs de concepto y nube cuando el mismo tema lo permita; selector del header sigue siendo canónico.
- Bloques de código con copiar, lenguaje, comentarios y advertencias de riesgo.
- Diagramas con versión textual y opción ampliación.
- Cuadros comparativos pequeños, no enormes tablas horizontales en móvil.
- Anclajes de contenido, glosario contextual, atajos de teclado opcionales.
- Indicador de última revisión técnica y versión del material.
- Mensaje «Simulación educativa» donde no se ejecuta infraestructura real.
- Autosave fiable de apuntes/actividad y aviso si falla.

### 11.3 Calidad de teoría

- Evitar repetir la misma explicación genérica en 90 temas; cada unidad debe enseñar una competencia distinta.
- Cualquier comando debe declarar si es **solo lectura, crea costos o destruye recursos**.
- Probar ejemplos con versiones fijadas cuando el entorno lo permita.
- Separar lo que es *concepto duradero* de lo que es *configuración cambiante*.
- No dar por válida una captura de consola como única prueba.

---

## 12. QUIZZES Y EVALUACIÓN FORMATIVA

### 12.1 Requisitos

- Banco de preguntas por competencia, no una sola respuesta memorizable por módulo en la versión final.
- Preguntas de selección única, selección múltiple, lectura de configs, orden de pasos, depuración y predicción de consecuencias.
- Feedback correcto/incorrecto **explicativo** y orientado a conceptos, con referencia del material.
- No revelar la respuesta antes de que el alumno tome una decisión cuando se evalúa retención.
- Registrar intentos y mejoras sin castigar reintento pedagógico.
- Separar evaluaciones formativas de sumativas; umbrales y número de intentos configurables.
- Aleatorizar distractores solo cuando sea pedagógicamente seguro; tests deterministas de motor.
- Distinguir respuestas válidas condicionadas por proveedor y versión.
- Si hay modo de examen, no llamarlo certificación AWS/Azure/GCP oficial.

### 12.2 Criterios de aceptación

- [ ] Pregunta y feedback visibles con lector de pantalla y teclado.
- [ ] Un reintento no borra indebidamente el mejor resultado ni el historial.
- [ ] No duplicar créditos/XP por refrescar o pulsar repetidamente.
- [ ] La calificación no se puede considerar prueba anti-fraude en un frontend local.
- [ ] El alumno puede revisar por qué falló una pregunta.

---

## 13. LABORATORIOS: TRES MODALIDADES SIN CONFUSIONES

### 13.1 Modalidad A: simulador local en navegador

- No crea recursos cloud ni consume cuota del proveedor.
- Datos sintéticos indicados de forma visible.
- Permite repetir, explicar decisiones y exportar resultados como material didáctico.
- Resultados reproducibles mediante entradas y semilla fija si aplica.

### 13.2 Modalidad B: laboratorio local

- Tecnologías recomendadas: Docker, Docker Compose, Kind, Terraform con mocks/test cuando corresponda, scripts locales y fixtures versionados.
- Instrucciones para Linux, Windows y macOS cuando sean diferentes; requisitos de CPU/RAM.
- Variables de entorno de ejemplo sin secretos reales.
- Scripts `setup`, `verify`, `cleanup`; pruebas idempotentes y alcance explícito.
- Si un laboratorio usa servicios emulados, declarar limitaciones respecto de cloud real.

### 13.3 Modalidad C: laboratorio en cuenta AWS/Azure/GCP propia

- Obligatoriamente mostrar advertencia de facturación, permisos, cuota, región, duración aproximada, preflight, estimación de costo con fecha/fuente y cleanup verificable.
- Usar cuenta/proyecto/suscripción aislado; nunca entornos productivos.
- Requerir MFA e identidades temporales; evitar claves permanentes.
- Dar pasos de validación en CLI, consola y Terraform según corresponda, sin prometer resultados homogéneos.
- Para destruir recursos, exigir revisión explícita del plan y del alcance; no ejecutar `destroy` automático contra recursos ajenos.
- La plataforma estática no debe manejar credenciales cloud ni utilizar `localStorage` para secretos.

### 13.4 Contrato mínimo de una guía de laboratorio

```yaml
id: network-private-connectivity-aws
version: 1
provider: aws
module: advanced-network
level: intermediate
mode: local-or-own-account
estimated_minutes: 90
prerequisites: [linux-basics, networking-cidr]
cost_warning: true
permissions_minimum: "documentar por comando/recurso"
setup_steps: []
tasks: []
verification: []
evidence: []
cleanup: []
rollback: []
links: []
reviewed_at: "YYYY-MM-DD"
```

El YAML es un **contrato propuesto**, no un parser existente en V9.

### 13.5 Cobertura de materiales actual y meta

**EXISTE EN V9:** 54 guías Markdown de módulo por proveedor, ejemplos Terraform iniciales `labs/aws/main.tf`, `labs/azure/main.tf`, `labs/gcp/main.tf`, 18 cuadernos Senior comunes y 54 cuadernos Senior especializados, además de guías OIDC DevSecOps. **PENDIENTE:** ejecución/validación real de los ejercicios, scripts completos de evaluación, cobertura por las 90 unidades, control de costos medido y fixtures reproducibles en todos los labs.

---

## 14. SIMULADORES INTERACTIVOS Y MOTORES

### 14.1 Los cinco simuladores existentes como base

| Motor | Existe V9 | Qué debe demostrar | Pruebas de borde obligatorias |
|---|---|---|---|
| CIDR | Sí | Rango IP, prefijo, hosts/direcciones, subnetting y reservas por proveedor cuando aplique. | `/0`, `/32`, entradas inválidas, overflow, /31, reservadas cloud. |
| IAM simplificado | Sí | Evaluar allow/deny en modelo **explícitamente didáctico**. | Explicit deny, múltiples políticas, recurso distinto, acción no admitida. |
| Capacidad/autoescalado | Sí | Relación entre carga, réplicas y dependencias. | Carga 0, límites, DB saturada, histéresis, cooldown. |
| SLO / error budget | Sí | Tiempo de error tolerable y efecto de incidentes. | 100 %, 99.9 %, periodos distintos, redondeo y presupuesto agotado. |
| Architecture Decision Studio | Sí | Comparar opciones y trade-offs según requisitos. | Empates, restricciones incompatibles, supuestos ausentes. |

### 14.2 Simuladores que **deberían agregarse** para un programa realmente completo

1. **Routing Lab:** tablas de rutas, NAT, IGW, private endpoints, DNS y topologías; contraste con peculiaridades de AWS, Azure y GCP.
2. **IAM Policy Lab avanzado:** identidades, resource policies, herencia, condiciones y modelos distintos por proveedor. No afirmar que un modelo parcial reproduce evaluadores oficiales.
3. **Kubernetes Failure Lab:** pods, recursos, probes, rollout, HPA, network policies, logs y correlación de eventos.
4. **Terraform Plan Lab:** diffs, state, cambios destructivos, drift, locking, imports, revisión y aprobación.
5. **Load Balancing Lab:** health checks, latencia, distribución, sticky sessions, failure domains.
6. **FinOps Scenario Lab:** costos por unidad de trabajo, reservas/descuentos, transferencia/egress, storage tiers y presupuestos; precios fechados, no estáticos sin fuente.
7. **Observability Lab:** logs, traces, métricas, incident timeline, alert fatigue y causalidad.
8. **Disaster Recovery Lab:** decisiones RTO/RPO, backups, replicación, failover y retorno.
9. **Messaging / Idempotency Lab:** duplicados, DLQ, reintentos, compensación, consistencia y protección de transacciones.
10. **Architecture Canvas:** arrastrar/seleccionar componentes, justificar topología y exportar ADR sin afirmar validación automática de calidad de arquitectura.

### 14.3 Contrato técnico de un simulador

- Un **motor puro** recibe entrada tipada y devuelve salida tipada y explicaciones, sin depender del DOM.
- UI accesible y separada del cálculo; entradas normalizadas con rangos y mensajes precisos.
- Fixtures cubren casos normales, límites y falsos supuestos.
- «Reiniciar», «explicar resultado», «copiar datos», «descargar reporte» y «repetir» funcionan de verdad.
- No usar fórmulas aproximadas como si fueran tarifas o políticas oficiales.
- Cada simulador documenta versión, modelo, simplificaciones, casos no representados y referencias.
- Nunca aceptar texto arbitrario como JavaScript ejecutable; cero `eval`, `new Function` o scripts de usuario sin sandbox aislado.

---

## 15. SENIOR MODE — LA DIFERENCIA PRINCIPAL DE LA ACADEMIA

### 15.1 Propósito y alcance

Senior Mode es un **entorno de razonamiento técnico e investigación de incidentes cloud**. No es un simple banco de quizzes, una consola conectada a producción ni una certificación profesional automática. El estudiante debe observar señales, proponer hipótesis, valorar impacto, investigar, decidir una contención proporcional, planificar reversión y demostrar recuperación. La interfaz debe conservar la estética de GoPixel, pero adoptar una experiencia más seria: consola de incidentes, línea de tiempo, evidencias, nivel de gravedad, runbooks y reportes.

### 15.2 Inventario de 18 casos existentes en V9

| ID | Incidente | Competencias clave | Evidencia mínima esperada |
|---|---|---|---|
| S01 | Cambio destructivo en Terraform | IaC, state, plan, rollback, aprobaciones | Plan señalado, impacto, restauración y aprobación. |
| S02 | Exceso de acceso IAM | Least privilege, identidad, threat modeling | Principales afectados, política efectiva, reparación y auditoría. |
| S03 | Secreto filtrado en repositorio | DevSecOps, rotación, incidente | Alcance, revocación, rotación, análisis histórico y prevención. |
| S04 | Servicio cae después de desplegar | CI/CD, health checks, rollback | Timeline, cambio sospechoso, rollback y métricas recuperadas. |
| S05 | Subred sin acceso a base de datos | Rutas, NSG/SG/firewalls, DNS, puertos | Diagrama de paquetes, rutas y prueba de conectividad. |
| S06 | Cargos inesperados | FinOps, tags, cuotas, presupuesto | Hipótesis de consumo, costos atribuibles y mitigación segura. |
| S07 | Kubernetes CrashLoopBackOff | K8s, logs, probes, recursos | Eventos, logs, causa, mitigación y rollout saludable. |
| S08 | Backup imposible de restaurar | DR, RPO/RTO, pruebas de restore | Backup utilizable, tiempo de recuperación, pérdida potencial. |
| S09 | Cloud storage expuesto | Object storage, IAM, políticas | Alcance, rutas de exposición, cierre y auditoría. |
| S10 | SLO bajo presión | SLI/SLO, error budget, prioridades | Cálculo del budget, impacto, decisión de release y seguimiento. |
| S11 | Cuello de botella por latencia | Tracing, performance, dependencias | Traza correlacionada, dependencia responsable y experimento. |
| S12 | Nodo Kubernetes comprometido | Respuesta a incidentes, workloads, aislamiento | Contención de nodo, evidencia forense segura y recuperación. |
| S13 | Falla regional | HA, DR, failover, datos | RTO/RPO, estado replicado, failover y verificación de negocio. |
| S14 | Eventos duplicados en cobros | Mensajería, idempotencia, consistencia | Claves idempotentes, duplicados, compensación y pruebas. |
| S15 | Pipeline sin supply-chain controls | SBOM, OIDC, procedencia, firmas | Dependencias fijadas, artefactos verificados, identidad corta. |
| S16 | Autoescalado empeora la caída | Saturación de dependencias, límites | Tráfico, colas, conexiones y plan de estabilización. |
| S17 | ¿Multicloud o complejidad accidental? | Arquitectura, TCO, ADR | Requisitos, riesgos, matriz económica y decisión argumentada. |
| S18 | Defensa de arquitectura empresarial | Solución integral, SLO, RTO/RPO | Diagrama, threat model, presupuesto, pruebas y defensa. |

**EXISTE EN V9:** definición de los 18 casos en `src/data/senior.ts`, investigación en `src/SeniorWorkbench.tsx`, diagnósticos (`seniorDiagnostics.ts`), playbooks (`seniorPlaybooks.ts`), prácticas por proveedor (`seniorPractices.ts`), 18 cuadernos generales y 54 cuadernos especiales. **Por reforzar:** profundidad de escenarios, fuentes realistas anonimizadas, evaluación humana supervisada y pruebas E2E con navegador ejecutado.

### 15.3 Flujo completo por expediente

**Fase 0 — Briefing**

- ID estable de incidente, título, gravedad, servicio/competencia, objetivos, duración estimada y prerequisitos.
- Contexto de negocio, usuarios afectados, ventana de incidentes y límites conocidos.
- Advertencia de que los registros son sintéticos y sin datos personales.
- Recomendaciones de trabajo seguro y criterios de éxito.

**Fase 1 — Investigación**

- Mostrar logs, eventos, métricas, configuración y timeline; cada artefacto tiene `evidenceId`, fuente, tiempo, proveedor, integridad y descripción.
- Permitir inspeccionar, anotar y asociar evidencias a hipótesis.
- Aclarar qué valores son hechos, qué son supuestos y qué información falta.
- Registrar señales examinadas de forma persistente por caso y nube.
- No desbloquear decisiones peligrosas sin mostrar contexto/advertencia apropiada.

**Fase 2 — Diagnóstico**

- Plantear varias hipótesis plausibles, con distractores razonables.
- Exigir razonamiento vinculado a dos o más evidencias y señalar contradicciones.
- Mostrar feedback después del intento; permitir corrección con historial.
- Evitar que el diagnóstico sea siempre la primera opción.

**Fase 3 — Decisión y contención**

- Ofrecer acciones con trade-offs: impacto, tiempo, reversibilidad, seguridad y costos.
- Incluir acciones inseguras como distractores educativos, con explicación de por qué se descartan.
- Confirmar decisiones, registrar reintentos y evitar duplicar completitud por doble clic.
- Definir mitigación temporal y reparación permanente por separado.

**Fase 4 — Informe**

Campos mínimos: `causa`, `evidencia`, `impacto`, `hipótesis descartadas`, `mitigación`, `reversión`, `validación`, `riesgos residuales`, `comunicación`, `acciones preventivas` y `fuentes`. V9 exige al menos causa, mitigación, reversión, validación y citas a evidencias; los demás campos son evolución profesional recomendada.

**Fase 5 — Evaluación**

- Calcular **completitud automática** separada del **juicio técnico docente**.
- Mostrar qué faltó y permitir reabrir el expediente sin falsear resultados.
- Exportar un expediente JSON de caso con versión, proveedor, ID, datos permitidos y nota de simulación.
- En revisión docente, ofrecer puntuación argumentada, comentarios, estado de revisión e identidad **solo si hay autenticación real**; en V9 debe decir «revisión local no autenticada».

**Fase 6 — Repetición y postmortem**

- Historial de intentos con fecha, decisión, señales consultadas y revisión.
- Postmortem blameless: qué ocurrió, por qué, cómo se detectó, qué cambió, señales y acciones de aprendizaje.
- Comparación de intentos sin borrar decisiones previas ni confundir proveedores.
- Recomendaciones de unidades concretas para reforzar capacidades débiles.

### 15.4 UX Senior obligatoria

- Catálogo de 18 expedientes con filtros por gravedad, categoría y estado.
- Hero especial con mascota Senior y aviso de simulación.
- Lista de objetivos y checklist de evidencias.
- Vista de expediente 2 columnas en desktop; una columna en móviles.
- Etapas navegables, pero con bloqueos razonables de evaluación donde corresponda.
- Panel de evidencias, terminal sintética, señales y datos de sistema.
- Campos de texto amplios con autosave, contadores/limitaciones comprensibles.
- Comando por proveedor con etiqueta `lectura / escritura / potencialmente destructivo`.
- Feedback respetuoso y señal de riesgo en acciones inseguras.
- Exportación de JSON de caso, importación con validación y confirmación.
- Descarga del cuaderno Markdown del proveedor/caso correspondiente.
- Revisión docente local opcional separada del informe del estudiante.
- Estado de fallo de `localStorage` visible y recuperación vía respaldo manual.

### 15.5 Senior Mode avanzado deseable

- Timeline manipulable y análisis de correlación entre métricas/logs/trazas.
- Evidence Lab con contrapruebas y «red herrings» identificables.
- Decision Lab con resultados en el simulador (sin tocar producción).
- Operations Lab con runbooks y guardrails.
- Code Review Lab con Terraform, Dockerfile, IAM, workflows y Kubernetes YAML inseguros.
- Architecture Review Lab con ADR y análisis económico.
- Modo equipo supervisado futuro: roles de incidente, comentarios y firma verificable.

---

## 16. SENIOR MODE — RÚBRICAS, REPORTE E HISTORIAL

### 16.1 Rúbrica docente profesional

| Dimensión | Peso | Insuficiente | Satisfactorio | Excelente |
|---|---:|---|---|---|
| Trazabilidad de evidencias | 25% | Afirmaciones sin datos | Cita registros pertinentes | Contrasta hipótesis y verifica integridad |
| Seguridad y mínimo privilegio | 20% | Mitigación peligrosa | Controles y acceso acotados | Riesgos y blast radius bien fundamentados |
| Mitigación y recuperación | 25% | Acciones irreversibles | Contención + reversión | Estrategia probada con trade-offs |
| Validación operativa | 20% | «Parece funcionar» | Señales antes/después | Métricas, pruebas y vigilancia posterior |
| Comunicación y postmortem | 10% | Sin relato verificable | Timeline y acciones claras | Responsables, seguimientos y aprendizaje |

**EXISTE EN V9:** rúbrica y herramienta local en `src/InstructorReview.tsx`, contrato en `src/lib/instructorReview.mjs` y `schemas/instructor-review.schema.json`. Las puntuaciones locales **no están firmadas, ni verifican identidad**.

### 16.2 Reglas del evaluador automático

- El resultado numérico del motor debe rotularse **«completitud de la investigación»** o equivalente, nunca «nivel senior certificado».
- La respuesta acertada sin investigación no completa un expediente.
- No puntuar textos arbitrarios como semánticamente correctos solo por tener cierta longitud.
- Guardar versión del motor de evaluación y de la rúbrica al registrar resultado.
- Ser determinista y auditable: mismas entradas/versiones → misma puntuación.
- Si hay evaluación automatizada con IA en el futuro, exigir criterios, trazabilidad, revisión humana y minimización de datos.

### 16.3 Persistencia de sesiones

- Clave conceptual: `senior-session:<provider>:<caseId>`.
- Incluir `version`, etapa, decisiones, evidencias vistas/citadas y respuestas.
- La importación/exportación de caso debe limitar tamaño, esquema y scope: V9 admite 48 KiB por expediente portátil.
- Rechazar archivos de AWS si el usuario está en Azure/GCP, y viceversa.
- No importar por ese mecanismo notas supuestamente certificadas, privilegios ni tokens.
- Toda operación destructiva sobre un borrador debe solicitar confirmación.
- Mostrar advertencia de pérdida de datos por modo privado/limpieza de navegador.

### 16.4 Niveles de evidencia (propuesta)

1. **Declarada:** checkboxes y texto sin validación externa.
2. **Reproducible localmente:** capturas sanitizadas, comandos y pruebas con fixture.
3. **Evaluada por revisor:** rúbrica humana sobre materiales y justificación.
4. **Validada en cuenta cloud propia:** artefactos inspeccionados por script de alcance mínimo o revisor (fase futura).
5. **Acreditación institucional:** solo si existe estructura legal, autenticación y proceso verificable.

Una simulación V9 ocupa principalmente nivel 1 con elementos de nivel 2 dentro del modelo sintético. No anunciar niveles superiores sin evidencia.

---

## 17. PROGRESO, PERFIL LOCAL Y DATOS

### 17.1 Entidades de progreso

- Preferencia de proveedor, tema claro/oscuro, última ruta/módulo.
- Teoría completada por unidad, con versión de contenido.
- Respuestas e intentos de quiz.
- Laboratorios intentados, notas y checklist.
- Simuladores: entradas, fecha, versión de modelo, resultados y reintentos.
- Expedientes Senior por proveedor/caso, evidencias, decisiones y revisión.
- Rúbricas docentes locales separadas con aviso de no autenticación.
- Exportaciones y eventos de recuperación (sin conservar contenidos secretos).

### 17.2 Exportar/importar

- Descarga JSON de progreso global, especificando esquema, versión, proveedor y tamaño máximo.
- Rechazar JSON malformado, claves peligrosas como `__proto__`, objetos extraños, volúmenes enormes y puntuaciones fuera de rango.
- Normalizar campos permitidos; evitar `Object.assign` indiscriminado sobre datos no confiables.
- Mostrar vista previa o resumen antes de sobrescribir; permitir copia de seguridad previa.
- Respetar compatibilidad V1…V9 de expedientes sin destruir campos válidos.
- Importar expedientes individuales solo al proveedor/incidente correspondiente.
- No almacenar credenciales, tokens, llaves privadas, secretos, nombres de clientes ni datos reales de producción.
- Informar error si cuota de almacenamiento se agota; no mostrar «guardado» falso.

### 17.3 Privacidad por defecto

- No requiere registro en fase estática.
- No analítica invasiva ni seguimiento individual oculto.
- «Borrar progreso» solicita confirmación y documenta su alcance.
- Exportar notas es una acción deliberada del alumno, no subida automática a terceros.
- Pueden incluirse advertencias de que un JSON exportado contiene trabajo personal que no debe compartirse sin revisión.

---

## 18. MATRIZ DE CAPACIDADES AWS / AZURE / GCP

**Regla:** equivalencia *funcional* no es equivalencia absoluta de arquitectura, semántica, precio, permisos ni límites. Siempre enseñar matices.

| Capacidad | AWS | Microsoft Azure | Google Cloud | Diferencia que el alumno debe conocer |
|---|---|---|---|---|
| Organización | Organizations, cuentas, OUs | Tenant, management groups, subscriptions, resource groups | Organization, folders, projects | Jerarquías y límites de gobernanza distintos. |
| VM | EC2 | Virtual Machines | Compute Engine | Tamaños, discos, redes, modelos de imágenes y billing. |
| Red virtual | Amazon VPC | Azure Virtual Network | Google Cloud VPC | VPC AWS regional; VPC GCP global; VNet Azure regional. |
| Firewall | Security Groups, NACL | NSG, Azure Firewall | VPC firewall rules/policies | Estado, alcance y prioridades distintos. |
| Balanceo | ELB (ALB/NLB) | Azure Load Balancer / Application Gateway | Cloud Load Balancing | Capas, alcance, protocolos y funciones distintas. |
| Objetos | S3 | Blob Storage | Cloud Storage | ACL/policies, consistencia, tiering, encriptación y nomenclatura. |
| Bases de datos | RDS / Aurora | Azure Database for PostgreSQL / Azure SQL | Cloud SQL / AlloyDB | No todos los productos son intercambiables. |
| Serverless | Lambda | Azure Functions | Cloud Run functions / Cloud Run | Modelo runtime, disparadores, concurrencia y escala. |
| Contenedores | ECS / EKS | AKS / Container Apps | GKE / Cloud Run | Responsabilidad de nodos/control plane y operación. |
| IAM | IAM, IAM Identity Center, STS | Entra ID, Azure RBAC, Managed Identity | Cloud IAM, service accounts, federation | Identidad y política no se modelan igual. |
| Secretos | Secrets Manager, SSM Parameter Store | Key Vault | Secret Manager | Rotación, costo, permisos, modelos de acceso. |
| Cifrado | KMS | Key Vault / Managed HSM | Cloud KMS | Jerarquía y ubicación de claves y reglas por producto. |
| Observabilidad | CloudWatch, X-Ray | Azure Monitor, App Insights | Cloud Monitoring, Cloud Logging, Trace | Retenciones, integraciones, etiquetas y cargos. |
| Colas/eventos | SQS/SNS/EventBridge | Service Bus / Event Grid | Pub/Sub / Eventarc | Semántica y garantías por servicio. |
| IaC | Terraform, CloudFormation, CDK | Terraform, Bicep/ARM | Terraform, Infrastructure Manager | Terraform como puente no elimina diferencias. |
| CI/CD | CodePipeline / GitHub Actions | Azure DevOps / GitHub Actions | Cloud Build / GitHub Actions | Identidad federada e integración específicas. |
| Presupuestos | AWS Budgets | Azure Cost Management | Cloud Billing Budgets | Las alertas no siempre detienen consumo. |
| DR | Multi-AZ/multirregión | Availability Zones/regions | Zonas/regiones | Replicación, SLA y costos requieren análisis. |

### 18.1 Diferencias que se deben enseñar expresamente

- **IAM:** evaluación de permisos no es traducción directa de JSON policies entre nubes.
- **VPC/VNet:** región/globalidad, route tables y subredes presentan reglas diferentes.
- **Costos:** tráfico entre zonas, regiones y salida a Internet puede ser relevante en todas; los modelos exactos varían.
- **Kubernetes:** EKS/AKS/GKE hacen parte de la gestión, pero responsabilidad de nodos, add-ons, identidades y seguridad difieren.
- **Serverless:** límites de ejecución, cold starts, concurrency, runtime e integración con eventos difieren.
- **Storage:** clasificaciones de almacenamiento, retención, replicación y políticas no son intercambiables 1:1.
- **Servicios administrados:** una nomenclatura similar no garantiza igual SLA, durabilidad o control de backups.
- **Terraform:** proveedores/versiones separados; `main.tf` debe ajustarse al scope y a validaciones reales.

### 18.2 Requisitos de información técnica

- Acompañar cambios importantes de APIs/comandos con revisión documental oficial.
- Señalar versión CLI y fecha de validación de comandos críticos.
- No incrustar precios sin fecha, región, moneda y fuente.
- Identificar comandos «solo lectura» y los que generan costos o afectan permisos.
- Si no existe un laboratorio revisado para una nube, indicar claramente su ausencia.

---

## 19. MALLA CURRICULAR — 240 HORAS, 18 MÓDULOS

**EXISTE EN V9:** `src/data/course.ts` define el siguiente currículo, con 90 temas en total. Esta tabla describe **horas planificadas**. Para convertirla en un curso de 240 horas realmente impartible hay que escribir, enseñar, probar y evaluar todos los materiales de manera completa.

### 19.1 Nivel básico — 60 horas

1. **Fundamentos Cloud — 10 h.** IaaS/PaaS/SaaS, regiones, zonas, disponibilidad, escalabilidad, responsabilidad compartida y arquitectura simple. Evidencia: explicar un diagrama y justificar servicios.
2. **Redes y conectividad — 10 h.** IP/CIDR, DNS, HTTP, VPC/VNet, subredes, rutas, firewalls y redes públicas/privadas. Evidencia: mapa de subredes, rutas y reglas mínimas.
3. **Cómputo y Linux — 10 h.** Linux, SSH, VM, imágenes, snapshots, discos y tipos de instancias. Evidencia: servidor seguro reproducible y validado.
4. **Storage y bases de datos — 10 h.** Object/block/file, buckets, cifrado, lifecycle, SQL administrado, backups. Evidencia: estrategia de almacenamiento y restauración sencilla.
5. **IAM y seguridad inicial — 10 h.** Identidades, roles, MFA, least privilege, cifrado, secretos y auditoría. Evidencia: política de acceso mínimo y justificación.
6. **Costos y primer despliegue — 10 h.** Presupuestos, tags, estimación, despliegue web, verificación y cleanup. Evidencia: sitio de ejemplo y eliminación confirmada.

### 19.2 Nivel intermedio — 80 horas

7. **CLI y automatización — 12 h.** AWS CLI, Azure CLI, gcloud, Bash, contexto, scripts y secretos. Evidencia: automatización segura de consulta/configuración limitada.
8. **Redes avanzadas — 14 h.** NAT, LB, health checks, VPN, private endpoints, TLS y tres capas. Evidencia: arquitectura privada justificable.
9. **Serverless y APIs — 14 h.** Funciones, gateway, colas, eventos, reintentos, idempotencia y DLQ. Evidencia: API/event processor seguro con pruebas de duplicidad.
10. **Docker y Kubernetes — 14 h.** Dockerfile, imágenes, registries, pods, deployments, services, EKS/AKS/GKE, rollout. Evidencia: app contenerizada y desplegada con health checks.
11. **Terraform e IaC — 12 h.** Providers, recursos, state/locking, plan/apply, drift, módulos y cambios destructivos. Evidencia: repo IaC, plan revisado y cleanup.
12. **CI/CD y observabilidad — 14 h.** Git, pipelines, OIDC, logs, métricas, trazas, alertas. Evidencia: despliegue con pipeline y diagnóstico de fallo.

### 19.3 Nivel avanzado — 100 horas

13. **Arquitectura Cloud Native — 16 h.** Monolito modular, microservicios, contratos, sistemas distribuidos, eventos, ADR. Evidencia: ADR y diagrama con trade-offs.
14. **Seguridad y gobernanza — 16 h.** Landing zones, políticas, Zero Trust, KMS, threat modeling, auditoría y compliance. Evidencia: baseline de guardrails y amenaza priorizada.
15. **HA y recuperación — 16 h.** RTO, RPO, Multi-AZ, multirregión, failover, replicación, chaos testing, game days. Evidencia: DR plan probado en entorno autorizado.
16. **Datos e integración — 18 h.** SQL/NoSQL, caché, consistencia, colas, streaming, data lakes, gobierno de datos. Evidencia: integración resiliente con validación de duplicados/fallos.
17. **SRE, plataforma y FinOps — 16 h.** SLI/SLO, incidentes, error budgets, Platform Engineering, GitOps y TCO. Evidencia: SLO, dashboard, runbook y costos por transacción.
18. **Proyecto Arquitecto Multicloud — 18 h.** Requisitos, diseño, threat model, IaC, pruebas, DR, presupuesto, ADR y defensa. Evidencia: portfolio técnico defendible y reproducible.

### 19.4 Cómo se imparten las horas

Las horas no deben ser solo una etiqueta visual. Definir por unidad minutos realmente programados de exposición, demostración, práctica, reflexión, evaluación y feedback. Ejemplo de clase de 120 minutos: 20 teoría, 20 comparación multicloud, 45 práctica, 20 incidentes/costos, 15 revisión. Una ruta completa en tres proveedores puede exceder 240 h si se exige repetir *todas* las prácticas; por ello el laboratorio principal se hace en la nube elegida y se realizan ejercicios comparativos seleccionados en las otras dos.

### 19.5 Evaluación del programa

- 20%: comprensión conceptual y exámenes.
- 35%: laboratorios con evidencia reproducible.
- 15%: proyectos de nivel básico e intermedio.
- 30%: capstone y defensa técnica.

Es una **propuesta académica**; no existe todavía evaluación certificante remota, antiplagio ni validación institucional. El profesor debe justificar cómo cada evidencia corresponde al resultado de aprendizaje.

---

## 20. ESQUEMA PEDAGÓGICO PARA CADA UNA DE LAS 90 UNIDADES

### 20.1 Ficha de unidad obligatoria

```ts
// Contrato objetivo; no reemplaza por sí solo el modelo de V9.
type UnitSpec = {
  id: string;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  concept: { markdownPath: string; diagrams: string[]; glossary: string[] };
  providers: Record<'aws' | 'azure' | 'gcp', {
    serviceNames: string[];
    examplePaths: string[];
    cliExamples: string[];
    terraformPaths?: string[];
    differences: string[];
    docs: string[];
    verifiedAt?: string;
  }>;
  practice: { mode: 'simulation' | 'local' | 'own-cloud'; path: string };
  questions: string[];
  evidenceRequirements: string[];
  rubricId: string;
  author: string;
  reviewer?: string;
  updatedAt: string;
  status: 'draft' | 'technical-review' | 'pedagogical-review' | 'published';
};
```

### 20.2 Reglas de producción por tema

- Crear una explicación original y específica con ejemplos concretos del tema.
- Incluir al menos un antipatrón y su impacto real.
- Demostrar la comparación entre proveedores sin esconder limitaciones.
- Construir una actividad práctica con datos reproducibles y criterios de éxito.
- Incluir un ejemplo de error, por qué ocurre y cómo diagnosticarlo.
- La evidencia final debe derivarse de una acción verificable, no solo «he leído».
- Añadir revisión humana técnico/pedagógica, fecha y fuentes.
- Fijar versión de cualquier herramienta que pueda cambiar resultados.
- No publicar contenido vacío, repetido o generado sin revisión experta.

### 20.3 Cobertura por competencia

Cada una de las 90 unidades necesita una matriz que responda: **qué aprende**, **con qué herramienta**, **cómo se verifica**, **en qué nube**, **qué errores se consideran**, **qué costos/riesgos existen** y **qué debe dominar antes de pasar a la siguiente**. En el Anexo A se enumera el inventario real de temas.

---

## 21. PROYECTOS INTEGRADORES Y PORTFOLIO

### 21.1 Proyecto 1 — Fundamentos

**Objetivo:** desplegar un sitio estático de manera controlada en la nube elegida, explicar cómo se sirve contenido y documentar su costo/limpieza.

**Entregables:** diagrama, presupuesto, política mínima, recurso desplegado, verificación HTTP, registro de costos y cleanup. Hacer comparativa de servicios equivalentes sin exigir tres despliegues pagados.

### 21.2 Proyecto 2 — Ingeniería cloud

**Objetivo:** construir una API sencilla con contenedores o serverless, base de datos administrada o emulada, IaC, pipeline y observabilidad. Demostrar rollback y políticas de secretos.

**Entregables:** repositorio, tests, Dockerfile/Compose donde aplique, Terraform plan, diagrama, pipeline OIDC o alternativa local, logs/métricas, prueba de fallo y runbook.

### 21.3 Proyecto 3 — Capstone de arquitectura

**Objetivo:** diseñar una plataforma transaccional con requisitos funcionales y no funcionales medibles. Elegir proveedor(es) por méritos y justificar por qué una sola nube podría ser preferible a tres.

**Entregables:** especificación de negocio, diagrama C4 o equivalente, amenaza y controles, análisis de disponibilidad, RTO/RPO, presupuesto TCO, DR, SLO/SLI, ADR, pipeline, matriz de riesgos, respuesta a incidente Senior y defensa oral/escrita.

### 21.4 Rubrica del capstone

- Funcionalidad y cumplimiento de requisitos: 20%.
- Seguridad y privacidad: 20%.
- Resiliencia y pruebas de recuperación: 20%.
- Operabilidad y observabilidad: 15%.
- Costos y sostenibilidad: 10%.
- Argumentación, ADR y documentación: 15%.

La revisión no debe limitarse a logos o a conseguir desplegar recursos: debe evaluar *decisiones* y evidencia de su impacto.

---

## 22. ARQUITECTURA FRONTEND Y ORGANIZACIÓN DEL CÓDIGO

### 22.1 Stack decidido para la fase estática

| Área | Tecnología | Motivo | Estado |
|---|---|---|---|
| UI | Preact | SPA ligera, componentes, JSX | **EXISTE EN V9** |
| Lenguaje | TypeScript | Tipos claros y refactors seguros | **EXISTE EN V9** |
| Herramienta | Vite | Desarrollo y build frontend | **EXISTE EN V9** |
| Estado compartido | Preact Signals | Estado ligero para proveedor/progreso/tema | **EXISTE EN V9** |
| Iconos | lucide-preact | Iconografía consistente | **EXISTE EN V9** |
| Diseño | CSS + custom properties | Personalización y tokens por nube | **EXISTE EN V9** |
| Documentos | Markdown + datos tipados | Contenido versionable y revisable | **PARCIAL** |
| Calidad | TypeScript, Biome | Typecheck/lint/consistencia | **CONFIGURADO, sin build validado** |
| Tests de lógica | Node test runner | Pruebas offline de motores | **EXISTE EN V9** |
| E2E | Playwright | Pruebas reales de navegador | **CONFIGURADO, pendiente de ejecución** |
| CI | GitHub Actions | Gates automáticos | **CONFIGURADO** |
| Infra didáctica | Terraform, Docker, Kind | Laboratorios que enseña la plataforma | **PARCIAL** |

**No agregar** Redux, Next.js, microfrontends, NestJS, Kubernetes de hosting o backend por costumbre. Solo introducirlos si existe requisito concreto y evaluación de coste/riesgo.

### 22.2 Inventario actual de fuentes relevantes

```text
src/
  App.tsx                       # Shell y páginas, actualmente concentrados
  SeniorWorkbench.tsx           # Consola Senior
  InstructorReview.tsx          # Rúbrica de revisión local
  main.tsx                      # Entrada de SPA
  styles.css                    # Diseño principal y adaptaciones de versiones
  data/
    course.ts                   # 18 módulos, providers, mapa de servicios y quizzes
    knowledge.ts                # Teoría por módulo
    study.ts                    # Talleres/actividades de las unidades
    senior.ts                   # 18 incidentes
    seniorDiagnostics.ts        # Diagnósticos
    seniorInvestigations.ts     # Exhibits/evidencia investigativa
    seniorPlaybooks.ts          # Briefings y respuestas operativas
    seniorPractices.ts          # Actividades/cuadernos por proveedor
    seniorRubric.ts             # Puntuación/rúbricas
  lib/
    state.ts                    # Signals, navegación, progreso y persistencia
    importValidation.mjs       # Validación de imports
    seniorEvaluation.mjs       # Evaluación de completitud
    seniorSession.mjs          # Expediente persistente
    seniorCheckpoint.mjs       # Import/export de caso
    instructorReview.mjs       # Revisión local
```

No mover archivos ni renombrar importaciones masivamente sin un plan. Este es el estado detectado en la V9; cualquier arquitectura objetivo siguiente es una **refactorización recomendada, no trabajo ya hecho**.

### 22.3 Estructura objetivo gradual

```text
src/
  app/
    AppShell.tsx
    AppRouter.tsx
    Header.tsx
    Footer.tsx
    ProviderSwitcher.tsx
    routes.ts
  components/
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Dialog.tsx
      Tabs.tsx
      CodeBlock.tsx
      FormField.tsx
      ProgressBar.tsx
      EmptyState.tsx
      ErrorState.tsx
    mascot/
      CloudMentor.tsx
  features/
    home/
    curriculum/
      components/
      hooks/
      model/
    lessons/
      LessonView.tsx
      LessonSidebar.tsx
      LessonRenderer.tsx
      ProviderExample.tsx
    quizzes/
    labs/
    simulators/
      engines/
      ui/
      fixtures/
    senior/
      SeniorCatalog.tsx
      SeniorWorkbench.tsx
      EvidencePanel.tsx
      DiagnosisPanel.tsx
      DecisionPanel.tsx
      ReportPanel.tsx
      ReviewPanel.tsx
      model/
    progress/
    settings/
  content/
    common/
    providers/
      aws/
      azure/
      gcp/
    senior/
  domain/
    provider.ts
    curriculum.ts
    assessments.ts
    senior.ts
    progression.ts
  shared/
    storage/
    validation/
    security/
    formatting/
  design-system/
    tokens.css
    themes.css
    components.css
```

Esta estructura **no exige** crear todos los archivos a la vez. Extraer módulos por feature únicamente cuando haya pruebas que impidan romper navegación, imports y progreso.

### 22.4 Reglas de arquitectura

1. Datos y lógica pura separados del rendering Preact.
2. Cero efectos secundarios dentro de cálculos de evaluación.
3. ProviderRegistry tipado como única fuente de equivalencias; evitar `if (provider === ...)` dispersos por toda la UI.
4. Estabilidad de IDs de módulo/unidad/caso para migraciones locales.
5. Dependencias en una sola dirección: UI → dominio → adapters, nunca dominio → DOM/UI.
6. Los contenidos no deben ejecutar scripts al renderizarse.
7. Guardar en navegador con versión y recuperación explícita ante datos corruptos.
8. No mezclar estrategias de progreso común y progreso específico por proveedor.
9. Mantener `aria-*` y labels accesibles como parte del contrato del componente.
10. Una funcionalidad es terminada solo cuando su flujo de error está implementado y probado.

### 22.5 Secuencia segura de refactor

- Primero snapshots de fuentes, tests y componentes visuales.
- Extraer ProviderSwitcher y Header sin cambiar los contratos de las señales.
- Extraer componentes visuales reutilizables y crear tokens.
- Separar componentes de aula y catálogo de `App.tsx`.
- Extraer motores puros de simulador con tests.
- Modularizar SeniorWorkbench por etapas sin cambiar esquema de expediente.
- Versionar la persistencia y escribir migraciones.
- Comprobar interacciones, screenshots, foco y responsive antes de borrar código antiguo.

---

## 23. CONTRATOS DE DATOS Y TYPESCRIPT

### 23.1 Modelos base (objetivos)

```ts
export type Provider = 'aws' | 'azure' | 'gcp';
export type Level = 'fundamentos' | 'intermedio' | 'avanzado';
export type LabMode = 'simulation' | 'local' | 'own-cloud';
export type ReviewStatus = 'draft' | 'submitted' | 'reviewed' | 'revisions-requested';

export interface VersionedRecord {
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
}
export interface ProviderContext {
  id: Provider;
  name: string;
  accent: string;
  mascotAsset: string;
  cliName: string;
  docsBase: string;
}
export interface Competency {
  id: string;
  title: string;
  category: string;
  prerequisites: string[];
  assessmentIds: string[];
}
export interface Evidence {
  id: string;
  source: string;
  timestamp: string;
  description: string;
  classification: 'synthetic' | 'local' | 'external';
  contentHash?: string;
}
export interface SeniorScope {
  provider: Provider;
  caseId: string;
  scenarioVersion: number;
}
export interface SeniorReport {
  cause: string;
  mitigation: string;
  rollback: string;
  validation: string;
  evidenceIds: string[];
  assumptions?: string[];
  residualRisks?: string[];
}
```

Son **propuestas de contrato**: no modificar de golpe los esquemas V9 ni importar registros antiguos a un modelo nuevo sin adaptadores versionados.

### 23.2 Invariantes

- `moduleId`, `unitId`, `caseId` y `provider` se validan contra catálogos conocidos.
- La teoría conceptual no se duplica por proveedor; adaptadores específicos sí.
- La importación aplica whitelist de campos; no se permite construir prototipos a partir de JSON.
- Todos los tiempos siguen ISO 8601 en UTC en almacenamiento; localizar solo en presentación.
- Nunca usar fechas de dispositivo como prueba de autenticidad de una entrega.
- Los cálculos de SLO, CIDR y puntuación usan unidades explícitas y redondeos consistentes.
- No almacenar `undefined`, `NaN`, Infinity ni funciones en respaldos JSON.
- Rechazar texto no confiable que se intente insertar como HTML o CSS.

### 23.3 Migraciones de schema

Al migrar de V9 a una versión posterior: detectar versión → validar estructura existente → migrar con función pura → comprobar invariantes → escribir de modo atómico donde sea posible → informar resultado. Si falla, ofrecer exportación de respaldo original antes de restablecer cualquier estado. Nunca hacer `localStorage.clear()` como solución de errores.

---

## 24. ESTRATEGIA DE CONTENIDO Y REVISIÓN

### 24.1 Fuentes de verdad

- **Catálogo:** IDs estables, módulos, niveles, horas y competencias.
- **Conceptos comunes:** Markdown revisado, compartido entre tres nubes.
- **Adaptadores de proveedor:** ejemplos de servicio, CLI, IaC, IAM, costos y excepciones.
- **Ejercicios y pruebas:** fixtures tipados y rúbricas vinculadas por ID.
- **Laboratorios:** guía, scripts de verificación, fixtures, cleanup y fuentes.
- **Senior:** escenarios, evidencias sintéticas, hipótesis, acciones, evaluación, playbooks y revisión.

### 24.2 Flujo editorial

1. Autor propone una unidad (estado `draft`).
2. Revisor técnico verifica precisión de conceptos, comandos, límites de permisos y fuentes.
3. Revisor pedagógico evalúa explicaciones, prerequisitos, ejercicios y rúbricas.
4. QA ejecuta ejemplos y pruebas automáticas en ambiente apropiado.
5. Aprobación y publicación con fecha, versión, responsable y changelog.
6. Auditoría periódica de servicios, nombres, cambios de CLI y riesgos.

### 24.3 Calidad del material

- Cada pregunta evalúa un objetivo claro y evita respuestas ambiguas.
- Cada laboratorio indica qué se crea, cuánto puede costar, qué permisos necesita y cómo se elimina.
- Cada ejemplo muestra el estado esperado o cómo interpretar un resultado fallido.
- Todos los títulos, diagramas y capturas tienen descripciones accesibles.
- Las fuentes externas se citan y no se copian tutoriales completos sin permiso.
- El contenido para los tres proveedores puede divergir cuando técnicamente sea necesario; no forzar falsa simetría.
- Una revisión editorial no debe sobrescribir aportes del estudiante ni borradores locales.

### 24.4 Convenciones de carpetas futuras

```text
content/
  modules/
    networks/
      metadata.yaml
      concept.md
      diagram.svg
      quiz.json
      providers/
        aws.md
        azure.md
        gcp.md
      labs/
        simulation.md
        aws-own-cloud.md
        azure-own-cloud.md
        gcp-own-cloud.md
      rubric.md
```

**No mover automáticamente los `labs/*.md` actuales**: conservar la ruta hasta disponer de un sistema de rutas/redirects y pruebas de descarga.

---

## 25. SEGURIDAD POR DISEÑO Y PRIVACIDAD

### 25.1 Modelo de amenazas mínimo

| Activo | Amenaza | Control requerido |
|---|---|---|
| Progreso local | JSON malicioso / prototype pollution | Esquemas, whitelist, límites, normalización. |
| Expedientes Senior | Mezcla de casos/proveedores | Scope estricto, IDs conocidos, confirmación. |
| Material Markdown | XSS / HTML no confiable | Renderer seguro, sanitización o Markdown sin HTML. |
| Formularios | Inyección en render | Escapado automático, evitar HTML dinámico. |
| Scripts de laboratorio | Comandos destructivos o secretos | Revisión humana, tagging, preflight, dry-run, cleanup. |
| CI/CD | Dependencias maliciosas | Lockfile auténtico, audit, CodeQL, dependabot, pin acciones. |
| Hosting | XSS, clickjacking, datos mixtos | HTTPS y cabeceras de seguridad probadas. |
| Cuadernos/exportaciones | Filtración de secretos aportados por alumno | Advertencias y filtros locales opcionales; no envío automático. |
| Futuro backend | Escalada de privilegios, fuga entre alumnos | Auth/RBAC del servidor, aislamiento y auditoría. |

### 25.2 Reglas de front-end

- Nunca incluir `AWS_ACCESS_KEY_ID`, tokens de Azure/GCP ni privadas en frontend o repositorio.
- Evitar `dangerouslySetInnerHTML`, `eval`, scripts de terceros innecesarios y URL no validadas.
- No leer archivos arbitrarios de disco: imports solo mediante selección explícita.
- Limitar tamaño de archivos de progreso y checkpoint antes de procesarlos.
- Normalizar nombres de descarga, rutas relativas y MIME types.
- Datos sintéticos de incidentes: no copiar registros de clientes reales.
- Los permisos de docente no se materializan con un selector local sin autenticación.
- No crear herramientas que intenten administrar cuentas cloud directamente en el navegador sin backend seguro.

### 25.3 Laboratorios de nube segura

- Cuenta/proyecto de laboratorio aislado con presupuesto y alertas.
- Principio de mínimo privilegio; evitar Administrator/Owner si no es absolutamente requerido.
- Identidad federada/temporal cuando sea posible; OIDC para CI/CD.
- IAM y red auditables; no abrir bases de datos públicamente por facilidad.
- `terraform plan` bajo revisión; proteger state remoto y secretos.
- Destruir solo recursos creados específicamente para la práctica y validar que no quedan cargos.
- Registrar región, nombres generados, quotas, etiquetas y responsable.
- Si se necesita un servicio de pago, alternativa simulada y advertencia previa.

### 25.4 Política de privacidad y datos

En la fase estática el usuario conserva datos localmente. Si en el futuro hay cuentas, definir finalidad, retención, derechos del usuario, auditorías, backups, borrado, permisos, consentimiento y normativa aplicable según jurisdicción. No activar rastreo ni cargar SDKs de analytics sin documentarlo. Las exportaciones de informes pueden incluir nombres/contexto escrito por el usuario; deben mantenerse locales por defecto.

---

## 26. DEVSECOPS Y CADENA DE SUMINISTRO

### 26.1 Pipelines actuales como base

**Archivos V9:** `.github/workflows/quality.yml`, `.github/workflows/devsecops.yml`, `.github/workflows/codeql.yml`, `.github/dependabot.yml`, `SECURITY.md`, `biome.json`, `scripts/check-secrets.mjs`, `scripts/security-audit.mjs`, `scripts/verify-integrity.mjs`.

El que un workflow esté presente **no demuestra** que se haya ejecutado ni que el despliegue sea seguro. Exigir comprobantes de ejecuciones y resolver fallos reales.

### 26.2 Quality gates obligatorios para pull request

1. Checkout read-only en CI.
2. Instalar Node LTS apropiado y dependencias reproducibles.
3. Typecheck estricto sin errores.
4. Lint Biome con errores bloqueantes y configuración consistente.
5. Pruebas unitarias y de regresión de contenido.
6. Tests de importación JSON con entradas adversarias.
7. Escaneo de secretos en repositorio y cambios (herramienta especializada además del heurístico local cuando se pueda).
8. SCA de dependencias y umbral de riesgos documentado.
9. Build de producción.
10. Pruebas Playwright Chromium y, para releases, navegadores adicionales.
11. Verificación de rutas, HTML, assets y headers del build desplegado.
12. Generación de SBOM; registro de artefactos/procedencia donde corresponda.
13. Comprobación del manifiesto de conservación de archivos.
14. Evidencia de ejecución en CI antes de aprobar merge/release.

### 26.3 Reproducibilidad

- **La V9 no contiene un `package-lock.json` auténtico**: no fabricarlo manualmente.
- Obtener `package-lock.json` mediante instalación npm real aprobada, revisar el diff y versionarlo.
- Sustituir `npm install` en CI por `npm ci` tras verificar el lockfile.
- Fijar Node, usar caché segura de npm y revisar dependencias directas.
- Pin de GitHub Actions mediante commit SHA en ambientes de riesgo elevado, con revisión de actualizaciones.
- No exponer tokens de deploy a PRs no confiables.

### 26.4 Despliegue seguro

- Separar entornos preview/staging/production.
- Minimizar permisos `GITHUB_TOKEN` y roles cloud; preferir OIDC frente a secretos estáticos.
- Exigir revisión protegida para producción.
- Comprobar integridad y procedencia de artefactos.
- CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` según hosting.
- HTTPS, URLs limpias, rutas profundas soportadas y sin caché permanente de HTML index.
- Documentar rollback de la versión frontend.

### 26.5 Comandos esperados (con dependencias instaladas)

```bash
npm install
npm run doctor
npm run verify:offline
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm audit --audit-level=high
npm sbom --sbom-format cyclonedx > sbom.cdx.json
```

> **NO afirmación de aprobación:** la verificación V9 informa 89 pruebas Node aprobadas en su contexto, pero no ejecución de `npm install`, `typecheck` completo, Biome, Vite ni Playwright por problemas de acceso al registro npm en ese entorno. Cada release posterior debe ejecutar esos controles de verdad.

---

## 27. BIOME, TYPESCRIPT Y ESTÁNDAR DE CÓDIGO

### 27.1 Biome

**Estado V9:** `biome.json` presente, basado en Biome 2.2.4, con reglas puntuales y formatter globalmente desactivado. Es una línea base limitada, no un lint exhaustivo final.

**Meta:**

- Activar reglas recomendadas de manera gradual, documentando excepciones.
- Incluir `src`, `tests`, `scripts` y configuraciones que soporte Biome.
- Lint por cambios y gates en CI, con estrategia de migración para archivos heredados.
- Estilo consistente para imports, variables no usadas y errores comunes.
- Formateo predecible (puede activarse por subdirectorios primero) y `format:check` completo cuando se alcance estabilidad.
- Evitar `any` innecesario; preferir unions, tipos discriminados y esquemas de validación.
- No desactivar reglas globalmente para esconder errores.

### 27.2 TypeScript

- `strict: true` o política equivalente y pruebas para librerías `.mjs` que utilizan declaraciones `.d.mts`.
- Sin errores de tipos; no confundir parser sintáctico con compilación de tipos.
- No usar casts para evadir inconsistencias de provider, moduleId o caseId.
- Reactividad de Signals con dominio tipado y efectos controlados.
- Interfaces estables y validación en frontera de JSON externo.
- Configuración compatible con Vite/Preact, sin discrepancias entre JSX types.

### 27.3 Código legible

- Componentes pequeños con una responsabilidad.
- Funciones puras para cálculo de rubricas, SLO, CIDR y normalización.
- Nombres claros en inglés para APIs y tipos, textos de UI en español; escoger convención estable.
- Importaciones ordenadas; comentarios para decisiones no obvias, no para repetir código.
- No almacenar texto de lecciones dentro de componentes gigantes a largo plazo.
- No mezclar validación de cloud IAM real con modelos didácticos simplificados.

---

## 28. PRUEBAS: PLAN COMPLETO

### 28.1 Pirámide de pruebas

| Capa | Qué prueba | Herramienta preferida |
|---|---|---|
| Unidad | Cálculos, rúbricas, validadores, migraciones | Node Test / Vitest si se incorpora formalmente |
| Componente | Botones, selectores, formularios y estados | Testing Library compatible con Preact si se añade |
| Integración | Proveedor ↔ contenido ↔ progreso ↔ navegación | Tests con fixtures + navegador |
| E2E | Trayectorias reales de estudiante en app desplegada | Playwright |
| Accesibilidad | Labels, roles, teclado, contraste, screen reader | axe + revisión manual |
| Seguridad | Inputs maliciosos, secretos, dependencias, headers | SAST/SCA y pruebas manuales |
| Contenido | IDs, 90 unidades, 54 labs, 18 expedientes, citas | Node scripts/validación de esquemas |
| Visual | Hero, mascotas, paletas, layout responsive | Capturas aprobadas y Playwright visual |

### 28.2 Escenarios unitarios prioritarios

- CIDR: prefijos extremos, direcciones inválidas, broadcast y cantidades.
- IAM: explicit deny, precedence y políticas incompletas.
- SLO: porcentajes, periodos, redondeos, budget negativo.
- Costo/escala: cero, saturación y dependencia aguas abajo.
- Evaluación Senior: decisionLocked, evidencia citada, campos obligatorios y doble registro.
- Importación: JSON con prototipo, arrays arbitrarios, `NaN`, campos extra, tamaño excesivo.
- Sesiones Senior: aislamiento por proveedor y caso, versiones anteriores, corrupted storage.
- Revisión docente: validación de pesos, puntuaciones fuera de rango y ausencia de identidad autenticada.
- Formateadores: timezone, moneda, accesibilidad numérica.

### 28.3 Flujos E2E que deben automatizarse

**E2E-01:** abrir Home en AWS, cambiar Azure/GCP y verificar paleta + mascota + servicios reales mostrados.

**E2E-02:** completar unidad, quiz, guardar notas y comprobar persistencia tras recarga.

**E2E-03:** cambiar nube desde una unidad sin heredar resultados de ejercicios específicos.

**E2E-04:** abrir laboratorio, descargar material de la nube correcta y probar checklist.

**E2E-05:** ejecutar los cinco simuladores con un caso normal y uno de error.

**E2E-06:** Senior S01: examinar dos evidencias, diagnosticar, decidir, citar, redactar, guardar, recargar, exportar/importar.

**E2E-07:** rechazar import de expediente Senior AWS en Azure/GCP, verificar que el contenido previo no cambió.

**E2E-08:** revisión docente local: campos válidos/invalidos, puntuación y exportación.

**E2E-09:** exportar/importar progreso global, rechazar JSON malicioso, cancelar reemplazo.

**E2E-10:** comprobar menú móvil, foco, navegación por teclado y modo claro/oscuro.

**E2E-11:** desconectar/red de forma simulada para comprobar que una SPA estática local no queda inoperable por consultas no esenciales.

**E2E-12:** comprobar recursos inexistentes, URLs malformadas, errores de storage y retorno seguro.

### 28.4 Cobertura y aceptación

- Gating por **comportamientos críticos** antes que porcentaje global artificial.
- Motores puros/validadores y estado de importación con cobertura de ramas alta y casos adversos.
- Los 18 casos Senior deben ser descubribles y no causar errores al abrirse.
- Las 54 combinaciones Senior × nube deben estar disponibles en el sistema de contenidos.
- Capturas aprobadas por diseño para escritorio/tablet/móvil en cada proveedor.
- Toda regresión bloqueante lleva test que falla antes del arreglo.
- Publicar reporte de ejecución real y enlaces a logs/artefactos en CI; no reportar «todo OK» basándose solo en tests offline.

---

## 29. ACCESIBILIDAD, RESPONSIVE Y RENDIMIENTO

### 29.1 Accesibilidad AA como estándar

- Estructura semántica con `main`, `header`, `nav`, `footer`, encabezados ordenados y landmarks.
- Todos los botones tienen nombre accesible. Los enlaces abren destinos válidos.
- Select de proveedor etiquetado, foco visible y estado seleccionado comunicable.
- Dialogs gestionan foco, `Escape`, retorno al disparador y scroll apropiado.
- Progress bars anuncian valor y límite, no solo barra de color.
- Feedback de quiz y Senior con regiones de anuncios accesibles según necesidad.
- Reducción de movimiento respetada, sin animaciones indispensables para entender.
- Tablas largas con encabezados y alternativas móvil.
- Código con copy accesible y barra de desplazamiento sin cortar ejemplos.
- Texto alternativo pertinente para mascota y diagramas educativos.
- Operable con teclado en Windows, Linux, macOS y móvil con lector de pantalla.

### 29.2 Rendimiento razonable

- Mantener la SPA liviana con Vite y Preact, evitando bundles enormes por cargar las 90 unidades a la vez.
- Lazy-load de rutas, casos y contenidos grandes cuando haya ganancia medible.
- Las imágenes de mascota deben contar con versiones optimizadas (WebP/AVIF si conviene), preservando originales.
- Cuidar LCP del hero, CLS de imágenes y formularios, INP en simuladores.
- `prefers-reduced-motion` y ahorro de recursos en dispositivos modestos.
- Los simuladores pesados pueden usar Web Workers, con tests del motor separado.
- Medir métricas reales en build y navegador, no afirmar objetivos sin medición.

### 29.3 Comprobaciones visuales

En cada nube y tema: hero, catálogo, aula, quiz, lab, simulador, Senior catálogo, Senior expediente, revisión, progreso y configuración a 320, 390, 768, 1024 y 1440 px. Revisar título, imágenes, overflow, sombras, focus, estados de error y navegación móvil.

---

## 30. DESPLIEGUE, ENTORNOS Y OPERACIÓN

### 30.1 Fase actual: hosting estático

Opciones técnicas válidas: Cloudflare Pages, Netlify, Vercel, S3+CloudFront, Azure Static Web Apps o Firebase Hosting/Cloud Storage+CDN, según requisitos y costos. **No hay obligación de desplegar la academia en las tres nubes simultáneamente.** Elegir hosting por seguridad, costo, CDN, observabilidad y facilidad de rollback.

### 30.2 Entornos recomendados

- **local:** Vite dev con datos sintéticos.
- **preview:** build de pull request y pruebas de interfaz.
- **staging:** candidato de release con configuración equivalente a producción.
- **production:** assets estáticos versionados, HTTPS y cabeceras seguras.

### 30.3 Requisitos de operación

- Builds reproducibles con lockfile real.
- Health/smoke checks y verificación de rutas profundas.
- Headers CSP/HSTS apropiados y pipeline que comprueba su presencia tras desplegar.
- Versionado de assets con cache busting y rollback documentado.
- Logs mínimos del hosting sin datos personales innecesarios.
- Métricas de rendimiento agregadas y consentidas cuando corresponda.
- Reportes de incidentes de hosting y proceso de publicación/hotfix.
- Backups del código y de contenidos, no «backups» ficticios de datos locales que solo están en el dispositivo del usuario.

---

## 31. BACKEND, LMS Y SANDBOXES — SOLO CON REQUISITOS REALES

### 31.1 Cuándo justificar backend

- Usuarios con login y sincronización entre dispositivos.
- Aulas, matrículas y seguimiento docente autenticado.
- Revisión oficial de informes y emisión de credenciales verificables.
- Evidencias remotas con almacenamiento seguro.
- Laboratorios gestionados con provisión temporal de recursos AWS/Azure/GCP.
- Gestión de contenidos mediante panel administrativo, sin editar el repositorio.

### 31.2 Stack futuro sugerido (no implementado hoy)

- API NestJS o plataforma equivalente solo si la complejidad lo exige.
- PostgreSQL para cursos, matrícula, evaluaciones, progreso y auditoría.
- Drizzle ORM y Zod u otro sistema validado para modelos de entrada.
- Gestión de objetos para informes/adjuntos, con URLs firmadas, retención y límites.
- Identidad OIDC/OAuth2, MFA para docentes/admin y RBAC **en backend**.
- Cola de trabajos aislada para crear/eliminar sandboxes, con expiración, cuotas, presupuestos y monitoreo.
- Terraform ejecutado **únicamente en workers controlados** con permisos mínimos, approvals y cuentas aisladas; nunca en el frontend.
- Integración de facturación y pagos solo con una decisión de negocio y controles legales aprobados.

### 31.3 Arquitectura de sandbox gestionado

```text
Alumno autenticado
    │
    ▼
API de orquestación + autorización + cuotas
    │
    ▼
Cola de trabajos / workflow temporal
    │
    ▼
Worker aislado sin privilegios permanentes
    │
    ▼
Cuenta AWS / suscripción Azure / proyecto GCP de laboratorio
    │
    ├─ infraestructura etiquetada y con presupuesto
    ├─ observabilidad y evaluación de evidencia
    └─ expiración + cleanup automático + verificación residual
```

Requisitos: separación por alumno, antiabuso, control de costos, presupuestos, expiración, reversión, registro de auditoría y revisión de amenazas. Sin estos guardrails **no** lanzar sandboxes automatizados.

### 31.4 De revisión local a revisión verificada

La herramienta `InstructorReview` actual puede transformarse en una rúbrica firmada por un docente autenticado. Requiere identidad server-side, asociación con versión del expediente, auditoría, políticas de apelación y protección de datos. No basta con cambiar una etiqueta de UI.

---

## 32. MOTOR DE SIMULACIONES Y MODO OFFLINE

### 32.1 Motor determinista

Cada simulador recibe una entrada JSON compatible con esquema documentado, calcula un resultado y devuelve explicaciones, advertencias y referencias. La UI no modifica el motor ni ejecuta scripts del usuario. Versionar el modelo para impedir que un cambio de algoritmo reinterprete retrospectivamente resultados anteriores.

### 32.2 Fixtures y evidencia

- `happy-path` con resultado conocido.
- `edge-cases` con datos extremos o inválidos.
- `misconceptions` con una hipótesis errónea pero plausible.
- `provider-differences` con variantes por AWS/Azure/GCP cuando la matemática o política lo requiere.
- `regression` por bugs reportados.

### 32.3 Offline

La versión estática debe poder consultarse localmente una vez servida, sin necesitar API propia; no prometer PWA/offline total sin service worker y pruebas específicas. Si se implementa PWA: cache versionada, recuperación de despliegues, política de actualización, no guardar secretos y aviso de contenido obsoleto. Las URLs oficiales externas no se garantizan offline.

---

## 33. ANALÍTICA EDUCATIVA RESPONSABLE

### 33.1 Métricas útiles

- Tasa de inicio y finalización por módulo y por proveedor, solo si hay un mecanismo apropiado de medición.
- Dificultad percibida y tiempo de trabajo autodeclarado.
- Preguntas frecuentemente falladas y calidad del feedback.
- Laboratorios con más interrupciones y causas reportadas.
- Errores de UX y accesibilidad (agregados, sin datos sensibles).
- Senior Mode: tasa de reintentos, etapas más difíciles, calidad de evidencias bajo revisión humana.
- Costos de infra de laboratorio solo cuando existan y sea legal y técnicamente adecuado medirlos.

### 33.2 Límites

- No «perfilamiento senior» automático a partir de un quiz local.
- No almacenar ni transmitir claves, logs internos reales o respuestas sensibles.
- Separar analítica pedagógica de telemetría operativa y de marketing.
- Dejar claro qué se mide, por qué, quién accede y cuánto tiempo se conserva.
- En fase local, preferir estadísticas calculadas de los datos del propio navegador.

---

## 34. DOCUMENTACIÓN Y MANTENIMIENTO

### 34.1 Documentación que el proyecto debe conservar

- `README.md`: qué es, qué no es, prerequisitos, quickstart y comandos reales.
- `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`: contrato de producto y backlog objetivo.
- `docs/MASTER_SPEC.md`: decisiones originales y referencias de diseño.
- `docs/TEACHING_GUIDE.md`: metodología docente, evaluación y seguridad.
- `docs/CLOUD_SAFETY.md`: amenazas y precauciones de cuentas cloud.
- `docs/VERIFICATION_V*.md`: evidencias de cada release; no reescribir historia.
- `docs/FILE_MANIFEST_V*.json`: inventario y hashes históricos.
- `docs/SENIOR_MODE_V*.md`: evolución del motor, los casos y la rúbrica.
- `docs/DEVSECOPS_V*.md`: controles CI, riesgos, ejecución real y excepciones.
- `SECURITY.md`: reporte responsable de vulnerabilidades.
- `CONTRIBUTING.md`: convenciones, pruebas y proceso de PR.
- `CHANGELOG.md` futuro si se requiere una cronología única, **sin borrar release notes anteriores**.
- `docs/ARCHITECTURE.md` futuro: ADR, diagramas, límites y decisiones técnicas.
- `docs/CONTENT_AUTHORING.md` futuro: guía editorial, plantillas y revisión.
- `docs/ACCESSIBILITY.md` futuro: checklist y resultados de auditorías.
- `docs/RELEASE_CHECKLIST.md` futuro: gates y rollback probados.

### 34.2 Política de actualización cloud

- Reevaluar documentación oficial de los tres proveedores con cadencia acordada.
- Revisar breaking changes y deprecaciones de CLI, servicios y APIs.
- Comprobar costos, regiones y restricciones antes de cada cohorte.
- Versionar imágenes de contenedores, herramientas Terraform y ejemplos de Kubernetes.
- Si un servicio cambia de nombre o modelo, mantener una nota de migración con alias de búsqueda.
- Toda corrección técnica relevante incluye actualización de preguntas, laboratorios y Senior relacionado.

---

## 35. PLAN DE IMPLEMENTACIÓN PRIORIZADO

Los «sprints» siguientes son **etapas lógicas**, no promesas de tiempo; cada una requiere QA antes de avanzar. Nunca saltar pruebas para añadir más tarjetas.

### Etapa 0 — Resguardar y validar la V9

- [ ] Mantener copia exacta del ZIP V9 y checksum.
- [ ] Inventariar los 291 archivos del origen con ruta, tamaño, CRC/hash.
- [ ] Ejecutar instalación npm en un entorno con acceso al registro; generar lockfile auténtico.
- [ ] Hacer pasar TypeScript completo, Biome, build Vite y tests de navegador.
- [ ] Capturar baseline visual de todas las pantallas y las tres rutas de proveedor.
- [ ] Registrar defectos reales y darles prioridad por impacto, no por estética.
- [ ] Confirmar que los datos locales de versiones anteriores se importan.

**Criterio de cierre:** V9 arranca, compila y permite usar el flujo principal en navegador; inventario conservado y defectos bloqueantes resueltos.

### Etapa 1 — Refuerzo del diseño y navegación

- [ ] Extraer header y selector con pruebas de estado.
- [ ] Consolidar tokens AWS, Azure, GCP y dark/light.
- [ ] Garantizar responsive desde 320 px, foco, accesibilidad y estados vacíos.
- [ ] Verificar las cinco imágenes actuales de mascota y definir un estilo canónico consistente.
- [ ] Corregir menús, rutas rotas, botones sin acción y problemas de contraste.
- [ ] Añadir tests visuales y E2E de navegación por proveedor.

**Criterio:** selector sin mezclas; mascotas coherentes; navegación accesible y probada.

### Etapa 2 — Aula y contenido profundo

- [ ] Crear esquema y renderer seguro de contenido común/proveedor.
- [ ] Desarrollar las 90 unidades, una por una, con teoría, diagrama y práctica auténticos.
- [ ] Hacer revisión técnica y pedagógica de las 54 guías ya incluidas.
- [ ] Aumentar evaluaciones de preguntas únicas a bancos por objetivo.
- [ ] Añadir prerrequisitos, glosario, enlaces verificables y fechas de actualización.
- [ ] Completar exportables de evidencias y portfolio.

**Criterio:** ninguna unidad publicada tiene explicación genérica repetida ni laboratorio sin criterios de validación.

### Etapa 3 — Laboratorios reproducibles y simuladores

- [ ] Endurecer los cinco motores actuales con cases de borde y tests.
- [ ] Diseñar simuladores de redes, Kubernetes, Terraform y FinOps con fuentes versionadas.
- [ ] Crear labs locales Docker/Kind y scripts `verify/cleanup`.
- [ ] Revisar Terraform con cuentas de laboratorio y políticas mínimas, con aprobación.
- [ ] Incorporar advertencias de costo y seguridad previas a cada laboratorio real.

**Criterio:** los laboratorios cumplen reproducibilidad o se etiquetan honestamente como ejercicios guiados/simulados.

### Etapa 4 — Senior Mode profesional

- [ ] Completar datos sintéticos variados y técnicamente revisados para los 18 casos.
- [ ] Validar cada playbook y sus 54 cuadernos específicos por proveedor.
- [ ] Mejorar correlación de logs, tiempos, hipótesis y decisiones.
- [ ] Usar rúbricas con feedback claro, resultados reproducibles e historial fiable.
- [ ] Completar portabilidad de expedientes con protecciones adversarias.
- [ ] Validar la experiencia móvil y los formularios con lectores de pantalla.
- [ ] Revisar manualmente informes de ejemplo con un ingeniero cloud senior.

**Criterio:** los 18 casos se pueden resolver, reintentar y explicar en AWS, Azure y GCP sin atribuir puntuaciones no verificadas.

### Etapa 5 — QA, DevSecOps y publicación

- [ ] Versionar lockfile y usar `npm ci` en CI.
- [ ] Biome cubre el código objetivo sin silenciar errores importantes.
- [ ] Typecheck, build, tests Node, E2E, accesibilidad y security checks aprobados.
- [ ] CodeQL/SCA/SBOM y mitigaciones revisadas.
- [ ] Verificar headers de seguridad en hosting real, rutas y rollback.
- [ ] Actualizar README con estado real, límites y canal de reporte.
- [ ] Pilotar con estudiantes y docentes; corregir problemas de aprendizaje detectados.
- [ ] Publicar un release con reporte de pruebas, checklist y checksum.

**Criterio:** evidencia pública/interna de build y smoke tests correctos; contenido y seguridad revisados. «Listo para producción» solo si también se aprueban requisitos operativos, legales y pedagógicos.

### Etapa 6 — SaaS/LMS y sandboxes (FUTURO CONDICIONAL)

Solo si existe necesidad de negocio: autenticación robusta, progreso en servidor, panel docente real, administración de contenidos, certificados verificables, sandboxes temporales, facturación, soporte y gobierno de datos. Deben ser una iniciativa aparte, con arquitectura de backend, threat model, SLO y presupuesto.

---

## 36. MATRIZ DE ACEPTACIÓN POR PANTALLA Y PROVEEDOR

Toda celda debe validarse para **AWS, Azure, GCP**, en **dark y light**, como mínimo en desktop y móvil, con teclado y lector de pantalla cuando corresponda.

| Pantalla / flujo | AWS | Azure | GCP | Prueba decisiva |
|---|---|---|---|---|
| Home + hero | [ ] | [ ] | [ ] | Mascota, tema, CTA, ausencia de overflow. |
| Selector de nube | [ ] | [ ] | [ ] | Persistencia y actualización de todos los ejemplos. |
| Catálogo | [ ] | [ ] | [ ] | 18 módulos, filtros, búsquedas, contadores. |
| Aula común | [ ] | [ ] | [ ] | Concepto igual, implementación propia. |
| Quiz | [ ] | [ ] | [ ] | Feedback, reintento, progreso sin duplicación. |
| Taller por unidad | [ ] | [ ] | [ ] | 90 temas localizables y con actividad evaluable. |
| Laboratorio | [ ] | [ ] | [ ] | Descarga y comandos correctos; advertencia costo. |
| Simuladores | [ ] | [ ] | [ ] | Cinco motores con casos normales y límite. |
| Senior catálogo | [ ] | [ ] | [ ] | 18 casos, filtros, accesibilidad. |
| Senior investigación | [ ] | [ ] | [ ] | Evidencias visibles y estado restaurable. |
| Senior diagnóstico | [ ] | [ ] | [ ] | Hipótesis/evidencias y feedback explicativo. |
| Senior decisión | [ ] | [ ] | [ ] | Bloqueo, intentos y mitigación segura. |
| Senior informe | [ ] | [ ] | [ ] | Causas, rollback, validación y citas. |
| Senior checkpoint | [ ] | [ ] | [ ] | Scope estricto e importación de caso. |
| Revisión docente local | [ ] | [ ] | [ ] | Rúbrica y nota «no autenticada». |
| Mi progreso | [ ] | [ ] | [ ] | Estado correcto, import/export y errores. |
| Configuración | [ ] | [ ] | [ ] | Tema, restauración, borrado confirmado. |
| Footer y documentación | [ ] | [ ] | [ ] | Enlaces reales y disclaimer no afiliación. |

**La marca `[ ]` no implica necesariamente fallo en V9.** Significa que esta matriz requiere pruebas ejecutadas y evidencia revisada para autorizar `[x]`.

### 36.1 Aceptación E2E especial de cambio de nube

1. Abrir S07 en AWS y examinar evidencias.
2. Cambiar a Azure desde el header.
3. Verificar que el incidente corresponde a Azure y no hereda la selección de AWS.
4. Volver a AWS y recuperar la investigación previa.
5. Exportar JSON del caso AWS.
6. Intentar importarlo en Azure: **rechazo sin perder el borrador Azure**.
7. Volver a AWS e importar: **restauración con confirmación**.
8. Cerrar pestaña, recargar y confirmar persistencia.
9. Ejecutar con teclado y pantalla móvil; no introducir errores de foco.

---

## 37. DEFINITION OF DONE (DoD)

### 37.1 Para cada funcionalidad

- [ ] Requisito funcional escrito y rastreable.
- [ ] Implementación integrada en UX real, no solo fuente huérfana.
- [ ] Estados normal, loading, vacío, error y cancelación cubiertos según aplique.
- [ ] Errores de TypeScript y Biome resueltos.
- [ ] Pruebas de unidad y E2E apropiadas ejecutadas.
- [ ] Accesibilidad por teclado y lector de pantalla comprobada.
- [ ] Sin credenciales ni datos personales de producción.
- [ ] Documentación de uso y de limitaciones actualizada.
- [ ] Feedback de usuario claro; sin resultados falsos.
- [ ] No se eliminaron archivos, funcionalidades ni progresos anteriores accidentalmente.

### 37.2 Para cada unidad del curso

- [ ] Objetivo comprobable.
- [ ] Teoría específica y material original.
- [ ] Diagrama y glosario.
- [ ] Ejemplo correcto en la nube seleccionada.
- [ ] Diferencias frente a las otras dos nubes.
- [ ] Laboratorio o simulación que enseña realmente la competencia.
- [ ] Verificación/evidencia revisable.
- [ ] Preguntas con feedback y rúbrica.
- [ ] Seguridad, costos y cleanup cuando aplica.
- [ ] Revisión técnica/pedagógica con fecha.

### 37.3 Para cada incidente Senior

- [ ] Contexto, datos sintéticos y escenarios plausibles.
- [ ] Evidencias independientes vinculadas a las hipótesis.
- [ ] Diagnóstico y decisiones de contención documentados.
- [ ] Resultado del caso reproducible y feedback explicativo.
- [ ] Reporte con causa, mitigación, reversión y validación.
- [ ] Persistencia y restauración de expediente.
- [ ] Import/export seguro y aislado por nube/caso.
- [ ] Rúbrica de revisión y aviso de no certificación.
- [ ] 3 adaptaciones de proveedor técnicamente revisadas.
- [ ] QA de navegador, responsive y teclado.

### 37.4 Para release

- [ ] Instalación reproducible, lockfile real y `npm ci`.
- [ ] Typecheck y lint reales superados.
- [ ] Build optimizado sin errores.
- [ ] Unit, E2E, accesibilidad y seguridad aprobados.
- [ ] Manifiesto de archivos y checksums verificables.
- [ ] Inventario de diferencias con versiones anteriores, incluyendo eliminados = 0 si esa fue la restricción.
- [ ] Demostración práctica en las tres rutas cloud.
- [ ] Riesgos conocidos y limitaciones honestamente descritos.
- [ ] Aprobación pedagógica de material que se anuncia como publicado.
- [ ] Deploy, smoke test y rollback verificados.

---

## 38. INVENTARIO V9 Y BRECHAS VERIFICADAS

### 38.1 Hechos del ZIP de origen

- Archivo base: `CLOUD_ENGINEERING_ACADEMY_V9_SENIOR_DEVSECOPS_FINAL.zip`.
- Total de entradas originales del ZIP auditado para esta ampliación documental: **291 archivos, sin nombres duplicados**.
- Carpeta raíz del proyecto comprimido: `cloud-engineering-academy/`.
- Stack declarado por `package.json`: Preact, TypeScript, Vite, Signals, lucide-preact, Biome y Playwright.
- Malla declarada por `src/data/course.ts`: **18 módulos, 90 temas y 240 horas planificadas**.
- Cinco simuladores en el frontend: CIDR, IAM simplificado, autoescalado/capacidad, SLO y Architecture Decision Studio.
- 18 escenarios Senior y 54 cuadernos de proveedor.
- Mascota original y alternativas en cinco archivos de `public/assets`.
- Tests Node, E2E redactados, archivos de workflows DevSecOps/Quality/CodeQL y documentos históricos.
- `docs/VERIFICATION_V9.md`: informa 89 pruebas Node aprobadas **en el entorno de creación anterior**, no resultado de esta nueva edición documental.
- En V9 **NO hay `package-lock.json`**. Compilación completa, Biome y Playwright se documentan como pendientes en el informe V9 por fallos de red al instalar dependencias.

### 38.2 Brechas prioritarias que no deben ocultarse

| Brecha | Severidad para publicación | Tratamiento |
|---|---|---|
| Build real no confirmado | Bloqueante | Instalar npm en CI/entorno válido y ejecutar `npm run build`. |
| Lint Biome no ejecutado | Bloqueante para release con quality gates | Ejecutar, ajustar reglas y corregir hallazgos. |
| E2E real no ejecutado | Bloqueante para release comercial | Playwright Chromium + revisión móvil y Safari cuando aplique. |
| Sin lockfile auténtico | Alta | Generar y versionar `package-lock.json` real. |
| 90 unidades aún no son clases completas de horas verificadas | Alta para anunciar 240 h impartidas | Producir, revisar y pilotar contenido completo. |
| Labs Terraform/comandos no comprobados en cuentas reales | Alta si se promocionan como probados | Ejecutar solo en cuentas aisladas con protección de costo. |
| Simuladores IAM/SLO/escala simplificados | Media/alta | Documentar supuestos y ampliar tests/escenarios. |
| Rúbrica docente no autenticada | Alta si se afirma certificación | Mantener etiqueta local; backend+auth solo si hay necesidad. |
| Mascotas Azure/GCP no necesariamente idénticas a original | Media de branding | Aprobación de hoja canónica y variantes consistentes. |
| Mucha lógica concentrada en `App.tsx` | Media de mantenibilidad | Extraer componentes por feature con tests antes de mover. |
| Pocas preguntas por módulo para certificación profunda | Alta pedagógica | Construir bancos por objetivo/competencia. |
| Sin consola cloud real integrada | No bloqueante para SPA educativa | No prometer ejecución cloud; diferenciar modalidades. |

### 38.3 Lo que NO está permitido afirmar

- «La V9 está totalmente probada en navegador» sin log real.
- «Las 240 horas están completamente producidas y validadas» solo por tener 90 unidades listadas.
- «Senior Mode certifica un nivel profesional» basándose en completitud local.
- «Los labs despliegan AWS/Azure/GCP desde la web» sin backend, permisos ni ejecución real.
- «Las tres nubes hacen exactamente lo mismo» cuando hay diferencias de modelo.
- «Las tres variantes de mascota son el mismo archivo transformado exactamente» sin revisión.
- «Se superó npm audit/CodeQL/Biome» sin ejecución y artefacto correspondiente.

---

## 39. COMPATIBILIDAD, PRESERVACIÓN Y MIGRACIONES

### 39.1 Conservación de archivos

1. Partir de un ZIP original inmutable.
2. Comparar las rutas del ZIP antes y después.
3. Si el usuario exige «no borrar», cualquier eliminación debe provocar fallo de release.
4. Un archivo modificado debe quedar explícitamente en el reporte de diferencias, con hash anterior y nuevo.
5. No sobreescribir imágenes originales de mascota ni cuadernos Senior.
6. No reemplazar código funcional por wireframes sin justificación.
7. Los manifiestos históricos permanecen disponibles; los nuevos se agregan por versión.
8. Conservar backups de JSON de alumno antes de migraciones potencialmente incompatibles.
9. Los cambios de IDs deben incluir aliases/migration map.
10. El checksum del ZIP del release se calcula una vez completado el empaquetado.

### 39.2 Migración de progreso y expedientes

Probar importación desde formatos heredados según existan, con fixtures reales anonimizados y límites de tamaño. La migración nunca debe re-etiquetar silenciosamente un logro AWS como Azure o asignar una nota docente no autenticada a una nueva identidad verificada.

### 39.3 Procedimiento para una ampliación documental como esta

Esta entrega añade **solo un archivo** al paquete original: `cloud-engineering-academy/TODO_LO_QUE_DEBE_TENER_ESTA_APP.md`. Se conservará el contenido byte por byte de cada entrada original y se revisarán nombres, hashes y CRC antes de publicar el ZIP actualizado. No se modificará el código fuente ni se fingirán nuevas pruebas de frontend por el solo hecho de añadir documentación.

---

## 40. CHECKLIST MAESTRO DE ENTREGA — TODO LO QUE DEBE TENER

### Producto / UX

- [ ] Marca Cloud Engineering Academy coherente en todas las vistas.
- [ ] Hero profesional con mascota aprobada y CTA real.
- [ ] Header responsive con selector AWS/Azure/GCP siempre accesible.
- [ ] Paleta y mascota específicas por proveedor con identidad consistente.
- [ ] Modo oscuro/claro accesible en cada proveedor.
- [ ] Catálogo de 18 módulos con 90 unidades y 3 niveles.
- [ ] Búsqueda/filtros/progreso/retorno a última lección.
- [ ] Aula rica con teoría, ejemplos, código y ejercicios.
- [ ] Evaluaciones con explicaciones y no solo una respuesta memorizable.
- [ ] Lab UX con seguridad, costos, evidencias y cleanup.
- [ ] Cinco simuladores actuales y ruta de extensión.
- [ ] Senior Mode completo, investigativo y reanudable.
- [ ] Reporte de progreso con exportación/importación segura.
- [ ] Estados de error, empty, loading, confirmación y offline apropiados.
- [ ] Navegación total por teclado y revisión móvil.

### Ingeniería / contenido

- [ ] 90 lecciones específicas, no relleno repetido.
- [ ] 54 guías base por proveedor revisadas.
- [ ] Laboratorios locales Docker/Kind disponibles donde aportan valor.
- [ ] Terraform probado y etiquetas de costo/riesgo.
- [ ] Servicios correctos y diferencias claras por nube.
- [ ] 18 casos Senior y 54 cuadernos técnicos revisados.
- [ ] Casos Senior con evidencias, diagnóstico, decisión, rollback y SLO cuando aplique.
- [ ] Motor de revisión docente etiquetado como local/no autenticado.
- [ ] Proyectos básico, intermedio y capstone con rúbricas.
- [ ] Glosario, diagramas accesibles, fuentes y fechas de revisión.

### DevSecOps / calidad

- [ ] TS estrictamente tipado y `npm run typecheck` aprobado.
- [ ] Biome ejecutado sobre alcance acordado y sin errores bloqueantes.
- [ ] Tests unitarios de motores/validadores y migraciones.
- [ ] Pruebas E2E reales de selector y Senior en las tres nubes.
- [ ] Test de accesibilidad automática y revisión humana.
- [ ] Protección de imports contra corrupción, prototype pollution y scope cruzado.
- [ ] Sin secretos en frontend/repo/test fixtures.
- [ ] CI con calidad, SCA/SAST, CodeQL y SBOM si se publica.
- [ ] Dependencias fijadas con lockfile auténtico y `npm ci`.
- [ ] CSP y headers de hosting verificados realmente.
- [ ] Manifiesto y checksum del release; cero borrados imprevistos.
- [ ] Logs de verificación y lista honesta de pendientes.
- [ ] Build y despliegue smoke-tested con rollback.

### Operación / ética

- [ ] Cuenta cloud no requerida para aprender fundamentos.
- [ ] Advertencias claras antes de operaciones que pueden costar dinero.
- [ ] No afirmar equivalencia exacta entre AWS, Azure y GCP.
- [ ] No prometer resultados oficiales, empleo o certificados del proveedor.
- [ ] No almacenar ni enviar secretos de alumnos.
- [ ] Revisión editorial y docente real antes de publicar como curso completo.
- [ ] Canal de reporte de bugs y vulnerabilidades.
- [ ] Política de privacidad y licencias comprobadas si se comercializa.

---

## 41. ANEXOS Y REFERENCIAS DEL PROYECTO

### 41.1 Archivos fuente prioritarios para desarrolladores

- `package.json`: scripts y dependencias; origen del checklist de comandos.
- `src/App.tsx`: shell, header, hero, catálogo, aula, simuladores y flujo general.
- `src/SeniorWorkbench.tsx`: etapas y expedientes de incidentes.
- `src/InstructorReview.tsx`: revisión docente local.
- `src/data/course.ts`: catálogo, 18 módulos, 90 temas, proveedores y servicios.
- `src/data/study.ts`: actividades por unidad.
- `src/data/knowledge.ts`: teoría.
- `src/data/senior*.ts`: escenarios, diagnósticos, investigaciones, playbooks y rúbricas.
- `src/lib/state.ts`: Signals, progreso, persistencia y navegación.
- `src/lib/senior*.mjs`: motor de sesión, evaluación y checkpoints.
- `src/lib/importValidation.mjs`: normalización y seguridad de importaciones.
- `src/styles.css`: estilos, tokens de proveedor y estilos Senior.
- `public/assets/cloud-mentor-*.{jpg,png}`: mascota y variantes.
- `labs/aws/`, `labs/azure/`, `labs/gcp/`: guías, Terraform.
- `labs/senior/`: 18 cuadernos base.
- `labs/senior/providers/{aws,azure,gcp}/`: 54 cuadernos Senior específicos (18 por proveedor). `public/senior-guides/{aws,azure,gcp}/`: copias descargables desde el frontend.
- `.github/workflows/`: QA, DevSecOps, CodeQL.
- `docs/VERIFICATION_V9.md`: límites y resultados reportados en V9.
- `docs/FILE_MANIFEST_V9.json`: referencia de continuidad.

### 41.2 Qué hacer al usar este documento con un agente programador

1. Leer completo este archivo y `README.md`, `docs/MASTER_SPEC.md`, `docs/SENIOR_MODE_V9.md`, `docs/VERIFICATION_V9.md`.
2. Hacer inventario de archivos antes de cambiar nada.
3. Identificar una etapa priorizada y redactar criterios de aceptación.
4. Implementar **una feature vertical funcional** (datos + UI + validación + tests + documentación) cada vez.
5. Ejecutar comprobaciones disponibles y reportar las no disponibles como pendientes.
6. Comparar hashes del origen para detectar borrados y cambios inesperados.
7. Entregar changelog, reporte de build/test/QA, limitaciones y ZIP reproducible.
8. Nunca dar por terminado el curso simplemente porque los títulos y módulos se vean en pantalla.

### 41.3 Siguientes anexos

Los anexos que siguen incluyen el **inventario completo de las 90 unidades** y de los **18 incidentes Senior**, extraídos del catálogo del proyecto V9. Deben usarse como lista de tareas editorial y de QA, no como contenido de lección ya producido.

---

## ANEXO A. INVENTARIO DETALLADO DE LAS 90 UNIDADES

Las 90 unidades de esta tabla proceden de la estructura curricular real de `src/data/course.ts` en V9. La columna de evidencia es un **entregable propuesto** para desarrollar y validar cada tema; su presencia aquí **no implica** que ya esté programado o evaluado.

### A.01. Fundamentos Cloud (`cloud-fundamentals`)

**Resultado global esperado:** Explicar las bases de una solución cloud y escoger servicios con criterio..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 01.01 | Modelos IaaS, PaaS y SaaS | Describir IaaS/PaaS/SaaS y elegir modelo para tres requisitos de negocio con explicación. |
| 01.02 | Regiones, zonas y responsabilidad compartida | Comparar región y zona, dibujar un fallo de zona y responsabilidad compartida. |
| 01.03 | Alta disponibilidad y escalabilidad | Diseñar solución de dos zonas e identificar qué escala horizontal/verticalmente. |
| 01.04 | Cuentas, proyectos y organización | Mapear cuenta AWS, suscripción Azure y proyecto GCP sin confundir identidades. |
| 01.05 | Arquitectura y diagrama de una solución | Dibujar arquitectura sencilla y justificar disponibilidad, costo y seguridad. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.02. Redes y conectividad (`networks`)

**Resultado global esperado:** Diseñar una red segmentada, aplicar reglas y justificar el direccionamiento..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 02.01 | IPv4, CIDR, DNS y HTTP | Calcular tres CIDR, señalar subredes válidas, DNS y recorrido HTTP. |
| 02.02 | VPC, VNet y subredes | Dibujar VPC/VNet en las tres nubes y detectar diferencias de ámbito. |
| 02.03 | Rutas y gateways | Construir tabla de rutas sintética y explicar tráfico entrante/saliente. |
| 02.04 | Firewalls, NSG y security groups | Escribir reglas mínimas de acceso y detectar una exposición de puerto. |
| 02.05 | Redes públicas y privadas | Definir red privada para base de datos y verificar desde dónde hay conectividad. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.03. Cómputo y Linux (`compute`)

**Resultado global esperado:** Provisionar un servidor de forma segura y verificar su funcionamiento..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 03.01 | Linux, SSH y claves | Preparar checklist de SSH seguro, cuentas y paquetes de Linux. |
| 03.02 | Máquinas virtuales e imágenes | Seleccionar VM/imagen para una carga y explicar su ciclo de vida. |
| 03.03 | Tipos de instancias y tamaños | Comparar CPU/RAM/disco/latencia/costo para tres cargas. |
| 03.04 | Discos, snapshots y usuario de arranque | Restaurar hipotéticamente disco desde snapshot y verificar integridad. |
| 03.05 | Disponibilidad y escalamiento básico | Diseñar tolerancia básica ante fallo de instancia y justificar el tamaño. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.04. Storage y bases de datos (`storage`)

**Resultado global esperado:** Seleccionar almacenamiento según el uso y configurar protección de datos..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 04.01 | Object, block y file storage | Elegir object/block/file según tres necesidades y explicar sus límites. |
| 04.02 | Buckets y contenedores de objetos | Escribir estructura de bucket/contenedor con permisos mínimos. |
| 04.03 | Cifrado y ciclo de vida | Crear política de ciclo de vida conceptual y requisitos de cifrado. |
| 04.04 | Bases de datos SQL administradas | Comparar PostgreSQL administrado y objetos para un caso de negocio. |
| 04.05 | Backup y restauración | Planificar backup/restauración con RPO, prueba de restore y ownership. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.05. IAM y seguridad inicial (`identity`)

**Resultado global esperado:** Aplicar mínimo privilegio e identificar permisos excesivos..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 05.01 | Responsabilidad compartida | Asignar responsabilidades compartidas en un diagrama de amenazas. |
| 05.02 | Usuarios, grupos, roles y políticas | Diseñar tres roles mínimos y demostrar por qué un permiso es excesivo. |
| 05.03 | MFA y mínimo privilegio | Crear política de MFA, rotación/identidad temporal y acceso break-glass. |
| 05.04 | Cifrado, claves y secretos | Documentar flujo de secretos/KMS sin valores reales. |
| 05.05 | Auditoría y acceso seguro | Proponer auditoría para cambios de privilegios y consultas de eventos. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.06. Costos y primer despliegue (`costs`)

**Resultado global esperado:** Desplegar un recurso controlando costos y eliminarlo correctamente..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 06.01 | Precios y modelos de cobro | Estimar qué recursos generan costo y cuándo, indicando supuestos. |
| 06.02 | Presupuestos y alertas | Definir alertas y alertar que presupuestos no garantizan apagar recursos. |
| 06.03 | Etiquetas de costo y ownership | Aplicar etiquetas de proyecto, propietario, entorno y expiración. |
| 06.04 | Despliegue de una página estática | Desplegar conceptualmente sitio estático con pruebas HTTP. |
| 06.05 | Cleanup y comprobación final | Completar checklist de cleanup y evidenciar que no quedan recursos facturables. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.07. CLI y automatización (`cloud-cli`)

**Resultado global esperado:** Automatizar tareas cloud sin exponer secretos..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 07.01 | CLI de AWS, Azure y GCP | Ejecutar consultas de solo lectura en CLI correcta y documentar contexto. |
| 07.02 | Perfiles, cuentas y contexto | Identificar cuenta/suscripción/proyecto activos antes de operar. |
| 07.03 | Bash y scripting seguro | Escribir script Bash idempotente con `set -euo pipefail` cuando sea apropiado. |
| 07.04 | Variables de entorno y credenciales | Demostrar alternativa segura a claves fijas en repositorios. |
| 07.05 | Automatización de tareas repetibles | Automatizar inventario/consulta con validación de salida y códigos de error. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.08. Redes avanzadas (`advanced-network`)

**Resultado global esperado:** Diseñar conectividad privada y resiliente para servicios de negocio..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 08.01 | NAT y rutas avanzadas | Dibujar rutas/NAT distinguiendo salida privada de inbound público. |
| 08.02 | Load balancers y health checks | Configurar health checks propuestos y explicar fallos del balanceador. |
| 08.03 | VPN y conectividad híbrida | Diseñar VPN híbrida con rutas y dominios de fallo. |
| 08.04 | Private endpoints y DNS | Trazar resolución DNS de endpoint privado y analizar error habitual. |
| 08.05 | TLS y arquitecturas de tres capas | Documentar TLS y topología web/app/db en tres capas. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.09. Serverless y APIs (`serverless`)

**Resultado global esperado:** Diseñar una API serverless con reintentos controlados..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 09.01 | Funciones y runtimes | Diseñar función event-driven con permisos y límites de tiempo. |
| 09.02 | APIs y puertas de enlace | Especificar contrato API, validación de entradas y respuestas. |
| 09.03 | Eventos, colas y reintentos | Dibujar cola y reintentos con política de mensajes fallidos. |
| 09.04 | Idempotencia y DLQ | Probar evento duplicado y demostrar idempotencia + DLQ. |
| 09.05 | Integración con datos administrados | Documentar persistencia, observabilidad y secretos para una función. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.10. Docker y Kubernetes (`containers`)

**Resultado global esperado:** Contenerizar y desplegar una aplicación con controles básicos..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 10.01 | Dockerfiles y capas | Construir Dockerfile sin root, capas racionales y tamaño controlado. |
| 10.02 | Registry y seguridad de imágenes | Escanear imagen en ejemplo didáctico y fijar digest/versiones. |
| 10.03 | Pods, Deployments y Services | Escribir Deployment/Service con probes y recursos mínimos. |
| 10.04 | EKS, AKS y GKE | Comparar identidad/nodos/operación de EKS, AKS y GKE. |
| 10.05 | Autoscaling y rollout seguro | Analizar HPA/rollout fallido y diseñar rollback medible. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.11. Terraform e IaC (`iac`)

**Resultado global esperado:** Versionar infraestructura y revisar los planes antes de aplicarlos..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 11.01 | Terraform providers, recursos y variables | Escribir bloque Terraform con variables y límites de proveedor. |
| 11.02 | State remoto y locking | Diseñar state seguro con locking, cifrado y aislamiento de entornos. |
| 11.03 | Plan, apply y drift | Interpretar `plan` y detectar reemplazo destructivo. |
| 11.04 | Módulos y ambientes | Dividir módulos de red y aplicación con contratos claros. |
| 11.05 | Revisión de cambios destructivos | Identificar drift y proponer corrección sin destruir datos. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.12. CI/CD y observabilidad (`observability`)

**Resultado global esperado:** Entregar una aplicación con pipeline y señales de salud verificables..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 12.01 | Git y ramas de integración | Diseñar política Git para revisión y autorización de cambios. |
| 12.02 | GitHub Actions y OIDC | Escribir flujo CI con OIDC y sin claves largas. |
| 12.03 | Logs, métricas y trazas | Correlacionar métrica, log y traza a un request. |
| 12.04 | Alertas y dashboards | Definir alertas accionables con umbrales, propietarios y runbooks. |
| 12.05 | Proyecto: aplicación de varias capas | Demostrar pipeline y troubleshooting de despliegue con evidencia. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.13. Arquitectura Cloud Native (`software-architecture`)

**Resultado global esperado:** Justificar una arquitectura en función de requisitos y trade-offs..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 13.01 | Monolito modular vs microservicios | Justificar monolito modular frente a microservicios para un escenario. |
| 13.02 | Patrones distribuidos | Identificar fallos parciales, tiempos de espera y circuit breakers. |
| 13.03 | Event-driven y consistencia | Diseñar flujo de eventos y consistencia eventual con compensación. |
| 13.04 | Contratos, latencia y fallos parciales | Revisar contrato entre servicios y presupuesto de latencia. |
| 13.05 | Architecture Decision Records | Escribir ADR con alternativas, decisión, trade-offs y revisión. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.14. Seguridad y gobernanza (`governance`)

**Resultado global esperado:** Definir controles preventivos y detectivos para una organización..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 14.01 | Landing zones y organización | Dibujar landing zone con jerarquía de cuentas/proyectos y propietarios. |
| 14.02 | Políticas, cuentas y jerarquía | Definir políticas preventivas y detectivas con alcance. |
| 14.03 | Zero Trust y segmentación | Diseñar un flujo Zero Trust para acceso a una base privada. |
| 14.04 | KMS, secretos y auditoría | Especificar KMS/secretos, auditoría y rotación de accesos. |
| 14.05 | Compliance y threat modeling | Producir threat model con riesgos priorizados y mitigaciones. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.15. HA y recuperación (`resilience`)

**Resultado global esperado:** Diseñar una estrategia de continuidad con objetivos comprobables..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 15.01 | RTO y RPO | Calcular RTO/RPO de un escenario transaccional. |
| 15.02 | Multi-AZ y multi-región | Explicar dominios de fallo y elegir multi-zona/multi-región. |
| 15.03 | Failover y replicación | Crear runbook de failover con verificación de consistencia. |
| 15.04 | Chaos testing y game days | Planificar game day inocuo con rollback y observabilidad. |
| 15.05 | Runbooks y ejercicios DR | Redactar DR playbook y ejecutar prueba simulada de recuperación. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.16. Datos e integración (`data-architecture`)

**Resultado global esperado:** Escoger patrones de datos y diseñar integraciones resilientes..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 16.01 | SQL y NoSQL con trade-offs | Comparar SQL/NoSQL y justificar una elección por consultas. |
| 16.02 | Cachés y consistencia | Diseñar caché con TTL, invalidación y consistencia. |
| 16.03 | Mensajería y streaming | Definir cola/streaming con idempotencia y DLQ. |
| 16.04 | Data lakes y pipelines | Esquematizar lake/pipeline con lineage y validación. |
| 16.05 | Gobernanza y seguridad de datos | Realizar clasificación de datos, retención y políticas de acceso. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.17. SRE, plataforma y FinOps (`sre-finops`)

**Resultado global esperado:** Operar servicios conforme a SLO y optimizar costos sin dañar la fiabilidad..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 17.01 | SLI, SLO y error budgets | Definir SLI/SLO y calcular error budget para un mes. |
| 17.02 | Gestión de incidentes y postmortems | Hacer timeline de incidente y postmortem sin culpabilización. |
| 17.03 | Platform Engineering y GitOps | Dibujar plataforma interna mínima y contratos GitOps. |
| 17.04 | Observabilidad avanzada | Analizar panel con métricas RED/USE y trazas. |
| 17.05 | Optimización, reservas y costos unitarios | Optimizar costo por transacción justificando efecto en SLO. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

### A.18. Proyecto Arquitecto Multicloud (`capstone`)

**Resultado global esperado:** Defender una arquitectura ante evaluación técnica y económica..

| Unidad | Tema exacto en V9 | Ejercicio/evidencia objetivo |
|---|---|---|
| 18.01 | Requisitos funcionales y no funcionales | Escribir SRS reducido con requisitos funcionales/no funcionales. |
| 18.02 | Diseño y threat model | Dibujar diseño y threat model con riesgos y prioridades. |
| 18.03 | IaC, CI/CD y observabilidad | Entregar infraestructura reproducible, pipeline y telemetría. |
| 18.04 | Pruebas, DR y estimación de costos | Demostrar pruebas, DR plan y TCO con supuestos claros. |
| 18.05 | Defensa técnica y decisión multicloud | Defender ADR multicloud o single-cloud con evidencia técnica. |

**Criterio editorial:** publicar las cinco clases con conceptos completos, variante AWS/Azure/GCP, verificación y fuentes; no solo estas descripciones.

---

## ANEXO B. INVENTARIO DE LOS 18 CASOS SENIOR DE V9

Los títulos, categorías y severidades listados proceden del catálogo `src/data/senior.ts`; la lista permite auditar la cobertura completa del modo Senior. Los mensajes finales y prácticas por proveedor deben revisarse a través de los archivos de datos y guías, no deducirse solo del nombre.

| ID | Caso | Categoría en V9 | Severidad | Expedientes por proveedor |
|---|---|---|---|---|
| S01 | Cambios destructivos en Terraform | IaC Review | Crítica | `labs/senior/providers/{aws,azure,gcp}/s01.md` |
| S02 | Acceso IAM excesivo | Security Lab | Crítica | `labs/senior/providers/{aws,azure,gcp}/s02.md` |
| S03 | Filtración de secretos en repositorio | Incident Response | Crítica | `labs/senior/providers/{aws,azure,gcp}/s03.md` |
| S04 | El servicio cae tras desplegar | Operations Lab | Alta | `labs/senior/providers/{aws,azure,gcp}/s04.md` |
| S05 | Subred que no alcanza la base de datos | Network Investigation | Alta | `labs/senior/providers/{aws,azure,gcp}/s05.md` |
| S06 | Cargos inesperados | FinOps Lab | Alta | `labs/senior/providers/{aws,azure,gcp}/s06.md` |
| S07 | Kubernetes CrashLoopBackOff | Kubernetes Lab | Alta | `labs/senior/providers/{aws,azure,gcp}/s07.md` |
| S08 | Backup imposible de restaurar | Disaster Recovery | Crítica | `labs/senior/providers/{aws,azure,gcp}/s08.md` |
| S09 | Cloud Storage expuesto | Security Lab | Crítica | `labs/senior/providers/{aws,azure,gcp}/s09.md` |
| S10 | SLO bajo presión | SRE Decision | Alta | `labs/senior/providers/{aws,azure,gcp}/s10.md` |
| S11 | Cuello de botella por latencia | Architecture Review | Alta | `labs/senior/providers/{aws,azure,gcp}/s11.md` |
| S12 | K8s con nodo comprometido | Platform Security | Crítica | `labs/senior/providers/{aws,azure,gcp}/s12.md` |
| S13 | Falla regional | Resilience Lab | Crítica | `labs/senior/providers/{aws,azure,gcp}/s13.md` |
| S14 | Eventos duplicados en cobros | Event-Driven Lab | Crítica | `labs/senior/providers/{aws,azure,gcp}/s14.md` |
| S15 | Pipeline sin control de supply chain | DevSecOps | Alta | `labs/senior/providers/{aws,azure,gcp}/s15.md` |
| S16 | Escalado que empeora la caída | Capacity Lab | Alta | `labs/senior/providers/{aws,azure,gcp}/s16.md` |
| S17 | ¿Multicloud o complejidad accidental? | Architecture Decision | Media | `labs/senior/providers/{aws,azure,gcp}/s17.md` |
| S18 | Defensa de arquitectura empresarial | Capstone | Alta | `labs/senior/providers/{aws,azure,gcp}/s18.md` |

### B.1 Ficha de aceptación obligatoria por caso

Para cada uno de S01–S18, revisar y completar: [ ] guía general; [ ] cuaderno AWS; [ ] cuaderno Azure; [ ] cuaderno GCP; [ ] playbook; [ ] dos o más evidencias diferenciadas; [ ] diagnóstico; [ ] decisiones; [ ] informe y rollback; [ ] persistencia; [ ] export/import; [ ] tests de scope; [ ] revisión técnica; [ ] revisión UX móvil y accesibilidad.

### B.2 Verificación de alcance

18 casos × 3 proveedores = **54 combinaciones**. Para cada combinación, la academia debe mostrar conceptos correctos y comandos de diagnóstico adaptados. El catálogo de V9 contiene 54 cuadernos descargables en `public/senior-guides/{aws,azure,gcp}` además de sus fuentes bajo `labs/senior/providers`.

---

## ANEXO C. CHECKLIST DE PRUEBAS DE RESGUARDO Y PUBLICACIÓN

- [ ] Los 291 archivos de V9 están presentes sin rutas eliminadas.
- [ ] El contenido descomprimido de cada archivo original conserva su hash.
- [ ] Solo se agrega `TODO_LO_QUE_DEBE_TENER_ESTA_APP.md` para este paquete documental.
- [ ] El ZIP no tiene rutas duplicadas y supera test de CRC.
- [ ] El documento puede abrirse como Markdown UTF-8 en VS Code o GitHub.
- [ ] Existen enlaces y rutas internas correctas a mascotas, guías y código.
- [ ] Se anota checksum del ZIP y número final de entradas.
- [ ] Ninguna frase presenta las metas pendientes como ya ejecutadas.

---

## CIERRE Y CRITERIO GENERAL DE ÉXITO

**Cloud Engineering Academy estará verdaderamente terminada** cuando sus 18 módulos/90 unidades tengan formación desarrollada y revisada; el usuario pueda escoger AWS, Azure o GCP y obtener una experiencia coherente, segura y propia de cada nube; sus laboratorios expliquen y prueben lo que realmente ejecutan; los 18 expedientes Senior permitan investigación con evidencias y revisión trazable; y el proyecto supere en CI compilación, TypeScript, Biome, pruebas unitarias, Playwright, seguridad, accesibilidad y aceptación visual.

Este archivo es la **especificación maestra operativa**, no una promesa de producción ni una certificación de que ya se ha implementado todo. Es intencionalmente detallado para que cada etapa pueda desarrollarse, probarse y aceptarse sin perder el trabajo anterior ni reducir el producto a una interfaz decorativa.
