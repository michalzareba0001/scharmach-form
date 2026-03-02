import PricingForm from './components/PricingForm';

export default function Home() {
  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-dark)]/80 backdrop-blur-lg border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="https://scharmach.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          ></a>
          <a
            href="tel:+48535959510"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          ></a>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full px-4 py-2 text-sm text-[var(--text-secondary)]">
              <span className="animate-pulse-slow">✨</span>
              <span>Wycena aplikacji mobilnej Flutter</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ile kosztuje{' '}
              <span className="gradient-text">Twoja aplikacja</span>?
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Odpowiedz na kilka pytań i otrzymaj orientacyjną wycenę w kilka
              minut. Bez zobowiązań, bez ukrytych kosztów.
            </p>
          </div>

          {/* Form */}
          <PricingForm />

          {/* Trust badges */}
          <div className="mt-16 text-center space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>26 000+ klientów</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>4.6/5 gwiazdek</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>20+ lat doświadczenia</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Współpracują z nami: Google, Lotos, Nokia, Santander, WWF i wiele
              innych
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
