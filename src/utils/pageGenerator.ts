interface FormData {
  productName: string;
  productDescription: string;
  benefits: string[];
  callToAction: string;
  ctaLink: string;
  contactInfo: string;
  image: string;
  style: string;
  layout: string;
  animations: boolean;
  animationLevel: 'subtle' | 'moderate' | 'dynamic';
  interactiveFeatures: {
    carousel: boolean;
    lightbox: boolean;
    parallax: boolean;
    counters: boolean;
    microInteractions: boolean;
  };
  optionalSections: {
    testimonials: boolean;
    faq: boolean;
    gallery: boolean;
    pricing: boolean;
  };
  testimonials?: Array<{ text: string; name: string; role: string }>;
  faq?: Array<{ question: string; answer: string }>;
  gallery?: string[];
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

interface StyleConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  font: string;
  layout: 'centered' | 'split' | 'fullwidth';
  gradient: string;
}

interface GeneratedPage {
  html: string;
  css: string;
  js: string;
  preview: string;
}

export const generateLandingPage = (formData: FormData): GeneratedPage => {
  const styleConfig = getStyleConfig(formData.style, formData.customColors);
  
  const heroSection = generateHeroSection(formData, styleConfig);
  const benefitsSection = generateBenefitsSection(formData, styleConfig);
  const optionalSectionsHtml = generateOptionalSections(formData, styleConfig);
  const ctaSection = generateCTASection(formData, styleConfig);
  const footerSection = generateFooterSection(formData, styleConfig);
  
  const css = generateAdvancedCSS(styleConfig, formData.layout, formData.animationLevel);
  const js = generateAdvancedJavaScript(formData);
  
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.productName} - Landing Page</title>
    <meta name="description" content="${formData.productDescription}">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
    <div class="page-container">
        ${heroSection}
        ${benefitsSection}
        ${optionalSectionsHtml}
        ${ctaSection}
        ${footerSection}
    </div>
    ${formData.interactiveFeatures.lightbox ? generateLightboxHTML() : ''}
    <script>${js}</script>
