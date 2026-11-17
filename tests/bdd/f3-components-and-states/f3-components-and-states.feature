# language: es
Característica: Diagramas SVG accesibles, visor Markdown seguro sin XSS, mascota CloudMentor cero CLS, estados transversales ARIA y preferencias granulares (F3-06 a F3-10)
  Como estudiante de ingeniería cloud con necesidades de accesibilidad visual, motriz o conexión intermitente
  Quiero diagramas topológicos escalables, guías Markdown integradas sin riesgo XSS, mascota estable sin saltos de layout, indicadores accesibles y control granular sobre mis datos y animaciones
  Para estudiar los 18 módulos y los 18 casos Senior con rigor técnico, seguridad frontend y cero pérdida accidental de progreso

  Escenario: F3-06 ArchitectureDiagram genera topologías de 4 capas adaptables a nube y modo para los 18 módulos y 18 casos Senior
    Dado el catálogo topológico en src/data/architectureTopologies.ts y el componente src/components/ui/ArchitectureDiagram.tsx
    Cuando se resuelven los diagramas para los 18 módulos curriculares y los 18 casos Senior en AWS, Azure y GCP
    Entonces cada topología expone las 4 capas arquitectónicas, servicios específicos del proveedor, figcaption y resumen textual accesible

  Escenario: F3-07 MarkdownViewer parsea las 54 guías de laboratorio y 54 cuadernos Senior a nodos seguros con cero innerHTML o XSS
    Dado el parser estructural en src/domain/markdownParser.ts y el componente src/components/ui/MarkdownViewer.tsx
    Cuando se procesan muestras reales de las 54 guías labs y 54 cuadernos Senior junto con payloads hostiles script y javascript URL
    Entonces produce bloques tipados para encabezados, tablas, listas, callouts y código neutralizando esquemas peligrosos con cero usos de dangerouslySetInnerHTML o innerHTML

  Escenario: F3-08 CloudMentor preserva intactos los 5 assets originales reservando dimensiones fijas y mapeando las 15 poses canónicas
    Dado el componente src/components/mascot/CloudMentor.tsx y los 5 activos originales en public/assets
    Cuando se auditan las dimensiones intrínsecas reservadas, las coordenadas del sprite de poses y los textos alternativos por nube
    Entonces los 5 archivos de public/assets permanecen intactos y CloudMentor reserva width, height y aspect-ratio explícitos para cada tamaño y pose

  Escenario: F3-09 Los estados transversales ProgressBar, AccessibleTabs, BannerStorageError, OfflineIndicator y EmptyState cumplen contratos ARIA
    Dado los componentes transversales ProgressBar, AccessibleTabs, BannerStorageError, OfflineIndicator y EmptyState
    Cuando se inspeccionan sus atributos semánticos WAI-ARIA y manejadores de teclado y red
    Entonces ProgressBar declara role progressbar con aria-valuenow/min/max, Tabs usa tablist/tab/aria-selected y los banners anuncian alert o status

  Escenario: F3-10 Las preferencias avanzadas permiten reducir movimiento y reiniciar o exportar datos por nube o caso Senior sin afectar el resto
    Dado el gestor de preferencias y datos granulares en src/lib/preferencesState.ts y src/lib/granularProgress.ts
    Cuando el usuario activa movimiento reducido o limpia únicamente el progreso de Azure o el expediente Senior s01 de AWS
    Entonces data-motion refleja reduced y los datos de AWS, GCP y los demás casos Senior permanecen 100 por ciento intactos
