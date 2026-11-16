export type RubricCriterion = {id:'evidence'|'security'|'recovery'|'validation'|'communication';label:string;weight:number;guidance:string};
export const seniorRubric:RubricCriterion[] = [
 {id:'evidence',label:'Trazabilidad de evidencias',weight:25,guidance:'Cada hipótesis está asociada a una señal verificable y se descartan alternativas.'},
 {id:'security',label:'Seguridad y mínimo privilegio',weight:20,guidance:'Contención reversible, autorización, secretos protegidos y sin acciones innecesariamente destructivas.'},
 {id:'recovery',label:'Mitigación y recuperación',weight:25,guidance:'Plan ejecutable, reversión, criterios de parada y dependencias críticas.'},
 {id:'validation',label:'Validación operativa',weight:20,guidance:'Comprobaciones antes/después, métricas, RTO/RPO/SLO y riesgos residuales cuando corresponda.'},
 {id:'communication',label:'Comunicación y postmortem',weight:10,guidance:'Timeline, responsables, próximos pasos y decisiones justificadas.'},
];
