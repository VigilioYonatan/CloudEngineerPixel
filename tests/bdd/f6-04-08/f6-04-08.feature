# language: es
Característica: Nivel 3 Arquitectura completo, banco de 90 preguntas, micro-retos GoPixel, historial Quiz y progreso 6D (F6-04..F6-08)

  Escenario: Contenido único para las 30 unidades de Nivel 3 Arquitectura (F6-04)
    Dado que cargo las 30 unidades de Nivel 3 (Módulos 13 a 18) junto a Nivel 1 y Nivel 2
    Cuando verifico mentalModel y antipattern de las 90 unidades totales
    Entonces existen las 90 unidades sin textos duplicados entre temas

  Escenario: Banco de evaluación ampliado con 90 preguntas razonadas por módulo y unidad (F6-05)
    Dado que cargo src/data/quizBank.ts y KnowledgeQuiz.tsx
    Cuando verifico la cobertura de preguntas por módulo y explicación por opción
    Entonces existen 90 preguntas razonadas (5 por módulo) con optionReasons y unitIndex de refuerzo

  Escenario: Dinámicas interactivas estilo GoPixel en el Aula (F6-06)
    Dado que inspecciono GoPixelMicroGames.tsx y LessonPage.tsx
    Cuando verifico las modalidades interactivas disponibles en el Aula
    Entonces existen Bug Hunter, Ordenar Despliegue y Architecture Match integrados en LessonPage

  Escenario: Historial de intentos y conservación de bestScore en Quizzes (F6-07)
    Dado que llamo a setQuiz con 100 y luego reintento con 0 por estudio
    Cuando consulto el puntaje guardado y las estadísticas de intentos
    Entonces bestScore se conserva en 100, lastScore refleja 0 y attempts incrementa sin sobrescribir logros

  Escenario: Progreso académico desglosado en 6 dimensiones independientes (F6-08)
    Dado que inspecciono progressDimensions.ts y ProgressPage.tsx
    Cuando verifico el desglose de dimensiones en Mi progreso
    Entonces muestra las 6 dimensiones separadas (Teoría, Evaluaciones, Simuladores, Labs, Proyectos, Senior)