</body>
</html>`;

  return {
    html,
    css,
    js,
    preview: html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  };
};

const generateHeroSection = (formData: FormData, styleConfig: StyleConfig): string => {
  const layoutClass = formData.layout === 'split' ? 'hero-split' : 
                     formData.layout === 'fullwidth' ? 'hero-fullwidth' : 'hero-centered';
  
  const parallaxAttr = formData.interactiveFeatures.parallax ? 'data-parallax="0.5"' : '';
  
  return `
    <header class="hero ${layoutClass}" data-animate="hero-entrance" ${parallaxAttr}>
        <div class="hero-background"></div>
        <div class="hero-content" data-animate="fade-up" data-delay="200">
            <h1 class="hero-title" data-animate="slide-up" data-delay="400">${formData.productName}</h1>
            <p class="hero-description" data-animate="fade-in" data-delay="600">${formData.productDescription}</p>
            <div class="hero-cta" data-animate="scale-in" data-delay="800">
                <a href="${formData.ctaLink}" class="cta-button primary pulse-button" target="_blank" data-micro-interaction="true">
                    <span class="button-text">${formData.callToAction}</span>
                    <span class="button-icon">→</span>
                </a>
            </div>
            ${formData.interactiveFeatures.counters ? generateCountersSection() : ''}
        </div>
        ${formData.image ? `<div class="hero-image" data-animate="slide-in-right" data-delay="400"><img src="${formData.image}" alt="${formData.productName}" loading="lazy" /></div>` : ''}
    </header>`;
};

const generateBenefitsSection = (formData: FormData, styleConfig: StyleConfig): string => {
  const validBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');
  
  if (validBenefits.length === 0) return '';
  
  const benefitIcons = ['✓', '🎯', '⚡', '🚀', '💎', '🏆'];
  
  return `
    <section class="benefits section-padding" data-animate="section-reveal">
        <div class="container">
            <h2 class="section-title" data-animate="fade-up">Por que escolher ${formData.productName}?</h2>
            <div class="benefits-grid staggered-animation">
                ${validBenefits.map((benefit, index) => `
                    <div class="benefit-item card-hover" data-animate="card-lift" data-delay="${index * 150}" data-micro-interaction="true">
                        <div class="benefit-icon floating-icon">
                            ${benefitIcons[index] || '✓'}
                        </div>
                        <p class="benefit-text">${benefit}</p>
                        <div class="benefit-decoration"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
};

const generateOptionalSections = (formData: FormData, styleConfig: StyleConfig): string => {
  let sectionsHtml = '';
  
  if (formData.optionalSections.testimonials && formData.testimonials) {
    sectionsHtml += generateTestimonialsSection(formData.testimonials, styleConfig, formData.interactiveFeatures.carousel);
  }
  
  if (formData.optionalSections.faq && formData.faq) {
    sectionsHtml += generateFAQSection(formData.faq, styleConfig);
  }
  
  if (formData.optionalSections.gallery && formData.gallery) {
    sectionsHtml += generateGallerySection(formData.gallery, styleConfig, formData.interactiveFeatures.lightbox);
  }
  
  return sectionsHtml;
};

const generateTestimonialsSection = (testimonials: Array<{ text: string; name: string; role: string }>, styleConfig: StyleConfig, useCarousel: boolean): string => {
  if (useCarousel) {
    return `
      <section class="testimonials section-padding" data-animate="section-reveal">
          <div class="container">
              <h2 class="section-title" data-animate="fade-up">O que nossos clientes dizem</h2>
              <div class="testimonials-carousel" data-carousel="true">
                  <div class="carousel-container">
                      <div class="carousel-track" id="testimonials-track">
                          ${testimonials.map((testimonial, index) => `
                              <div class="testimonial-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                                  <div class="testimonial-item featured">
                                      <div class="testimonial-content">
                                          <p class="testimonial-text">"${testimonial.text}"</p>
                                          <div class="testimonial-author">
                                              <div class="author-avatar">${testimonial.name.charAt(0)}</div>
                                              <div class="author-info">
                                                  <strong>${testimonial.name}</strong>
                                                  <span>${testimonial.role}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                      <button class="carousel-nav prev" onclick="moveCarousel('testimonials', -1)" aria-label="Anterior">‹</button>
                      <button class="carousel-nav next" onclick="moveCarousel('testimonials', 1)" aria-label="Próximo">›</button>
                  </div>
                  <div class="carousel-indicators">
                      ${testimonials.map((_, index) => `
                          <button class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide('testimonials', ${index})" aria-label="Slide ${index + 1}"></button>
                      `).join('')}
                  </div>
              </div>
          </div>
      </section>`;
  }
  
  return `
    <section class="testimonials section-padding" data-animate="section-reveal">
        <div class="container">
            <h2 class="section-title" data-animate="fade-up">O que nossos clientes dizem</h2>
            <div class="testimonials-grid staggered-animation">
                ${testimonials.map((testimonial, index) => `
                    <div class="testimonial-item card-hover" data-animate="fade-up" data-delay="${index * 150}" data-micro-interaction="true">
                        <div class="testimonial-content">
                            <p class="testimonial-text">"${testimonial.text}"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">${testimonial.name.charAt(0)}</div>
                                <div class="author-info">
                                    <strong>${testimonial.name}</strong>
                                    <span>${testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-decoration"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
};

const generateFAQSection = (faq: Array<{ question: string; answer: string }>, styleConfig: StyleConfig): string => {
  return `
    <section class="faq section-padding" data-animate="section-reveal">
        <div class="container">
            <h2 class="section-title" data-animate="fade-up">Perguntas Frequentes</h2>
            <div class="faq-container">
                ${faq.map((item, index) => `
                    <div class="faq-item accordion-item" data-animate="fade-up" data-delay="${index * 100}">
                        <button class="faq-question accordion-trigger" onclick="toggleFAQ(${index})" data-micro-interaction="true">
                            <span>${item.question}</span>
                            <span class="faq-icon accordion-icon">+</span>
                        </button>
                        <div class="faq-answer accordion-content" id="faq-${index}">
                            <div class="faq-answer-content">
                                <p>${item.answer}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
};

const generateGallerySection = (gallery: string[], styleConfig: StyleConfig, useLightbox: boolean): string => {
  return `
    <section class="gallery section-padding" data-animate="section-reveal">
        <div class="container">
            <h2 class="section-title" data-animate="fade-up">Galeria</h2>
            <div class="gallery-grid masonry-grid staggered-animation">
                ${gallery.map((image, index) => `
                    <div class="gallery-item" data-animate="scale-up" data-delay="${index * 100}">
                        <div class="gallery-image-container">
                            <img src="${image}" alt="Galeria ${index + 1}" loading="lazy" 
                                 ${useLightbox ? `onclick="openLightbox('${image}', ${index})"` : ''} 
                                 class="gallery-image ${useLightbox ? 'lightbox-trigger' : ''}" />
                            <div class="gallery-overlay">
                                <div class="gallery-overlay-content">
                                    ${useLightbox ? '<span class="overlay-icon">🔍</span>' : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
};

const generateCountersSection = (): string => {
  return `
    <div class="counters-section" data-animate="fade-up" data-delay="1000">
        <div class="counters-grid">
            <div class="counter-item" data-counter="1000" data-suffix="+">
                <span class="counter-number">0</span>
                <span class="counter-label">Clientes Satisfeitos</span>
            </div>
            <div class="counter-item" data-counter="99" data-suffix="%">
                <span class="counter-number">0</span>
                <span class="counter-label">Taxa de Sucesso</span>
            </div>
            <div class="counter-item" data-counter="24" data-suffix="/7">
                <span class="counter-number">0</span>
                <span class="counter-label">Suporte</span>
            </div>
        </div>
    </div>`;
};

const generateLightboxHTML = (): string => {
  return `
    <div id="lightbox" class="lightbox" onclick="closeLightbox()">
        <div class="lightbox-content" onclick="event.stopPropagation()">
            <button class="lightbox-close" onclick="closeLightbox()" aria-label="Fechar">&times;</button>
            <button class="lightbox-nav prev" onclick="lightboxPrev()" aria-label="Anterior">‹</button>
            <button class="lightbox-nav next" onclick="lightboxNext()" aria-label="Próximo">›</button>
            <img id="lightbox-image" src="" alt="" />
            <div class="lightbox-counter">
                <span id="lightbox-current">1</span> / <span id="lightbox-total">1</span>
            </div>
        </div>
    </div>`;
};

const generateCTASection = (formData: FormData, styleConfig: StyleConfig): string => {
  return `
    <section class="cta-section section-padding" data-animate="section-reveal" data-parallax="0.3">
        <div class="container">
            <div class="cta-content" data-animate="zoom-in">
                <h2 class="cta-title">Pronto para começar?</h2>
                <p class="cta-subtitle">Não perca mais tempo e comece sua jornada hoje mesmo</p>
                <a href="${formData.ctaLink}" class="cta-button featured pulse-button" target="_blank" data-micro-interaction="true">
                    <span class="button-text">${formData.callToAction}</span>
                    <span class="button-icon">🚀</span>
                </a>
                ${formData.contactInfo ? `<p class="contact-info" data-animate="fade-in" data-delay="400">Contato: ${formData.contactInfo}</p>` : ''}
            </div>
        </div>
    </section>`;
};

const generateFooterSection = (formData: FormData, styleConfig: StyleConfig): string => {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-main">
                    <h3 class="footer-title">${formData.productName}</h3>
                    <p class="footer-description">${formData.productDescription}</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Links Úteis</h4>
                        <ul>
                            <li><a href="#home">Início</a></li>
                            <li><a href="#about">Sobre</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Suporte</h4>
                        <ul>
                            <li><a href="#help">Ajuda</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#terms">Termos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${currentYear} ${formData.productName}. Todos os direitos reservados.</p>
                <p class="footer-credit">Criado com <a href="https://page.ai" target="_blank">Page.ai</a></p>
            </div>
        </div>
    </footer>`;
};

const getStyleConfig = (style: string, customColors?: any): StyleConfig => {
  const configs = {
    minimalista: {
      primary: customColors?.primary || '#000000',
      secondary: customColors?.secondary || '#ffffff',
      accent: customColors?.accent || '#666666',
      background: customColors?.background || '#ffffff',
      font: 'Inter, sans-serif',
      layout: 'centered' as const,
      gradient: 'linear-gradient(135deg, #000000, #333333)'
    },
    colorido: {
      primary: customColors?.primary || '#ff6b6b',
      secondary: customColors?.secondary || '#4ecdc4',
      accent: customColors?.accent || '#45b7d1',
      background: customColors?.background || '#f8f9fa',
      font: 'Poppins, sans-serif',
      layout: 'centered' as const,
      gradient: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)'
    },
    profissional: {
      primary: customColors?.primary || '#2c3e50',
      secondary: customColors?.secondary || '#3498db',
      accent: customColors?.accent || '#e74c3c',
      background: customColors?.background || '#ffffff',
      font: 'Playfair Display, serif',
      layout: 'split' as const,
      gradient: 'linear-gradient(135deg, #2c3e50, #3498db)'
    },
    divertido: {
      primary: customColors?.primary || '#e74c3c',
      secondary: customColors?.secondary || '#f39c12',
      accent: customColors?.accent || '#9b59b6',
      background: customColors?.background || '#ffeaa7',
      font: 'Poppins, sans-serif',
      layout: 'fullwidth' as const,
      gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)'
    }
  };

  return configs[style as keyof typeof configs] || configs.minimalista;
};

const generateAdvancedCSS = (config: StyleConfig, layout: string, animationLevel: string) => `
/* Advanced CSS with Enhanced Animations */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: ${config.primary};
    --secondary-color: ${config.secondary};
    --accent-color: ${config.accent};
    --background-color: ${config.background};
    --text-color: ${config.primary};
    --font-family: ${config.font};
    --border-radius: 16px;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 8px 25px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 15px 40px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 25px 60px rgba(0, 0, 0, 0.2);
    --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --animation-duration: ${animationLevel === 'subtle' ? '0.3s' : animationLevel === 'moderate' ? '0.6s' : '0.9s'};
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

/* Motion Preferences */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.7;
    scroll-behavior: smooth;
    overflow-x: hidden;
}

.page-container {
    min-height: 100vh;
    position: relative;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.section-padding {
    padding: 100px 0;
}

/* Enhanced Typography */
.section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 4rem;
    font-weight: 700;
    background: ${config.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${config.gradient};
    border-radius: 2px;
}

/* Hero Section Enhanced */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${config.gradient};
    opacity: 0.03;
    z-index: -1;
}

.hero-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.hero-centered {
    text-align: center;
    flex-direction: column;
}

.hero-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
}

.hero-fullwidth {
    background: ${config.gradient};
    color: white;
    text-align: center;
}

.hero-content {
    z-index: 2;
    position: relative;
}

.hero-title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    margin-bottom: 2rem;
    line-height: 1.1;
    background: ${config.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
}

.hero-fullwidth .hero-title {
    color: white;
    -webkit-text-fill-color: white;
}

.hero-description {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    margin-bottom: 3rem;
    opacity: 0.85;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 400;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-xl);
    transition: var(--transition-base);
}

.hero-image:hover img {
    transform: scale(1.02);
    box-shadow: var(--shadow-xl);
}

/* Enhanced Buttons */
.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: ${config.gradient};
    color: white;
    padding: 16px 32px;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: var(--transition-bounce);
    box-shadow: var(--shadow-md);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.cta-button:hover::before {
    left: 100%;
}

.cta-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: var(--shadow-xl);
}

.cta-button.featured {
    padding: 20px 40px;
    font-size: 1.3rem;
    border-radius: 50px;
}

.pulse-button {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(var(--primary-color), 0.7); }
    70% { box-shadow: 0 0 0 20px rgba(var(--primary-color), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--primary-color), 0); }
}

