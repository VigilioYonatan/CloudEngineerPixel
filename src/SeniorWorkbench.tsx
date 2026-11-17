import { seniorRubric } from './data/seniorRubric';
import { seniorPlaybooks } from './data/seniorPlaybooks';
import { createSeniorCheckpoint, parseSeniorCheckpoint } from './lib/seniorCheckpoint.mjs';
import { InstructorReview } from './InstructorReview';
import { seniorDiagnostics } from './data/seniorDiagnostics';
import {
  emptySeniorSession,
  normalizeSeniorSession,
  parseSeniorSession,
  serializeSeniorSession,
  seniorSessionKey,
  REPORT_MAX_CHARS,
} from './lib/seniorSession.mjs';
import type { SeniorSession, SeniorStage, SeniorReport } from './lib/seniorSession.mjs';
import { evaluateSeniorEvidence, REPORT_MIN_CHARS } from './lib/seniorEvaluation.mjs';
import { useState, useEffect, useRef } from 'preact/hooks';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  CloudCog,
  Download,
  ExternalLink,
  FileText,
  Search,
  ShieldAlert,
  Terminal,
  TriangleAlert,
  Upload,
} from 'lucide-preact';
import { challenges, type Challenge } from './data/senior';
import { investigationFor } from './data/seniorInvestigations';
import { seniorPractices } from './data/seniorPractices';
import { providers, type Provider } from './data/course';
import {
  provider,
  progress,
  notify,
  completeSenior,
  setNotes,
  recordSeniorAttempt,
} from './lib/state';

