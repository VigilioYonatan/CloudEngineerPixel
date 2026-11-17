import { moduleService, services, type Module, type Provider } from '../../../data/course';
import { getProviderMeta } from '../../../domain/providers';
import { ENGINEERING_PROCEDURE_STEPS } from '../constants/lesson.constants';

export type TopicExplanation = {
  intro: string;
  goal: string;
  steps: readonly string[];
};

export function buildTopicExplanation(
  topic_title: string,
  mod: Module,
  cloud_id: Provider,
): TopicExplanation {
  const service_entry = services[cloud_id][moduleService(mod.id)];
  const cloud_meta = getProviderMeta(cloud_id);
  return {
    intro: `${topic_title} es una competencia esencial dentro de ${mod.title.toLowerCase()}. Antes de configurar recursos, identifica el objetivo, las dependencias, las restricciones de seguridad y el costo de operar la solución.`,
    goal: `En ${cloud_meta.name}, estudia cómo se relaciona este tema con ${service_entry.label}. Comprueba los requisitos de región, identidad, red y observabilidad antes de implementar.`,
    steps: ENGINEERING_PROCEDURE_STEPS,
  };
}
