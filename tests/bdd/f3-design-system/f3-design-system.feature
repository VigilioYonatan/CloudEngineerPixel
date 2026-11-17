# language: es
Característica: Sistema de diseño multicloud WCAG 2.2 AA, navegación móvil, diálogo accesible, bloques de código seguros y comparador multicloud (F3-01 a F3-05)
  Como estudiante de ingeniería cloud en escritorio, móvil o lector de pantalla
  Quiero tokens con contraste verificable, menú móvil completo, confirmaciones accesibles, comandos etiquetados por riesgo y comparativas reales AWS/Azure/GCP
  Para estudiar y operar sin barreras de accesibilidad, desbordes móviles ni ambigüedad sobre costos o equivalencias cloud

  Escenario: F3-01 Tokens primitivos, semánticos y de componente cumplen contraste WCAG 2.2 AA en las 6 combinaciones nube x tema
    Dado el archivo de tokens src/design-system/tokens.css importado por la aplicación
    Cuando se calculan las relaciones de contraste WCAG 2.2 para AWS, Azure y GCP en modos dark y light
    Entonces cada combinación alcanza al menos 4.5 a 1 en texto semántico y al menos 3.0 a 1 en bordes y controles interactivos

  Escenario: F3-02 El cajón de navegación móvil expone tema, configuración y rutas completas con áreas táctiles de 44px
    Dado el encabezado responsivo en src/app/AppHeader.tsx y las hojas de estilo del sistema
    Cuando se inspecciona la estructura del cajón móvil para viewports de 320px y 390px
    Entonces el menú móvil expone controles accesibles de Tema, Configuración, Mapa, Laboratorios y Proyectos con tamaño mínimo táctil de 44px y cierre con Escape

  Escenario: F3-03 ConfirmDialog reemplaza todos los window.confirm con gestión accesible de foco y confirmación explícita
    Dado el estado reactivo de confirmación y el componente src/components/ui/ConfirmDialog.tsx
    Cuando se solicita confirmación para acciones destructivas o sobrescrituras y se audita todo el árbol src
    Entonces no existe ninguna llamada a window.confirm o confirm nativo en src y el estado resuelve confirmación o cancelación de forma determinista

  Escenario: F3-04 CodeBlock clasifica automáticamente el riesgo operativo de comandos cloud e IaC
    Dado el clasificador de riesgo en src/domain/commandRisk.ts y el componente src/components/ui/CodeBlock.tsx
    Cuando se evalúan comandos de consulta, aprovisionamiento y destrucción en AWS, Azure, GCP y Terraform
    Entonces clasifica exactamente SOLO LECTURA, CREA RECURSOS / COSTO y DESTRUCTIVO / REQUIERE PLAN junto con el lenguaje detectado

  Escenario: F3-05 CloudServiceComparison documenta servicio, jerarquía, permisos, cobro y no-equivalencias reales para los 18 módulos
    Dado el catálogo comparativo en src/data/multicloudComparison.ts y el componente src/components/ui/CloudServiceComparison.tsx
    Cuando se consulta la comparativa multicloud para cada uno de los 18 módulos del currículo
    Entonces cada módulo presenta datos específicos de AWS, Azure y GCP incluyendo jerarquía, permisos, facturación y advertencia explícita de no equivalencia
