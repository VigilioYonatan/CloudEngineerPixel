import { ArrowLeft } from 'lucide-preact';
import { getProviderMeta } from '../../../domain/providers';
import { SeniorMascotStage } from '../components/SeniorMascotStage';
import type { SeniorPostmortemExtras, SeniorStage } from '../../../lib/seniorSession.mjs';
import { navigate, notify } from '../../../lib/state';
import { CloudProviderLogo } from '../../../shared/ui/CloudProviderLogo';
import { DecisionStage } from '../components/DecisionStage';
import { DiagnosisStage } from '../components/DiagnosisStage';
import { InstructorReview } from '../components/InstructorReview';
import { InvestigationStage } from '../components/InvestigationStage';
import { ReportStage } from '../components/ReportStage';
import { SeniorCatalog } from '../components/SeniorCatalog';
import { SeniorSidebar } from '../components/SeniorSidebar';
import { SENIOR_STAGE_ITEMS } from '../constants/senior.constants';
import { useSeniorCaseSession } from '../hooks/use-senior-case-session';
import {
  buildSeniorPostmortemMarkdown,
  downloadMarkdownFile,
} from '../libs/buildSeniorPostmortemMarkdown';
import { downloadReport } from '../libs/downloadJsonFile';

export function SeniorWorkbench() {
  const state = useSeniorCaseSession();
  const { current, details, diagnostic, playbook, session, stage, cloudId: p } = state;
  const cloud_meta = getProviderMeta(p);

  return (
    <main class="page-container senior-v3">
      {current && details ? (
        <>
          <div class="breadcrumb">
            <button
              type="button"
              onClick={() => {
                state.openCase(null);
                window.scrollTo(0, 0);
              }}
            >
              <ArrowLeft size={16} /> Volver a escenarios
            </button>
            <span> / {current.id.toUpperCase()}</span>
          </div>
          <div class="sr-top">
            <div>
              <span class="sr-kicker sr-kicker-with-logo">
                <CloudProviderLogo providerId={p} size={18} />
                CENTRO DE OPERACIONES / {cloud_meta.short} / {current.id.toUpperCase()}
              </span>
              <h1>{current.title}</h1>
              <p>{current.brief}</p>
              <div class="sr-inline">
                <span>{current.category}</span>
                <span>{current.severity}</span>
                <span>{details.service[p]}</span>
              </div>
            </div>
            <SeniorMascotStage
              providerId={p}
              alt={`Mentor ${cloud_meta.short} investigando ${current.id.toUpperCase()}`}
              topPill={current.severity}
            />
          </div>

          <nav class="sr-stage-tabs" aria-label="Etapas del incidente">
            {SENIOR_STAGE_ITEMS.map(({ id: s, label }, idx) => (
              <button
                type="button"
                key={s}
                aria-current={stage === s ? 'step' : undefined}
                class={stage === s ? 'active' : ''}
                onClick={() => state.update({ stage: s as SeniorStage })}
              >
                <span>0{idx + 1}</span>
                {label}
              </button>
            ))}
          </nav>

          <div class="sr-layout">
            <div class="sr-main">
              {state.stage === 'investigar' && (
                <InvestigationStage
                  cloudId={p}
                  caseId={current.id}
                  details={details}
                  playbook={playbook}
                  inspected={session.inspected}
                  onInspectExhibit={state.inspectExhibit}
                  onAdvanceToDiagnosis={() => state.update({ stage: 'diagnosticar' })}
                />
              )}
              {state.stage === 'diagnosticar' && diagnostic && (
                <DiagnosisStage
                  caseId={current.id}
                  diagnostic={diagnostic}
                  diagnosisChoice={session.diagnosisChoice}
                  diagnosisLocked={session.diagnosisLocked}
                  diagnosisCorrect={state.diagnosisCorrect}
                  inspectedPrimary={state.inspectedPrimary}
                  diagnosisReady={state.diagnosisReady}
                  onSelectDiagnosis={(idx) => state.update({ diagnosisChoice: idx })}
                  onConfirmDiagnosis={() => state.update({ diagnosisLocked: true })}
                  onResetDiagnosis={() =>
                    state.update({ diagnosisChoice: null, diagnosisLocked: false })
                  }
                  onAdvanceToDecision={() => state.update({ stage: 'decidir' })}
                  onOpenLesson={(resourceId, unitIndex) =>
                    navigate('lesson', { resourceId, unitIndex })
                  }
                />
              )}
              {state.stage === 'decidir' && (
                <DecisionStage
                  challenge={current}
                  choice={session.choice}
                  decisionLocked={session.decisionLocked}
                  decisionCorrect={state.decisionCorrect}
                  diagnosisReady={state.diagnosisReady}
                  setChoice={(idx) => state.update({ choice: idx })}
                  onConfirmDecision={state.confirmDecision}
                  onResetDecision={() => state.update({ choice: null, decisionLocked: false })}
                  onAdvanceToReport={() => state.update({ stage: 'informe' })}
                  onOpenLesson={(resourceId, unitIndex) =>
                    navigate('lesson', { resourceId, unitIndex })
                  }
                />
              )}
              {state.stage === 'informe' && (
                <ReportStage
                  details={details}
                  providerShort={cloud_meta.short}
                  answers={session.answers}
                  postmortemExtras={session.postmortemExtras}
                  inspected={session.inspected}
                  cited={session.cited}
                  acknowledged={state.ack}
                  allReady={state.allReady}
                  score={state.assessment.score}
                  isCompleted={state.isCompleted}
                  onUpdateSection={state.updateReportSection}
                  onUpdatePostmortemExtra={(key: keyof SeniorPostmortemExtras, val: string) =>
                    state.update({
                      postmortemExtras: { ...session.postmortemExtras, [key]: val },
                    })
                  }
                  onToggleCitation={state.toggleCitation}
                  onChangeAcknowledged={(checked) => state.update({ acknowledged: checked })}
                  onSaveDraft={() => {
                    state.saveNow();
                    notify('Expediente guardado en este dispositivo');
                  }}
                  onExportReport={() =>
                    downloadReport(
                      {
                        caseId: current.id,
                        caseTitle: current.title,
                        provider: p,
                        decision: session.choice === null ? null : current.choices[session.choice],
                        correct: state.assessment.decision,
                        inspected: session.inspected,
                        cited: session.cited,
                        decisionLocked: session.decisionLocked,
                        report: session.answers,
                        postmortemExtras: session.postmortemExtras,
                        checklistAcknowledged: state.ack,
                        diagnosis: {
                          selected: session.diagnosisChoice,
                          correct: state.diagnosisCorrect,
                        },
                        score: state.assessment.score,
                        educationalOnly: true,
                        exportedAt: new Date().toISOString(),
                      },
                      `informe-${p}-${current.id}.json`,
                    )
                  }
                  onExportPostmortemMd={() => {
                    const md = buildSeniorPostmortemMarkdown({
                      caseId: current.id,
                      caseTitle: current.title,
                      providerShort: cloud_meta.short,
                      severity: current.severity,
                      service: details.service[p],
                      score: state.assessment.score,
                      decisionLabel:
                        session.choice === null ? 'Sin confirmar' : current.choices[session.choice],
                      inspected: session.inspected,
                      cited: session.cited,
                      answers: session.answers,
                      extras: session.postmortemExtras,
                    });
                    downloadMarkdownFile(md, `postmortem-adr-${p}-${current.id}.md`);
                  }}
                  onFinalizeSimulation={state.finalize}
                />
              )}
              {state.isCompleted && (
                <InstructorReview key={`${p}:${current.id}`} cloud={p} caseId={current.id} />
              )}
            </div>

            <SeniorSidebar
              cloudId={p}
              challenge={current}
              details={details}
              playbook={playbook}
              answers={session.answers}
              score={state.assessment.score}
              diagnosisReady={state.diagnosisReady}
              confirmedCorrect={state.assessment.decision}
              proofReady={state.assessment.examinedReady}
              citationsReady={state.assessment.citationsReady}
              reportReady={state.assessment.reportReady}
              acknowledged={state.ack}
              checkpointReady={state.checkpointReady}
              checkpointError={state.checkpointError}
              onExportCheckpoint={state.exportCheckpoint}
              onImportCheckpoint={(file) => void state.importCheckpoint(file)}
            />
          </div>
        </>
      ) : (
        <SeniorCatalog
          cloudId={p}
          onOpenCase={(challenge) => {
            state.openCase(challenge);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </main>
  );
}
