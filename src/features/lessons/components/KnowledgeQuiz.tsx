import { BookOpen, CheckCircle2, CircleHelp } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { CloudMentor } from '../../../components/mascot/CloudMentor';
import { questions, type Module } from '../../../data/course';
import { quizBank } from '../../../data/quizBank';
import { getQuizStats, navigate, progress, provider, setQuiz } from '../../../lib/state';
import { Tag } from '../../../shared/ui/Tag';

type QuizProps = {
  module: Module;
};

export function Quiz({ module: mod }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [bankIdx, setBankIdx] = useState(0);
  const [bankChoice, setBankChoice] = useState<number | null>(null);
  const active_cloud = provider.value;
  const question = questions[mod.id];
  const saved_score = progress.value.quiz[`${active_cloud}:${mod.id}`];
  const stats = getQuizStats(mod.id, active_cloud);
  const moduleQuestions = quizBank[mod.id] || [];
  const activeBankQ = moduleQuestions[bankIdx];

  useEffect(() => {
    setSelected(null);
    setBankIdx(0);
    setBankChoice(null);
  }, [mod.id, active_cloud]);

  return (
    <div class="quiz-card">
      <div class="quiz-title">
        <CircleHelp size={19} />
        <strong>Knowledge Check</strong>
        <Tag kind="accent">AUTOEVALUACIÓN</Tag>
      </div>
      <p>{question.q}</p>
      <div class="quiz-options">
        {question.choices.map((choice, index) => (
          <button
            type="button"
            key={choice}
            class={`${selected === index ? 'quiz-selected' : ''} ${selected !== null && index === question.correct ? 'quiz-correct' : ''} ${selected === index && index !== question.correct ? 'quiz-wrong' : ''}`}
            onClick={() => {
              setSelected(index);
              setQuiz(mod.id, active_cloud, index === question.correct ? 100 : 0);
            }}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {choice}
            {selected !== null && index === question.correct && <CheckCircle2 size={18} />}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          class={`quiz-feedback quiz-feedback-mentor ${selected === question.correct ? 'feedback-success' : 'feedback-warn'}`}
        >
          <CloudMentor
            providerId={active_cloud}
            variant="pose"
            pose={selected === question.correct ? 'celebrating' : 'thinking'}
            size="compact"
          />
          <div>
            <strong>
              {selected === question.correct ? '¡Respuesta correcta!' : 'Sigue investigando.'}
            </strong>
            <p>{question.why}</p>
          </div>
        </div>
      )}
      {saved_score !== undefined && selected === null && (
        <small class="prior-attempt">
          Mejor puntuación: {stats?.bestScore ?? saved_score}% · Último intento:{' '}
          {stats?.lastScore ?? saved_score}% ({stats?.attempts ?? 1} intento(s)).
        </small>
      )}
      {activeBankQ && (
        <details class="sr-adr-extras">
          <summary>
            Banco por unidad ({bankIdx + 1}/{moduleQuestions.length} · {activeBankQ.kind})
          </summary>
          <p>{activeBankQ.prompt}</p>
          <div class="quiz-options">
            {activeBankQ.choices.map((c, idx) => (
              <button
                type="button"
                key={c}
                class={bankChoice === idx ? 'decision-selected' : ''}
                onClick={() => setBankChoice(idx)}
              >
                <span>{String.fromCharCode(65 + idx)}</span> {c}
              </button>
            ))}
          </div>
          {bankChoice !== null && (
            <div class="sr-attempt-detail">
              <p>{activeBankQ.optionReasons[bankChoice]}</p>
              <button
                type="button"
                class="btn btn-secondary btn-compact"
                onClick={() =>
                  navigate('lesson', { resourceId: mod.id, unitIndex: activeBankQ.unitIndex })
                }
              >
                <BookOpen size={14} /> Repasar unidad {activeBankQ.unitIndex + 1}
              </button>
            </div>
          )}
          <div class="sr-report-actions" style={{ marginTop: '8px' }}>
            {moduleQuestions.map((item, idx) => (
              <button
                type="button"
                key={item.id}
                class={`btn btn-compact ${idx === bankIdx ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  setBankIdx(idx);
                  setBankChoice(null);
                }}
              >
                P{idx + 1}
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
