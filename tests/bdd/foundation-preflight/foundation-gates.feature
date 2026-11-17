Característica: Puertas fundacionales de seguridad, integridad V9/V10 y preflight reproducible

  Escenario: Escaneo de secretos aprueba el repositorio oficial en el sistema operativo actual
    Dado el repositorio oficial de Cloud Engineering Academy
    Cuando el auditor ejecuta el escaneo CLI de secretos sobre el repositorio
    Entonces el comando de escaneo de secretos finaliza exitosamente sin alertas

  Escenario: Escaneo de secretos bloquea credenciales filtradas en rutas con espacios
    Dado un directorio temporal con espacios en su ruta y una credencial AWS simulada en configuración
    Cuando se analiza el directorio temporal en busca de secretos expuestos
    Entonces el análisis detecta la credencial expuesta y bloquea la validación

  Escenario: Integridad de archivos preserva los 291 archivos originales de V9 sin eliminaciones
    Dado el repositorio oficial de Cloud Engineering Academy
    Cuando se ejecuta el verificador oficial de integridad de archivos
    Entonces los 291 archivos originales de V9 permanecen intactos sin archivos eliminados
    Y el verificador de integridad aprueba con cero incidencias

  Escenario: Preflight de entorno confirma repositorio Git, lockfile real y compilación estricta de tipos
    Dado el repositorio oficial de Cloud Engineering Academy
    Cuando se ejecuta el diagnóstico preflight y la verificación estricta de tipos
    Entonces el repositorio Git está activo y cuenta con package-lock autenticado
    Y todas las dependencias y el chequeo estricto de tipos pasan sin errores
