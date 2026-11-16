# Auditoría DevSecOps — versión 5

## Controles incluidos

1. **Biome**: configuración de reglas iniciales para archivos nuevos y comando `npm run lint`. La base legada no se reformatea masivamente para evitar cambios accidentales. Extender el alcance en futuras revisiones.
2. **TypeScript estricto**: `npm run typecheck`.
3. **Node test**: `npm test`, incluyendo importación maliciosa, validación de intentos y preservación de integridad.
4. **CI**: GitHub Actions realiza análisis estático, pruebas, build, `npm audit` y comprobación heurística de claves.
5. **Dependabot**: propuestas semanales de actualización de npm y actions.
6. **Senior Mode**: rúbrica descargable para revisión humana; el puntaje automático solo verifica completitud.
7. **Seguridad cloud**: no ejecutar comandos de proveedores ni aceptar credenciales cloud en el frontend.

## Limitaciones conocidas

- Sin lockfile reproducible hasta que se ejecute `npm install` en un entorno con acceso al registro npm. Una vez generado, versionar `package-lock.json` y cambiar CI a `npm ci`.
- El escáner heurístico no sustituye Gitleaks, TruffleHog ni SAST avanzado.
- Las dependencias no han sido auditadas contra un registro remoto dentro de este entorno.
- Los casos Senior no constituyen certificación ni calificación semántica automática.
- Falta validar el render real con Playwright y revisar accesibilidad WCAG en navegador.

## Comandos

```sh
npm install
npm run typecheck
npm test
npm run lint
npm run build
npm audit --audit-level=high
node scripts/check-secrets.mjs
```

## Despliegue estático

`public/_headers` contiene políticas de seguridad para plataformas compatibles con la convención `_headers` (por ejemplo, Cloudflare Pages o Netlify). Para otros hostings hay que configurar cabeceras en el servidor/proxy. El CSP es de producción; puede requerir ajustes en el entorno de desarrollo por el websocket HMR.
