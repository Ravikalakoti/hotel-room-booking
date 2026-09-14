export default function StepSection({ number, title, children, className = '' }) {
  return (
    <section className={`step-section ${className}`}>
      <header className="step-section__header">
        <span className="step-section__number" aria-hidden="true">
          {number}
        </span>
        <h2>{title}</h2>
      </header>
      <div className="step-section__body">{children}</div>
    </section>
  );
}
