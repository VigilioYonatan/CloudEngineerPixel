# Runbook para el equipo

## Instalación

```bash
npm install
npm run dev
```

## Checklist de smoke test manual

1. Abrir `/` y comprobar hero, mascota oficial, botones y footer.
2. Cambiar AWS → Azure → GCP en header; comprobar nueva paleta, mascota y ruta con `?cloud=...`.
3. Cambiar dark → light; comprobar contraste y persistencia tras refrescar.
4. Abrir Aprender; comprobar filtros, búsqueda, 18 módulos y navegación.
5. Abrir Redes → cambiar la lección; verificar ejemplo de VPC en AWS, VNet en Azure, VPC global en GCP.
6. Contestar quiz correcto e incorrecto; comprobar explicación y progreso.
7. Marcar lección y abrir laboratorio; completar checklist y registrar práctica.
8. Probar CIDR `10.0.0.0/24` (256 direcciones totales), IAM, réplicas y SLO; cambiar valores.
9. Senior: abrir S01, seleccionar opción correcta y marcar evidencias; registrar.
10. Abrir Progreso, exportar JSON, recargar, importar y verificar restauración.
11. Comprobar navegación móvil, teclado y enlaces oficiales `target=_blank` seguros.
12. Abrir DevTools y buscar errores de consola, imágenes no cargadas y pérdidas de foco.

## Limitaciones

Sin backend, recursos reales, verificación cloud ni credenciales. Las variantes de mascota Azure/GCP son imágenes distintas inspiradas en cloud, no recolorizaciones exactas del personaje original. La documentación curricular es una primera versión de producto, no un temario de 240 horas completamente desarrollado.
