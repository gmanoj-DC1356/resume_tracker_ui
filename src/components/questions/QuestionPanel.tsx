interface Level {
  name: string;
  description: string;
}

const LEVELS: Level[] = [
  { name: 'Low', description: 'Fundamentals and core concepts from the resume.' },
  { name: 'Medium', description: 'Applied scenarios tied to the job description.' },
  { name: 'High', description: 'Deep-dive and design questions for the gaps and senior skills.' },
];

// Descriptive card only — question generation itself is not exposed in the UI yet.
export function QuestionPanel() {
  return (
    <section
      aria-labelledby="question-card-title"
      className="mt-4 rounded-xl border border-brand-line bg-white p-4 shadow-sm"
    >
      <h4
        id="question-card-title"
        className="text-sm font-semibold uppercase tracking-wide text-brand-primary"
      >
        Interview questions
      </h4>
      <p className="mt-2 text-sm text-brand-muted">
        Questions are generated for the selected candidate at three difficulty levels.
      </p>
      <ul className="mt-3 space-y-2">
        {LEVELS.map((level) => (
          <li key={level.name} className="text-sm text-brand-text">
            <span className="font-semibold text-brand-primary">{level.name}:</span>{' '}
            {level.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
