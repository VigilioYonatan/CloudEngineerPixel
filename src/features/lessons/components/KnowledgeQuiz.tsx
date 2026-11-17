import { CheckCircle2, CircleHelp } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { CloudMentor } from '../../../components/mascot/CloudMentor';
import { questions, type Module } from '../../../data/course';
import { progress, provider, setQuiz } from '../../../lib/state';
import { Tag } from '../../../shared/ui/Tag';

type QuizProps = {
  module: Module;
};

export function Quiz({ module: mod }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const active_cloud = provider.value;
  const question = questions[mod.id];
  const saved_score = progress.value.quiz[`${active_cloud}:${mod.id}`];

  useEffect(() => {
    setSelected(null);
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
          Última puntuación guardada: {saved_score}% · Puedes volver a intentarlo.
        </small>
      )}
    </div>
  );
}