.button-icon {
    transition: var(--transition-base);
}

.cta-button:hover .button-icon {
    transform: translateX(4px);
}

/* Benefits Section Enhanced */
.benefits {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
    position: relative;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
}

.benefit-item {
    background: white;
    padding: 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    transition: var(--transition-base);
    position: relative;
    overflow: hidden;
}

.benefit-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${config.gradient};
    transform: scaleY(0);
    transition: var(--transition-base);
}

.benefit-item:hover::before {
    transform: scaleY(1);
}

.card-hover:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.benefit-icon {
    width: 60px;
    height: 60px;
    background: ${config.gradient};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
    transition: var(--transition-bounce);
}

.floating-icon {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.benefit-text {
    font-size: 1.2rem;
    line-height: 1.6;
    font-weight: 500;
}

/* Testimonials Enhanced */
.testimonials {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2.5rem;
}

.testimonial-item {
    background: white;
    padding: 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.testimonial-item.featured {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
}

.testimonial-content {
    position: relative;
    z-index: 2;
}

.testimonial-text {
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 2rem;
    line-height: 1.7;
    color: #555;
}

.testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${config.gradient};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
}

.author-info strong {
    display: block;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
}

.author-info span {
    color: #666;
    font-size: 0.9rem;
}

/* Carousel Styles */
.testimonials-carousel {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.carousel-container {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
}

.carousel-track {
    display: flex;
    transition: transform 0.5s ease;
}

.testimonial-slide {
    min-width: 100%;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.5s ease;
}

.testimonial-slide.active {
    opacity: 1;
    transform: translateX(0);
}

.carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition-base);
    z-index: 3;
}

