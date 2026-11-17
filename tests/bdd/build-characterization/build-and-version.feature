Característica: Build productivo Vite, sincronización de versión, caracterización E2E y formato limpio de src

  Escenario: Build de producción genera artefactos completos y vite preview sirve rutas críticas sin errores 404
    Dado el repositorio compilado para producción con Vite en la carpeta dist
    Cuando se levanta el servidor vite preview sobre un puerto local efímero y se consultan los recursos críticos
    Entonces index.html, los bundles JS y CSS, las mascotas y los cuadernos Senior responden con HTTP 200

  Escenario: Versión de la plataforma se sincroniza desde una única fuente de verdad en package.json
    Dado la versión declarada en package.json y el módulo propietario appMeta
    Cuando se inspeccionan la vista de Ajustes, el exportador de progreso y el README principal
    Entonces todos consumen la versión canónica sin cadenas obsoletas 7.0.0 en el código fuente

  Escenario: Suite E2E de base y caracterización cubre las 8 vistas sin esperas arbitrarias
    Dado los archivos de especificación Playwright de la academia y de caracterización F1
    Cuando se auditan los escenarios E2E registrados y sus selectores
    Entonces existen al menos 14 escenarios E2E que cubren las 8 vistas sin usar waitForTimeout

  Escenario: Código fuente y hojas de estilo en src están desminificados y aprobados por Biome formatter
    Dado todos los archivos de código fuente y estilos dentro del directorio src
    Cuando se verifica la longitud máxima de línea y se ejecuta biome format en modo estricto
    Entonces ningún archivo en src permanece minificado en líneas gigantes y Biome aprueba al 100 por ciento