const getLegacyKey = (p: Provider, c: Challenge) => `senior:${p}:${c.id}`;
function downloadReport(payload: object, name: string) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
export function SeniorWorkbench() {
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [severity, setSeverity] = useState('todos');
  const [query, setQuery] = useState('');
  const [session, setSession] = useState<SeniorSession>(emptySeniorSession());
  const [hydratedKey, setHydratedKey] = useState('');
  const [checkpointError, setCheckpointError] = useState('');
  const p = provider.value;
  const current = selected;
  const liveScope = useRef({ provider: p, caseId: current?.id });
  liveScope.current = { provider: p, caseId: current?.id };
  const details = current ? investigationFor(current.id) : null;
  const practice = current ? seniorPractices[current.id] : null;
  const diagnostic = current ? seniorDiagnostics[current.id] : null;
  const playbook = current ? seniorPlaybooks[current.id] : null;
  const sessionKey = current ? seniorSessionKey(p, current.id) : '';
  const key = current ? getLegacyKey(p, current) : '';
  useEffect(() => {
    if (!current) {
      setSession(emptySeniorSession());
      setHydratedKey('');
      return;
    }
    const saved = progress.value.notes[sessionKey];
    const restored = parseSeniorSession(saved);
    // Preserve free-form reports from V3-V6 without deleting the original note.
    if (!saved) {
      try {
        const legacy = JSON.parse(progress.value.notes[key] || 'null');
        if (legacy && typeof legacy === 'object')
          restored.answers = normalizeSeniorSession({ version: 1, answers: legacy }).answers;
      } catch {
        /* legacy freeform, remains untouched */
      }
    }
    setSession(restored);
    setHydratedKey(sessionKey);
  }, [sessionKey]);
  useEffect(() => {
    if (sessionKey && hydratedKey === sessionKey)
      setNotes(sessionKey, serializeSeniorSession(session));
  }, [sessionKey, hydratedKey, session]);
  const update = (change: Partial<SeniorSession>) =>
    setSession((previous) => normalizeSeniorSession({ ...previous, ...change }));
  const setChoice = (value: number | null) => update({ choice: value });
  const setDecisionLocked = (value: boolean) => update({ decisionLocked: value });
  const setDiagnosisChoice = (value: number | null) => update({ diagnosisChoice: value });
  const setDiagnosisLocked = (value: boolean) => update({ diagnosisLocked: value });
  const setStage = (value: SeniorStage) => update({ stage: value });
  const setInspected = (change: (previous: string[]) => string[]) =>
    setSession((previous) =>
      normalizeSeniorSession({ ...previous, inspected: change(previous.inspected) }),
    );
  const setCited = (change: (previous: string[]) => string[]) =>
    setSession((previous) =>
      normalizeSeniorSession({ ...previous, cited: change(previous.cited) }),
    );
  const setAnswers = (change: (previous: SeniorReport) => SeniorReport) =>
    setSession((previous) =>
      normalizeSeniorSession({ ...previous, answers: change(previous.answers) }),
    );
  const setAck = (value: boolean) => update({ acknowledged: value });
  const {
    choice,
    decisionLocked,
    diagnosisChoice,
    diagnosisLocked,
    inspected,
    cited,
    answers,
    acknowledged: ack,
    stage,
  } = session;
  const diagnosisCorrect =
    !!diagnostic && diagnosisLocked && diagnosisChoice === diagnostic.correct;
  const inspectedPrimary = inspected.includes('primary') && inspected.includes('secondary');
  const diagnosisReady = inspectedPrimary && diagnosisCorrect;
  const saveNow = () => {
    if (sessionKey && hydratedKey === sessionKey)
      setNotes(sessionKey, serializeSeniorSession(session));
  };
  const decisionCorrect = !!current && choice === current.correct;
  const assessment = evaluateSeniorEvidence({
    decisionLocked,
    decisionCorrect,
    requiredExhibits: details?.exhibits.slice(0, 2).map((e) => e.id) || [],
    inspected,
    cited,
    report: answers,
    acknowledged: ack,
  });
  const { score } = assessment;
  const allReady =
    assessment.ready && diagnosisReady && !progress.value.senior.includes(`${p}:${current?.id}`);
  const proofReady = assessment.examinedReady;
  const reportReady = assessment.reportReady;
  const confirmedCorrect = assessment.decision;
  const filtered = challenges.filter(
    (c) =>
      (severity === 'todos' || c.severity === severity) &&
      `${c.id} ${c.title} ${c.category} ${c.skills.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const completed = progress.value.senior.filter((id) => id.startsWith(`${p}:`)).length;
  const attempts = (progress.value.seniorAttempts || [])
    .filter((a) => a.provider === p)
    .slice(-20)
    .reverse();
  const close = () => {
    saveNow();
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const open = (c: Challenge) => {
    saveNow();
    setSelected(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const confirmDecision = () => {
    if (!current || choice === null || decisionLocked || !diagnosisReady) return;
    setDecisionLocked(true);
    if (choice !== current.correct) {
      recordSeniorAttempt({
        caseId: current.id,
        provider: p,
        correct: false,
        score: 0,
        at: new Date().toISOString(),
        examined: [...inspected],
      });
      notify('Decisión registrada: revisa evidencias y analiza otra opción.');
    }
  };
  const save = () => {
    if (!current) return;
    saveNow();
    notify('Expediente guardado en este dispositivo');
  };
  const exportCheckpoint = () => {
    if (!current || hydratedKey !== sessionKey) return;
    try {
      const checkpoint = createSeniorCheckpoint(p, current.id, session);
      downloadReport(checkpoint, `expediente-senior-${p}-${current.id}.json`);
      setCheckpointError('');
      notify('Respaldo portable del expediente descargado');
    } catch (error) {
      setCheckpointError(
        error instanceof Error ? error.message : 'No se pudo exportar el expediente',
      );
    }
  };
  const importCheckpoint = async (file: File | null) => {
    if (!file || !current) return;
    const requestedProvider = p,
      requestedCase = current.id;
    try {
      if (file.size > 48 * 1024) throw new Error('El expediente supera 48 KB');
      const imported = parseSeniorCheckpoint(await file.text(), requestedProvider, requestedCase);
      if (
        liveScope.current.provider !== requestedProvider ||
        liveScope.current.caseId !== requestedCase
      )
        throw new Error('El contexto cloud cambió durante la importación');
      if (
        !window.confirm(
          '¿Restaurar este expediente y reemplazar solo el borrador actual de este caso?',
        )
      )
        return;
      if (
        liveScope.current.provider !== requestedProvider ||
        liveScope.current.caseId !== requestedCase
      )
        throw new Error('El contexto cloud cambió durante la importación');
      setSession(imported);
      setHydratedKey(seniorSessionKey(requestedProvider, requestedCase));
      setCheckpointError('');
      notify('Borrador Senior restaurado para este proveedor y caso');
    } catch (error) {
      setCheckpointError(error instanceof Error ? error.message : 'Expediente inválido');
    }
  };
  const finalize = () => {
    if (!current || !details || !allReady || progress.value.senior.includes(`${p}:${current.id}`))
      return;
    const timestamp = new Date().toISOString();
    recordSeniorAttempt({
      caseId: current.id,
      provider: p,
      correct: true,
      score,
      at: timestamp,
      examined: inspected,
      report: { ...answers, citations: cited },
    });
    completeSenior(`${p}:${current.id}`);
    saveNow();
    setNotes(key, JSON.stringify(answers));
    notify('Simulación registrada; pendiente de revisión humana');
  };
  const download = () => {
    if (!current || !details) return;
    downloadReport(
      {
        caseId: current.id,
        caseTitle: current.title,
        provider: p,
        decision: choice === null ? null : current.choices[choice],
        correct: confirmedCorrect,
        inspected,
        cited,
        decisionLocked,
        report: answers,
        checklistAcknowledged: ack,
        diagnosis: { selected: diagnosisChoice, correct: diagnosisCorrect },
        score,
        educationalOnly: true,
        exportedAt: new Date().toISOString(),
      },
      `informe-${p}-${current.id}.json`,
    );
  };
  return (
    <main class="page-container senior-v3">
      {current && details ? (
        <>
          <div class="breadcrumb">
            <button onClick={close}>
              <ArrowLeft size={16} /> Volver a escenarios
            </button>
            <span> / {current.id.toUpperCase()}</span>
          </div>
          <div class="sr-top">
            <div>
              <span class="sr-kicker">
                CENTRO DE OPERACIONES / {providers[p].short} / {current.id.toUpperCase()}
              </span>
              <h1>{current.title}</h1>
              <p>{current.brief}</p>
              <div class="sr-inline">
                <span>{current.category}</span>
                <span>{current.severity}</span>
                <span>{details.service[p]}</span>
              </div>
            </div>
            <img src={providers[p].mascot} alt={`Mentor ${providers[p].short}`} />
          </div>
          <nav class="sr-stage-tabs" aria-label="Etapas del incidente">
            {(['investigar', 'diagnosticar', 'decidir', 'informe'] as const).map((s, i) => (
              <button
                key={s}
                aria-current={stage === s ? 'step' : undefined}
                class={stage === s ? 'active' : ''}
                onClick={() => setStage(s)}
              >
                <span>0{i + 1}</span>
                {s === 'investigar'
                  ? 'Investigar'
                  : s === 'diagnosticar'
                    ? 'Diagnosticar'
                    : s === 'decidir'
                      ? 'Decidir'
                      : 'Informe y evaluación'}
              </button>
            ))}
          </nav>
          <div class="sr-layout">
            <div class="sr-main">
              {stage === 'investigar' && (
                <>
                  <section class="info-card">
                    <div class="card-heading">
                      <Search size={19} />
                      <h3>Objetivo de investigación</h3>
                    </div>
                    <p>{details.objective}</p>
                    <p class="sr-hint">
                      Datos de laboratorio ficticios. No hay conexión con las cuentas cloud del
                      alumno.
                    </p>
                  </section>
                  {playbook && (
                    <section
                      class="info-card sr-ops-brief"
                      aria-label="Plan de respuesta operativo"
                    >
                      <div class="card-heading">
                        <ShieldAlert size={19} />
                        <h3>Briefing operativo del incidente</h3>
                      </div>
                      <p>
                        <strong>Impacto:</strong> {playbook.impact}
                      </p>
                      <p>
                        <strong>Responsable:</strong> {playbook.owner}
                      </p>
                      <h4>Pasos recomendados para analizar el caso</h4>
                      <ol>
                        {playbook.immediate.map((action) => (
                          <li key={action}>{action}</li>
                        ))}
                      </ol>
                      <p class="sr-risk-warning">
                        <strong>Acción a evitar:</strong> {playbook.prohibited}
                      </p>
                    </section>
                  )}
                  <div class="sr-exhibits">
                    {details.exhibits.map((e) => (
                      <section class="info-card sr-exhibit" key={e.id}>
                        <div class="sr-exhibit-heading">
                          <div>
                            <small>{e.kind.toUpperCase()}</small>
                            <h3>{e.name}</h3>
                          </div>
                          <button
                            class="btn btn-secondary"
                            onClick={() =>
                              setInspected((prev) => (prev.includes(e.id) ? prev : [...prev, e.id]))
                            }
                          >
                            {inspected.includes(e.id) ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <Search size={16} />
                            )}{' '}
                            {inspected.includes(e.id) ? 'Examinado' : 'Examinar'}
                          </button>
                        </div>
                        <div class="terminal-block">
                          <div class="terminal-bar">
                            <span class="terminal-lights">
                              <i />
                              <i />
                              <i />
                            </span>
                            <span>READ ONLY / SYNTHETIC EVIDENCE</span>
                          </div>
                          <pre>
                            <code>{e.body}</code>
                          </pre>
                        </div>
                        {inspected.includes(e.id) && <p class="sr-analysis">{e.analysis}</p>}
                      </section>
                    ))}
                  </div>
                  <button class="btn btn-primary" onClick={() => setStage('diagnosticar')}>
                    Formular diagnóstico <ArrowRight size={16} />
                  </button>
                </>
              )}
              {stage === 'diagnosticar' && diagnostic && (
                <section class="info-card sr-diagnostic">
                  <div class="card-heading">
                    <Search size={20} />
                    <h3>Diagnóstico técnico del incidente</h3>
                  </div>
                  <p>
                    Contrasta al menos dos señales del expediente antes de confirmar una hipótesis.
                    La respuesta se evalúa con las pistas de esta simulación.
                  </p>
                  <p>
                    <strong>{diagnostic.question}</strong>
                  </p>
                  <div class="decision-options">
                    {diagnostic.choices.map((item, i) => (
                      <button
                        class={diagnosisChoice === i ? 'decision-selected' : ''}
                        key={i}
                        disabled={diagnosisLocked}
                        onClick={() => setDiagnosisChoice(i)}
                      >
                        <span>{String.fromCharCode(65 + i)}</span>
                        {item}
                      </button>
                    ))}
                  </div>
                  {diagnosisLocked && (
                    <div
                      role="status"
                      class={`quiz-feedback ${diagnosisCorrect ? 'feedback-success' : 'feedback-warn'}`}
                    >
                      <strong>
                        {diagnosisCorrect
                          ? 'Hipótesis respaldada por las pistas'
                          : 'La hipótesis necesita revisión'}
                      </strong>
                      <p>{diagnostic.explanation}</p>
                    </div>
                  )}
                  <p class="sr-hint">
                    {inspectedPrimary
                      ? '✓ Dos señales examinadas'
                      : 'Primero examina los dos artefactos principales en la etapa Investigar.'}
                  </p>
                  <div class="sr-report-actions">
                    <button
                      class="btn btn-secondary"
                      disabled={!inspectedPrimary || diagnosisChoice === null || diagnosisLocked}
                      onClick={() => setDiagnosisLocked(true)}
                    >
                      Confirmar hipótesis
                    </button>
                    {diagnosisLocked && !diagnosisCorrect && (
                      <button
                        class="btn btn-secondary"
                        onClick={() => {
                          setDiagnosisChoice(null);
                          setDiagnosisLocked(false);
                        }}
                      >
                        Intentar otra hipótesis
                      </button>
                    )}
                    <button
                      class="btn btn-primary"
                      disabled={!diagnosisReady}
                      onClick={() => setStage('decidir')}
                    >
                      Definir contención <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
              )}
              {stage === 'decidir' && (
                <section class="info-card">
                  <div class="card-heading">
                    <ShieldAlert size={20} />
                    <h3>Decisión de contención</h3>
                  </div>
                  <p>
                    <strong>Señal inicial:</strong> {current.signal}
                  </p>
                  <p>
                    Selecciona la primera respuesta que puedes defender con los datos observados.{' '}
                    {diagnosisReady
                      ? 'Diagnóstico verificado.'
                      : 'Debes completar primero el diagnóstico.'}
                  </p>
                  <div class="decision-options">
                    {current.choices.map((c, i) => (
                      <button
                        class={choice === i ? 'decision-selected' : ''}
                        key={i}
                        onClick={() => setChoice(i)}
                        disabled={decisionLocked}
                      >
                        <span>{String.fromCharCode(65 + i)}</span>
                        {c}
                      </button>
                    ))}
                  </div>
                  {decisionLocked && (
                    <div
                      class={`quiz-feedback ${decisionCorrect ? 'feedback-success' : 'feedback-warn'}`}
                      role="status"
                    >
                      <strong>
                        {decisionCorrect
                          ? 'Decisión inicial defendible'
                          : 'Esta opción introduce riesgos'}
                      </strong>
                      <p>{current.reason}</p>
                    </div>
                  )}
                  <p class="sr-hint">
                    Las opciones son simplificadas. En producción se requieren autorización, cambios
                    reversibles y verificación.
                  </p>
                  <div class="sr-report-actions">
                    <button
                      class="btn btn-secondary"
                      disabled={choice === null || decisionLocked || !diagnosisReady}
                      onClick={confirmDecision}
                    >
                      Confirmar decisión
                    </button>
                    {decisionLocked && !decisionCorrect && (
                      <button
                        class="btn btn-secondary"
                        onClick={() => {
                          setChoice(null);
                          setDecisionLocked(false);
                        }}
                      >
                        Reevaluar decisión
                      </button>
                    )}
                    <button
                      class="btn btn-primary"
                      disabled={!decisionLocked}
                      onClick={() => setStage('informe')}
                    >
                      Preparar informe <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
              )}
              {stage === 'informe' && (
                <section class="info-card">
                  <div class="card-heading">
                    <FileText size={20} />
                    <h3>Informe técnico estructurado</h3>
                  </div>
                  <p>
                    Redacta tu propio análisis. Cada apartado requiere al menos {REPORT_MIN_CHARS}{' '}
                    caracteres. El sistema verifica completitud,{' '}
                    <strong>no la calidad técnica del texto</strong>.
                  </p>
                  {(
                    [
                      ['cause', 'Causa raíz e hipótesis', details.questions[0]],
                      ['mitigation', 'Contención y mitigación', details.questions[1]],
                      [
                        'rollback',
                        'Reversión y condiciones de parada',
                        'Define la reversión, sus disparadores y un plan de contingencia autorizado.',
                      ],
                      ['validation', 'Validación y riesgo residual', details.questions[2]],
                    ] as const
                  ).map(([k, title, question]) => (
                    <label class="sr-field" key={k}>
                      <strong>{title}</strong>
                      <span>{question}</span>
                      <textarea
                        rows={5}
                        value={answers[k]}
                        maxLength={REPORT_MAX_CHARS}
                        placeholder="Describe señales, razonamiento, trade-offs y verificaciones..."
                        onInput={(e) =>
                          setAnswers((a) => ({
                            ...a,
                            [k]: (e.currentTarget as HTMLTextAreaElement).value.slice(
                              0,
                              REPORT_MAX_CHARS,
                            ),
                          }))
                        }
                      />
                      <small>
                        {answers[k].trim().length} / {REPORT_MIN_CHARS} caracteres mínimos
                      </small>
                    </label>
                  ))}
                  <fieldset class="sr-citations">
                    <legend>Vincula las evidencias examinadas a tu informe</legend>
                    <p class="sr-hint">
                      Selecciona las dos señales principales. Registrar una referencia no demuestra
                      que tu interpretación sea correcta.
                    </p>
                    {details.exhibits.slice(0, 2).map((e) => (
                      <label key={e.id}>
                        <input
                          type="checkbox"
                          checked={cited.includes(e.id)}
                          disabled={!inspected.includes(e.id)}
                          onChange={(event) => {
                            const checked = (event.currentTarget as HTMLInputElement).checked;
                            setCited((before) =>
                              checked
                                ? [...new Set([...before, e.id])]
                                : before.filter((id) => id !== e.id),
                            );
                          }}
                        />
                        <span>
                          {e.name} · {e.id}
                        </span>
                      </label>
                    ))}
                  </fieldset>
                  <div class="sr-report-actions">
                    <button class="btn btn-secondary" onClick={save}>
                      Guardar expediente
                    </button>
                    <button class="btn btn-secondary" onClick={download}>
                      <Download size={17} /> Exportar informe JSON
                    </button>
                  </div>
                  <label class="sr-attestation">
                    <input
                      type="checkbox"
                      checked={ack}
                      onChange={(e) => setAck((e.currentTarget as HTMLInputElement).checked)}
                    />
                    <span>
                      He contrastado las evidencias y entiendo que esta simulación no sustituye una
                      revisión de un instructor.
                    </span>
                  </label>
                  <button class="btn btn-gold" disabled={!allReady} onClick={finalize}>
                    <ClipboardCheck size={17} /> Registrar simulación ({score}/100)
                  </button>
                  {!allReady && (
                    <p class="sr-hint">
                      Para registrar: dos señales examinadas, hipótesis correcta, contención
                      confirmada, evidencias citadas, cuatro secciones completas y declaración de
                      alcance.
                    </p>
                  )}
                  {progress.value.senior.includes(`${p}:${current.id}`) && (
                    <p class="sr-complete">
                      <CheckCircle2 size={17} /> Simulación registrada para {providers[p].short}.
                    </p>
                  )}
                </section>
              )}
              {progress.value.senior.includes(`${p}:${current.id}`) && (
                <InstructorReview key={`${p}:${current.id}`} cloud={p} caseId={current.id} />
              )}
            </div>
            <aside class="sr-aside">
              <section class="info-card">
                <h3>Tablero de evidencias</h3>
                <div class="sr-score">
                  <strong>{score}</strong>
                  <span>/ 100 puntos de completitud</span>
                </div>
                <div class="sr-checks">
                  <span>{diagnosisReady ? '✓' : '○'} Diagnóstico de causa · requisito</span>
                  <span>{confirmedCorrect ? '✓' : '○'} Decisión confirmada · 25</span>
                  <span>{proofReady ? '✓' : '○'} Evidencias inspeccionadas · 20</span>
                  <span>{assessment.citationsReady ? '✓' : '○'} Referencias vinculadas · 15</span>
                  <span>{reportReady ? '✓' : '○'} Informe documentado · 30</span>
                  <span>{ack ? '✓' : '○'} Declaración de alcance · 10</span>
                </div>
                <p class="sr-hint">
                  La hipótesis técnica es un requisito adicional. La puntuación /100 mide el resto
                  de actividades; no certifica desempeño profesional.
                </p>
                <p class="sr-hint">
                  El expediente se guarda automáticamente por caso y proveedor en este navegador.
                </p>
              </section>
              <section class="info-card sr-checkpoint" aria-label="Respaldo de expediente Senior">
                <h3>Respaldo portable</h3>
                <p class="sr-hint">
                  Descarga o restaura <strong>solo este caso de {providers[p].short}</strong>. No
                  importa puntuaciones ni revisiones; nunca contiene credenciales cloud.
                </p>
                <div class="sr-report-actions">
                  <button
                    class="btn btn-secondary"
                    onClick={exportCheckpoint}
                    disabled={hydratedKey !== sessionKey}
                  >
                    <Download size={16} /> Guardar JSON del caso
                  </button>
                  <label class="btn btn-secondary sr-import-label">
                    <Upload size={16} /> Importar JSON del caso{' '}
                    <input
                      type="file"
                      accept=".json,application/json"
                      aria-label="Importar expediente JSON"
                      onChange={(event) => {
                        const input = event.currentTarget as HTMLInputElement;
                        void importCheckpoint(input.files?.[0] || null);
                        input.value = '';
                      }}
                    />
                  </label>
                </div>
                {checkpointError && (
                  <p class="sr-checkpoint-error" role="alert">
                    {checkpointError}
                  </p>
                )}
              </section>
              {playbook && (
                <section class="info-card sr-playbook">
                  <h3>Condiciones de recuperación</h3>
                  <p>{playbook.recoverySignal}</p>
                  <h4>Pregunta de postmortem</h4>
                  <p>{playbook.retrospective}</p>
                  <p class="sr-hint">Indicaciones educativas, no cambios ejecutables.</p>
                </section>
              )}
              <section class="info-card sr-review-rubric">
                <h3>Rúbrica de revisión humana</h3>
                <p class="sr-hint">
                  El instructor evalúa estas cinco dimensiones por separado. El puntaje automático
                  no sustituye la revisión técnica.
                </p>
                <ul class="sr-proof">
                  {seniorRubric.map((item) => (
                    <li key={item.id}>
                      <strong>
                        {item.weight}% · {item.label}
                      </strong>
                      <p>{item.guidance}</p>
                    </li>
                  ))}
                </ul>
                <button
                  class="btn btn-secondary"
                  onClick={() => {
                    if (!current) return;
                    downloadReport(
                      {
                        caseId: current.id,
                        provider: p,
                        studentReport: answers,
                        automaticCompletionScore: score,
                        review: {
                          status: 'pending-human-review',
                          rubric: seniorRubric,
                          notes: '',
                          reviewer: '',
                          reviewedAt: null,
                        },
                      },
                      `revision-docente-${p}-${current.id}.json`,
                    );
                  }}
                >
                  <Download size={16} /> Plantilla de revisión
                </button>
              </section>
              <section class="info-card">
                <h3>Rúbrica profesional</h3>
                <ul class="sr-proof">
                  {current.proof.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p class="sr-hint">
                  El instructor debe contrastar estas evidencias para evaluar dominio real.
                </p>
              </section>
              <section class="info-card">
                <h3>Contexto {providers[p].short}</h3>
                <strong>{details.service[p]}</strong>
                <p class="sr-hint">
                  Equivalencias: AWS · {details.service.aws}; Azure · {details.service.azure}; GCP ·{' '}
                  {details.service.gcp}.
                </p>
                <div class="terminal-block">
                  <pre>
                    <code>$ {details.command[p]}</code>
                  </pre>
                </div>
                <p class="sr-hint">
                  Ejemplo de comando de solo lectura, no ejecutado. Verifica contexto y permisos
                  antes de usarlo en una cuenta real.
                </p>
                <a
                  class="official-link"
                  href={providers[p].docs}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentación oficial <ExternalLink size={14} />
                </a>
              </section>
              {practice && (
                <section class="info-card sr-practice">
                  <h3>Cuaderno práctico · {providers[p].short}</h3>
                  <p>{practice.goal}</p>
                  <h4>Entregables que debe revisar un instructor</h4>
                  <ul class="sr-proof">
                    {practice.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <h4>Consultas de diagnóstico sugeridas</h4>
                  <p class="sr-hint">
                    Solo lectura. Requieren una cuenta autorizada y nunca se ejecutan en esta web.
                  </p>
                  {practice.commands[p].map((cmd) => (
                    <div class="terminal-block" key={cmd}>
                      <pre>
                        <code>$ {cmd}</code>
                      </pre>
                    </div>
                  ))}
                  <p class="sr-hint">
                    <strong>Riesgo frecuente:</strong> {practice.pitfall}
                  </p>
                  <a
                    class="official-link"
                    href={`/senior-guides/${p}/${current.id}.md`}
                    download={`${current.id}-${p}-cuaderno.md`}
                  >
                    Descargar cuaderno del caso <Download size={15} />
                  </a>
                </section>
              )}
            </aside>
          </div>
        </>
      ) : (
        <>
          <div class="sr-banner">
            <div>
              <span class="sr-kicker">CLOUD ENGINEERING / SIMULADOR DE PRODUCCIÓN</span>
              <h1>
                Senior Mode<span>_</span>
              </h1>
              <p>
                18 escenarios por proveedor. Inspecciona señales, decide con criterio y documenta tu
                respuesta. No se ejecuta infraestructura real.
              </p>
              <div class="sr-inline">
                <span>{challenges.length} casos</span>
                <span>
                  {completed} registrados en {providers[p].short}
                </span>
                <span>4 etapas por escenario</span>
              </div>
            </div>
            <img src={providers[p].mascot} alt="Mascota del proveedor seleccionado" />
          </div>
          <div class="sr-filters">
            <label>
              <Search size={17} />
              <input
                aria-label="Buscar casos"
                placeholder="Buscar por incidente o competencia"
                value={query}
                onInput={(e) => setQuery((e.currentTarget as HTMLInputElement).value)}
              />
            </label>
            <select
              aria-label="Filtrar severidad"
              value={severity}
              onChange={(e) => setSeverity((e.currentTarget as HTMLSelectElement).value)}
            >
              <option value="todos">Todas las severidades</option>
              <option>Crítica</option>
              <option>Alta</option>
              <option>Media</option>
            </select>
          </div>
          <div class="senior-grid">
            {filtered.map((c) => (
              <button class="senior-card" key={c.id} onClick={() => open(c)}>
                <div class="senior-card-head">
                  <span class="senior-id">{c.id.toUpperCase()}</span>
                  <span class="sr-severity">{c.severity}</span>
                </div>
                <div class="senior-card-icon">
                  <CloudCog size={23} />
                </div>
                <small class="sr-category">{c.category}</small>
                <h3>{c.title}</h3>
                <p>{c.brief}</p>
                <div class="senior-card-footer">
                  <span>
                    {progress.value.senior.includes(`${p}:${c.id}`)
                      ? '✓ Registrado'
                      : progress.value.notes[`senior-session:${p}:${c.id}`]
                        ? '↻ Reanudar expediente'
                        : 'Abrir expediente'}
                  </span>
                  <ArrowRight size={17} />
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && <p>No encontramos casos con ese filtro.</p>}
          {attempts.length > 0 && (
            <section class="sr-history info-card">
              <h2>Bitácora personal · {providers[p].short}</h2>
              <p>
                Resultados registrados en este dispositivo; no equivalen a una acreditación técnica.
              </p>
              <div class="sr-history-table" role="list">
                {attempts.map((a, i) => (
                  <div class="sr-history-row" role="listitem" key={`${a.caseId}-${a.at}-${i}`}>
                    <strong>{a.caseId.toUpperCase()}</strong>
                    <span>{new Date(a.at).toLocaleString('es-PE')}</span>
                    <span>
                      {a.correct ? '✓ Decisión defendible' : '✕ Decisión de riesgo'} · {a.score}/100
                    </span>
                    <button
                      class="btn btn-secondary"
                      onClick={() => {
                        const c = challenges.find((x) => x.id === a.caseId);
                        if (c) open(c);
                      }}
                    >
                      Reabrir caso
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section class="sr-disclaimer">
            <TriangleAlert size={20} />
            <p>
              Todos los casos, logs y evaluaciones son sintéticos. Esta plataforma registra
              respuestas y completitud; no certifica competencia sin revisión externa.
            </p>
          </section>
        </>
      )}
    </main>
  );
}
