# Senior Mode V7 — Expedientes reanudables y diagnóstico técnico

## Alcance

Conserva los **18 casos** de la V6 y los **54 cuadernos por proveedor**. No se han eliminado recursos originales de V6. La nueva etapa **Diagnosticar** complementa las tres fases existentes (Investigar, Decidir, Informe):

1. **Investigar**: inspeccionar las dos evidencias principales (logs y métricas sintéticos), más el runbook opcional.
2. **Diagnosticar**: seleccionar una hipótesis por incidente. Cada uno de los 18 casos tiene su pregunta, tres alternativas, una respuesta defendible y una explicación. Se exige inspección previa de evidencias para confirmar.
3. **Decidir**: seleccionar y confirmar una acción de contención. Las decisiones erróneas se pueden revisar y se conservan como intentos anteriores.
4. **Informe**: escribir causa raíz, mitigación, reversión y validación; citar evidencias examinadas y reconocer las limitaciones del ejercicio. Solo se registra si se cumplen **todas** las condiciones.

El resultado del motor de V6 (máximo 100 puntos) **mide completitud** y no valora la calidad semántica del informe. La respuesta al diagnóstico es un requisito adicional; requiere interpretación didáctica, pero no sustituye la corrección docente. Por diseño no se ejecuta ningún comando ni se accede a cuentas cloud reales.

## Reanudación y separación de rutas

- `senior-session:aws:s01`, `senior-session:azure:s01`, `senior-session:gcp:s01` identifican tres expedientes distintos.
- Se guardan automáticamente etapa, hipótesis, decisión, artefactos, referencias, informe y reconocimiento. Se mantienen las notas e intentos de versiones anteriores.
- Al cambiar de proveedor, se carga el expediente correspondiente al nuevo proveedor. No se reutilizan los hallazgos de otra nube.
- Importaciones con versiones desconocidas, JSON malformado, IDs inválidos o valores inseguros se descartan o normalizan.
- Cada sección de texto admite hasta **1800 caracteres**; el expediente completo se almacena dentro del respaldo local del usuario.
- Los respaldos de progreso pueden tener hasta **8 MB**, sujetos a las cuotas y políticas de almacenamiento del navegador.

## Archivos nuevos de V7

- `src/data/seniorDiagnostics.ts`: 18 preguntas razonadas.
- `src/lib/seniorSession.mjs` y `src/lib/seniorSession.d.mts`: contrato y validación de sesiones.
- `tests/senior-session-v7.test.mjs`: persistencia, límites de datos y aislamiento.
- `tests/senior-diagnostics-v7.test.mjs`: cobertura de casos, compuertas y accesibilidad.
- `tests/e2e/academy.spec.ts`: nuevos recorridos de restauración y compuertas.

## Guía de prueba manual

1. Entrar a `/#senior`, abrir S01 en AWS y examinar dos artefactos.
2. Diagnosticar y confirmar una respuesta. Si no es válida, reintentar tras revisar las pistas.
3. Cambiar a Azure; comprobar que no hereda las evidencias ni la respuesta de AWS.
4. Volver a AWS; comprobar que el expediente guardado se recupera.
5. Recargar el navegador y reabrir S01; comprobar persistencia.
6. Verificar que el botón **Registrar simulación** permanece deshabilitado hasta completar diagnóstico, decisión, citas, informe y declaración.
7. Exportar el informe JSON y revisar que no contiene contraseñas ni credenciales cloud.

## Seguridad y advertencias

La validación del JSON importado solo protege límites de forma/tamaño; los datos locales son manipulables por el usuario y **no son una fuente de calificaciones académicas verificables**. Para evaluación certificable se requiere identidad del alumno, integridad de evidencias, servidor o servicio de revisión, y un docente que verifique la corrección técnica.