.carousel-nav:hover {
    background: white;
    box-shadow: var(--shadow-md);
}

.carousel-nav.prev {
    left: 20px;
}

.carousel-nav.next {
    right: 20px;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: #ddd;
    cursor: pointer;
    transition: var(--transition-base);
}

.indicator.active {
    background: var(--primary-color);
}

/* FAQ Enhanced */
.faq {
    background: rgba(255, 255, 255, 0.3);
}

.faq-container {
    max-width: 900px;
    margin: 0 auto;
}

.faq-item {
    background: white;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-base);
}

.faq-item:hover {
    box-shadow: var(--shadow-md);
}

.faq-question {
    width: 100%;
    padding: 2rem;
    background: none;
    border: none;
    text-align: left;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-base);
}

.faq-question:hover {
    background: rgba(0, 0, 0, 0.02);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
}

.faq-answer.active {
    max-height: 300px;
    padding: 0 2rem 2rem;
}

.faq-answer-content p {
    line-height: 1.7;
    color: #666;
    font-size: 1.1rem;
}

.faq-icon {
    font-size: 1.5rem;
    transition: var(--transition-bounce);
    color: var(--primary-color);
}

.faq-question.active .faq-icon {
    transform: rotate(45deg);
}

/* Gallery Enhanced */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.gallery-item {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    aspect-ratio: 1;
    cursor: pointer;
    transition: var(--transition-base);
}

