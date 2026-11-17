import { useEffect, useRef, useState } from 'preact/hooks';
import type { Provider } from '../../../data/course';
import { challenges, type Challenge } from '../../../data/senior';
import { seniorDiagnostics } from '../../../data/seniorDiagnostics';
import { investigationFor } from '../../../data/seniorInvestigations';
import { seniorPlaybooks } from '../../../data/seniorPlaybooks';
import { createSeniorCheckpoint, parseSeniorCheckpoint } from '../../../lib/seniorCheckpoint.mjs';
import { evaluateSeniorEvidence } from '../../../lib/seniorEvaluation.mjs';
import {
  emptySeniorSession,
  normalizeSeniorSession,
  seniorSessionKey,
  serializeSeniorSession,
  type SeniorReport,
  type SeniorSession,
} from '../../../lib/seniorSession.mjs';
import {
  completeSenior,
  currentSeniorCaseId,
  navigate,
  notify,
  progress,
  provider,
  recordSeniorAttempt,
  setNotes,
} from '../../../lib/state';
import { MAX_CHECKPOINT_BYTES } from '../constants/senior.constants';
import { downloadReport } from '../libs/downloadJsonFile';
import { hydrateCaseSession } from '../libs/hydrateCaseSession';

const getLegacyKey = (cloud_id: Provider, challenge: Challenge) =>
  `senior:${cloud_id}:${challenge.id}`;

export function useSeniorCaseSession() {
  const [session, setSession] = useState<SeniorSession>(emptySeniorSession());
  const [hydratedKey, setHydratedKey] = useState('');
  const [checkpointError, setCheckpointError] = useState('');

  const p = provider.value;
  const active_case_id = currentSeniorCaseId.value;
  const current = active_case_id
    ? challenges.find((item) => item.id === active_case_id) || null
    : null;
  const liveScope = useRef({ provider: p, caseId: current?.id });
  liveScope.current = { provider: p, caseId: current?.id };

  const details = current ? investigationFor(current.id) : null;
  const diagnostic = current ? seniorDiagnostics[current.id] : null;
  const playbook = current ? seniorPlaybooks[current.id] : null;
  const sessionKey = current ? seniorSessionKey(p, current.id) : '';
  const legacy_key = current ? getLegacyKey(p, current) : '';

  useEffect(() => {
    if (!current) {
      setSession(emptySeniorSession());
      setHydratedKey('');
      return;
    }
    const restored = hydrateCaseSession(
      progress.value.notes[sessionKey],
      progress.value.notes[legacy_key],
    );
    setSession(restored);
    setHydratedKey(sessionKey);
  }, [sessionKey]);

  useEffect(() => {
    if (sessionKey && hydratedKey === sessionKey) {
      setNotes(sessionKey, serializeSeniorSession(session));
    }
  }, [sessionKey, hydratedKey, session]);

  const update = (change: Partial<SeniorSession>) =>
    setSession((previous) => normalizeSeniorSession({ ...previous, ...change }));

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
  const decisionCorrect = !!current && choice === current.correct;
  const isCompleted = !!current && progress.value.senior.includes(`${p}:${current.id}`);

  const assessment = evaluateSeniorEvidence({
    decisionLocked,
    decisionCorrect,
    requiredExhibits: details?.exhibits.slice(0, 2).map((exhibit) => exhibit.id) || [],
    inspected,
    cited,
    report: answers,
    acknowledged: ack,
  });
  const allReady = assessment.ready && diagnosisReady && !isCompleted;

  const saveNow = () => {
    if (sessionKey && hydratedKey === sessionKey) {
      setNotes(sessionKey, serializeSeniorSession(session));
    }
  };

  const openCase = (next_case: Challenge | null) => {
    saveNow();
    setCheckpointError('');
    navigate('senior', next_case ? { caseId: next_case.id } : undefined);
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
    const requestedProvider = p;
    const requestedCase = current.id;
    try {
      if (file.size > MAX_CHECKPOINT_BYTES) throw new Error('El expediente supera 48 KB');
      const imported = parseSeniorCheckpoint(await file.text(), requestedProvider, requestedCase);
      if (
        liveScope.current.provider !== requestedProvider ||
        liveScope.current.caseId !== requestedCase
      ) {
        throw new Error('El contexto cloud cambió durante la importación');
      }
      if (
        !window.confirm(
          '¿Restaurar este expediente y reemplazar solo el borrador actual de este caso?',
        )
      ) {
        return;
      }
      if (
        liveScope.current.provider !== requestedProvider ||
        liveScope.current.caseId !== requestedCase
      ) {
        throw new Error('El contexto cloud cambió durante la importación');
      }
      setSession(imported);
      setHydratedKey(seniorSessionKey(requestedProvider, requestedCase));
      setCheckpointError('');
      notify('Borrador Senior restaurado para este proveedor y caso');
    } catch (error) {
      setCheckpointError(error instanceof Error ? error.message : 'Expediente inválido');
    }
  };

  const confirmDecision = () => {
    if (!current || choice === null || decisionLocked || !diagnosisReady) return;
    update({ decisionLocked: true });
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

  const finalize = () => {
    if (!current || !details || !allReady || isCompleted) return;
    recordSeniorAttempt({
      caseId: current.id,
      provider: p,
      correct: true,
      score: assessment.score,
      at: new Date().toISOString(),
      examined: inspected,
      report: { ...answers, citations: cited },
    });
    completeSenior(`${p}:${current.id}`);
    saveNow();
    setNotes(legacy_key, JSON.stringify(answers));
    notify('Simulación registrada; pendiente de revisión humana');
  };

  return {
    cloudId: p,
    current,
    details,
    diagnostic,
    playbook,
    session,
    ack,
    stage,
    assessment,
    diagnosisCorrect,
    inspectedPrimary,
    diagnosisReady,
    decisionCorrect,
    allReady,
    isCompleted,
    checkpointReady: hydratedKey === sessionKey,
    checkpointError,
    update,
    saveNow,
    openCase,
    exportCheckpoint,
    importCheckpoint,
    confirmDecision,
    finalize,
    inspectExhibit: (id: string) =>
      setSession((prev) =>
        normalizeSeniorSession({
          ...prev,
          inspected: prev.inspected.includes(id) ? prev.inspected : [...prev.inspected, id],
        }),
      ),
    updateReportSection: (key: keyof SeniorReport, val: string) =>
      setSession((prev) =>
        normalizeSeniorSession({ ...prev, answers: { ...prev.answers, [key]: val } }),
      ),
    toggleCitation: (id: string, checked: boolean) =>
      setSession((prev) =>
        normalizeSeniorSession({
          ...prev,
          cited: checked ? [...new Set([...prev.cited, id])] : prev.cited.filter((x) => x !== id),
        }),
      ),
  };
}
