import React, { useState } from 'react';
import { BUILDER_TEMPLATES } from '../data/hostingData';
import { Sparkles, Wand2, Monitor, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function WebsiteBuilderShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState(BUILDER_TEMPLATES[0]);
  const [aiPrompt, setAiPrompt] = useState('Build a modern artisanal coffee shop website with online ordering and menu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (isGenerating) return;

    setIsGenerating(true);
    setGenerationProgress(10);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  return (
    <section id="builder" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-purple-pill" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={12} /> NO CODING REQUIRED
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-secondary-950)', marginBottom: '1rem' }}>
            Gofayda AI Website Builder
          </h2>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)' }}>
            Describe your vision in plain text and watch our AI create a fully functional, mobile-responsive website in less than 60 seconds.
          </p>
        </div>

        {/* AI Prompt Input Bar */}
        <div style={{
          backgroundColor: 'var(--color-secondary-50)',
          border: '1px solid var(--color-secondary-200)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2rem',
          maxWidth: '900px',
          margin: '0 auto 4rem auto',
          boxShadow: 'var(--shadow-card)'
        }}>
          <form onSubmit={handleGenerate}>
            <label style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'bold',
              color: 'var(--color-secondary-900)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              <Wand2 size={16} color="var(--color-secondary-500)" />
              Try the AI Generator Demo: What kind of website do you want to build?
            </label>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. A digital marketing agency portfolio with client case studies..."
                style={{
                  flexGrow: 1,
                  padding: '0.875rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-neutral-300)',
                  outline: 'none',
                  fontSize: 'var(--font-size-base)',
                  backgroundColor: '#ffffff'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isGenerating}
                style={{ minWidth: '180px' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Site
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Progress bar during simulation */}
          {isGenerating && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{
                display: 'flex',
                justify: 'space-between',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'bold',
                color: 'var(--color-secondary-700)',
                marginBottom: '0.35rem'
              }}>
                <span>Creating layout, palette & AI content...</span>
                <span>{generationProgress}%</span>
              </div>
              <div style={{
                height: '8px',
                backgroundColor: 'var(--color-secondary-200)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${generationProgress}%`,
                  backgroundColor: 'var(--color-secondary-500)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Template Selector Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Template Info & Selector Buttons */}
          <div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-secondary-900)', marginBottom: '1.5rem' }}>
              Explore Designer-Crafted Templates
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {BUILDER_TEMPLATES.map(template => {
                const isSelected = selectedTemplate.id === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${isSelected ? 'var(--color-secondary-500)' : 'var(--color-neutral-200)'}`,
                      backgroundColor: isSelected ? 'var(--color-secondary-50)' : '#ffffff',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-secondary-900)' }}>
                        {template.title}
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-600)', marginTop: '0.25rem' }}>
                        {template.description}
                      </div>
                    </div>
                    {isSelected && <CheckCircle size={20} color="var(--color-secondary-500)" />}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
            >
              Start Building Now <ArrowRight size={18} />
            </button>
          </div>

          {/* Template Visual Screen Preview */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card-hover)',
            border: '1px solid var(--color-neutral-300)'
          }}>
            <div style={{
              backgroundColor: 'var(--color-neutral-900)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Monitor size={16} color="var(--color-accent-400)" />
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>{selectedTemplate.title}</span>
              </div>
              <span className="badge badge-accent" style={{ fontSize: '0.6rem' }}>
                AI RESPONSIVE PREVIEW
              </span>
            </div>

            <img
              src={selectedTemplate.previewUrl}
              alt={selectedTemplate.title}
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