.gallery-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-base);
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
}

.overlay-icon {
    font-size: 2rem;
    color: white;
}

/* Lightbox */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.lightbox.active {
    display: flex;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-xl);
}

.lightbox-close,
.lightbox-nav {
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    color: #333;
    font-size: 2rem;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-base);
}

.lightbox-close {
    top: -60px;
    right: 0;
}

.lightbox-nav.prev {
    left: -80px;
}

.lightbox-nav.next {
    right: -80px;
}

.lightbox-close:hover,
.lightbox-nav:hover {
    background: white;
    transform: scale(1.1);
}

.lightbox-counter {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1.1rem;
}

/* Counters */
.counters-section {
    margin-top: 3rem;
}

.counters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
}

.counter-item {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    backdrop-filter: blur(10px);
}

.counter-number {
    display: block;
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
}

.counter-label {
    font-size: 1rem;
    opacity: 0.8;
}

/* CTA Section Enhanced */
.cta-section {
    background: ${config.gradient};
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.cta-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.cta-content {
    position: relative;
    z-index: 2;
}

.cta-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1.5rem;
    color: white;
    font-weight: 700;
}

.cta-subtitle {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.contact-info {
    margin-top: 2rem;
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Footer Enhanced */
.footer {
    background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
    color: white;
    padding: 4rem 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-main h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
}

.footer-description {
    opacity: 0.8;
    line-height: 1.6;
}

.footer-column h4 {
    margin-bottom: 1rem;
    color: var(--accent-color);
}

.footer-column ul {
    list-style: none;
}

.footer-column ul li {
    margin-bottom: 0.5rem;
}

.footer-column a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: var(--transition-base);
}

.footer-column a:hover {
    opacity: 1;
    color: var(--accent-color);
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
    text-align: center;
    opacity: 0.7;
}

.footer-credit a {
    color: var(--accent-color);
    text-decoration: none;
}

/* Advanced Animations */
[data-animate] {
    opacity: 0;
    transform: translateY(30px);
    transition: all var(--animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
}

[data-animate].animate {
    opacity: 1;
    transform: translateY(0);
}

[data-animate="fade-up"].animate {
    transform: translateY(0);
}

[data-animate="slide-up"] {
    transform: translateY(50px);
}

[data-animate="slide-up"].animate {
    transform: translateY(0);
}

[data-animate="fade-in"] {
    transform: none;
}

[data-animate="fade-in"].animate {
    transform: none;
}

[data-animate="scale-in"] {
    transform: scale(0.8);
}

[data-animate="scale-in"].animate {
    transform: scale(1);
}

[data-animate="slide-in-right"] {
    transform: translateX(50px);
}

[data-animate="slide-in-right"].animate {
    transform: translateX(0);
}

[data-animate="zoom-in"] {
    transform: scale(0.9);
}

[data-animate="zoom-in"].animate {
    transform: scale(1);
}

[data-animate="card-lift"] {
    transform: translateY(20px);
}

[data-animate="card-lift"].animate {
    transform: translateY(0);
}

[data-animate="hero-entrance"] {
    transform: translateY(40px);
}

[data-animate="hero-entrance"].animate {
    transform: translateY(0);
}

[data-animate="section-reveal"] {
    transform: translateY(60px);
}

[data-animate="section-reveal"].animate {
    transform: translateY(0);
}

/* Staggered Animations */
.staggered-animation > * {
    opacity: 0;
    transform: translateY(30px);
    transition: all var(--animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
}

.staggered-animation.animate > * {
    opacity: 1;
    transform: translateY(0);
}

/* Micro Interactions */
[data-micro-interaction="true"] {
    transition: var(--transition-base);
}

[data-micro-interaction="true"]:hover {
    transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-split {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .benefits-grid,
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .carousel-nav {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
    
    .carousel-nav.prev {
        left: 10px;
    }
    
    .carousel-nav.next {
        right: 10px;
    }
    
    .lightbox-nav {
        display: none;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 16px;
    }
    
    .hero {
        padding: 80px 0;
    }
    
    .section-padding {
        padding: 80px 0;
    }
    
    .benefit-item,
    .testimonial-item {
        padding: 2rem;
    }
    
    .counters-grid {
        grid-template-columns: 1fr;
    }
}
