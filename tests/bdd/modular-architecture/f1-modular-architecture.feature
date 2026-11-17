Característica: Arquitectura modular unidireccional, retiro de código muerto y ownership de proveedores y Senior Mode

  Escenario: F1-03 retira el código muerto function Senior y seniorService de App.tsx preservando SeniorWorkbench
    Dado el punto de composición principal en src/App.tsx y los archivos fuente en src
    Cuando se inspecciona la existencia de código legado V1/V2 en todo el árbol productivo
    Entonces no existe function Senior ni seniorService en src y la vista senior enruta hacia SeniorWorkbench

  Escenario: F1-04 aísla la capa src/app para layout, shell, switcher y router sin lógica de lecciones ni simuladores
    Dado los módulos extraídos dentro del directorio src/app
    Cuando se auditan sus archivos e importaciones salientes
    Entonces existen AppShell, AppHeader, AppFooter, CloudProviderSwitcher y router sin importar nada de src/features

  Escenario: F1-05 organiza las 8 features por dominio sin carpetas vacías ni ciclos y con archivos menores a 250 líneas
    Dado los directorios de features dentro de src/features
    Cuando se construye el grafo de dependencias local y se miden las líneas de cada módulo
    Entonces existen las 8 features requeridas sin carpetas vacías ni imports cruzados ni ciclos y cada archivo tiene menos de 250 líneas

  Escenario: F1-06 centraliza ProviderRegistry tipado eliminando ternarios repetidos de proveedor en la interfaz
    Dado el registro de dominio src/domain/providers.ts y los componentes visuales de la aplicación
    Cuando se consultan los metadatos de AWS, Azure y GCP y se buscan ternarios dispersos de insignia
    Entonces ProviderRegistry expone colores, mascotas, CLI, reservas CIDR y enlaces oficiales sin ternarios repetidos en la UI

  Escenario: F1-07 modulariza SeniorWorkbench por etapas conservando hidratación intacta de sesiones V7 a V9
    Dado los componentes modulares dentro de src/features/senior y los contratos de sesión
    Cuando se verifican los 7 componentes requeridos y se hidrata una sesión guardada en formato V7 a V9
    Entonces existen todos los módulos de etapa Senior y las claves senior-session y senior-review conservan el estado íntegro
