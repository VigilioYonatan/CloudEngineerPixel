# language: es
Característica: Revisión docente validada por schema y motores de simulación puros con labs 3D e IaC (F4-10 y F5-01..F5-04)

  Escenario: Importación de expediente/informe alumno y validación contra schema de revisión docente (F4-10)
    Dado que tengo un JSON exportado de alumno y el componente InstructorReview
    Cuando valido una revisión exportada contra schemas/instructor-review.schema.json y reviso la UI
    Entonces InstructorReview permite importar expediente/informe del alumno sin alterar el borrador propio
    Y mantiene visible la etiqueta "Revisión local no autenticada" y valida la estructura del schema

  Escenario: Motores puros tipados en src/features/simulators/engines con CIDR extremo y acciones de reporte (F5-01)
    Dado que inspecciono src/features/simulators/engines y la página SimulatorsPage
    Cuando verifico los 5 motores base y los controles de salida de simuladores
    Entonces existen cidrEngine.ts, iamEngine.ts, autoscalingEngine.ts, sloEngine.ts y architectureDecisionEngine.ts
    Y SimulatorsPage ofrece botones Reiniciar, Copiar resultado y Descargar reporte

  Escenario: Motor IAM con precedencia Explicit Deny > Allow, condiciones MFA/región y alcance por nube (F5-02)
    Dado que evalúo políticas en iamEngine.ts con múltiples declaraciones y condiciones
    Cuando coexisten Allow y Explicit Deny o falta condición MFA/región
    Entonces Explicit Deny prevalece sobre Allow e Implicit Deny aplica por defecto
    Y el resultado declara explícitamente que es un modelo educativo distinto al evaluador oficial

  Escenario: Nuevo Simulador 06 Routing & Firewall Lab con visualización 3D Three.js y salto exacto (F5-03)
    Dado que cargo routingEngine.ts y Routing3DCanvas en el feature simulators
    Cuando evalúo flujo Internet hacia subred privada o base de datos aislada
    Entonces routingEngine.ts diagnostica el salto exacto de permiso o bloqueo por ruta, SG/NACL y Private Endpoint
    Y existe componente visual interactivo lazy-loaded con Three.js y fallback SVG accesible

  Escenario: Nuevo Simulador 07 Terraform Plan & Drift Inspector con blast radius y mitigación segura (F5-04)
    Dado que cargo terraformPlanEngine.ts en el feature simulators
    Cuando analizo escenarios create, update-in-place, ForceNew, drift y state-lock-conflict
    Entonces calcula blast radius y recomienda prevent_destroy, moved o restore drill sin pedir credenciales
