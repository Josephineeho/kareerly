import React from 'react';

export default function ColorStyleGuide() {
  return (
    <div className="min-h-screen bg-surface text-on-surface p-8 font-sans">
      <header className="mb-12 border-b border-outline-variant pb-6">
        <h1 className="text-4xl font-bold font-display text-primary mb-2">
          hustleHub Design System
        </h1>
        <p className="text-text-muted">
          Visual reference for core colors, surfaces, typography, and elevation rules.
        </p>
      </header>

      {/* --- CORE PALETTE --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-display mb-6">Core Palette & Branding</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-primary text-white shadow-sm">
            <p className="font-bold">Primary</p>
            <span className="text-xs opacity-80">bg-primary</span>
          </div>
          <div className="p-4 rounded-xl bg-primary-container text-white shadow-sm">
            <p className="font-bold">Primary Container</p>
            <span className="text-xs opacity-80">bg-primary-container</span>
          </div>
          <div className="p-4 rounded-xl bg-secondary text-white shadow-sm">
            <p className="font-bold">Secondary</p>
            <span className="text-xs opacity-80">bg-secondary</span>
          </div>
          <div className="p-4 rounded-xl bg-secondary-container text-on-secondary-container shadow-sm">
            <p className="font-bold text-on-secondary-container">Secondary Container</p>
            <span className="text-xs">bg-secondary-container</span>
          </div>
          <div className="p-4 rounded-xl bg-tertiary text-white shadow-sm">
            <p className="font-bold">Tertiary</p>
            <span className="text-xs opacity-80">bg-tertiary</span>
          </div>
          <div className="p-4 rounded-xl bg-error text-white shadow-sm">
            <p className="font-bold">Error</p>
            <span className="text-xs opacity-80">bg-error</span>
          </div>
          <div className="p-4 rounded-xl bg-muted text-white shadow-sm">
            <p className="font-bold">Muted</p>
            <span className="text-xs opacity-80">bg-muted</span>
          </div>
          <div className="p-4 rounded-xl primary-gradient text-white shadow-sm">
            <p className="font-bold">Signature Gradient</p>
            <span className="text-xs opacity-80">primary-gradient</span>
          </div>
        </div>
      </section>

      {/* --- SURFACE ARCHITECTURE --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-display mb-2">Surface Architecture</h2>
        <p className="text-text-muted mb-6 text-sm">Testing depth contrast using the "No-Line" Rule instead of harsh borders.</p>
        
        <div className="p-6 bg-surface-container-low rounded-xl space-y-4">
          <span className="text-xs font-bold text-text-muted uppercase">Container Low (Base Wrapper)</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-tonal-lift">
              <h3 className="font-bold font-display text-lg mb-1">Lowest Surface</h3>
              <p className="text-sm text-on-surface-variant">Perfect for elevated cards. Features the custom tonal lift shadow.</p>
              <span className="text-xs text-text-muted block mt-4 font-mono">bg-surface-container-lowest shadow-tonal-lift</span>
            </div>

            <div className="p-6 bg-surface-container-high rounded-xl">
              <h3 className="font-bold font-display text-lg mb-1">High Surface</h3>
              <p className="text-sm text-on-surface-variant">Good for subtle structural separations or sidebars.</p>
              <span className="text-xs text-text-muted block mt-4 font-mono">bg-surface-container-high</span>
            </div>

            <div className="p-6 bg-surface-container-highest rounded-xl">
              <h3 className="font-bold font-display text-lg mb-1">Highest Surface</h3>
              <p className="text-sm text-on-surface-variant">The darkest container tier for stark contrast elements.</p>
              <span className="text-xs text-text-muted block mt-4 font-mono">bg-surface-container-highest</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- TYPOGRAPHY & CONTRAST --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-display mb-6">Typography & Hierarchy</h2>
        <div className="space-y-4 max-w-2xl bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
          <div>
            <h1 className="text-3xl font-bold font-display text-on-surface">Display Headline (Manrope/Sans)</h1>
            <span className="text-xs text-text-muted font-mono">text-on-surface font-display</span>
          </div>
          <div>
            <p className="text-base text-on-surface-variant font-sans">
              Body text goes here. This uses the variant text color which offers high readability but softens the stark contrast against pure light backgrounds.
            </p>
            <span className="text-xs text-text-muted font-mono">text-on-surface-variant font-sans</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">
              Secondary details, captions, or timestamp information.
            </p>
            <span className="text-xs text-text-muted font-mono">text-text-muted</span>
          </div>
        </div>
      </section>
    </div>
  );
}