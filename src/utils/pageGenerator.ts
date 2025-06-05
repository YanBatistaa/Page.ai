
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
  
  const css = generateCSS(styleConfig, formData.layout);
  const js = formData.animations ? generateJavaScript() : '';
  
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.productName} - Landing Page</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        ${heroSection}
        ${benefitsSection}
        ${optionalSectionsHtml}
        ${ctaSection}
        ${footerSection}
    </div>
    ${js ? `<script>${js}</script>` : ''}
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
  
  return `
    <header class="hero ${layoutClass}" data-animate="fade-up">
        <div class="hero-content">
            <h1 class="hero-title">${formData.productName}</h1>
            <p class="hero-description">${formData.productDescription}</p>
            <div class="hero-cta">
                <a href="${formData.ctaLink}" class="cta-button primary" target="_blank">
                    ${formData.callToAction}
                </a>
            </div>
        </div>
        ${formData.image ? `<div class="hero-image"><img src="${formData.image}" alt="${formData.productName}" /></div>` : ''}
    </header>`;
};

const generateBenefitsSection = (formData: FormData, styleConfig: StyleConfig): string => {
  const validBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');
  
  if (validBenefits.length === 0) return '';
  
  const benefitIcons = ['✓', '🎯', '⚡', '🚀', '💎', '🏆'];
  
  return `
    <section class="benefits" data-animate="fade-up">
        <h2 class="section-title">Por que escolher ${formData.productName}?</h2>
        <div class="benefits-grid">
            ${validBenefits.map((benefit, index) => `
                <div class="benefit-item" data-animate="fade-up" data-delay="${index * 100}">
                    <div class="benefit-icon">
                        ${benefitIcons[index] || '✓'}
                    </div>
                    <p class="benefit-text">${benefit}</p>
                </div>
            `).join('')}
        </div>
    </section>`;
};

const generateOptionalSections = (formData: FormData, styleConfig: StyleConfig): string => {
  let sectionsHtml = '';
  
  if (formData.optionalSections.testimonials && formData.testimonials) {
    sectionsHtml += generateTestimonialsSection(formData.testimonials, styleConfig);
  }
  
  if (formData.optionalSections.faq && formData.faq) {
    sectionsHtml += generateFAQSection(formData.faq, styleConfig);
  }
  
  if (formData.optionalSections.gallery && formData.gallery) {
    sectionsHtml += generateGallerySection(formData.gallery, styleConfig);
  }
  
  return sectionsHtml;
};

const generateTestimonialsSection = (testimonials: Array<{ text: string; name: string; role: string }>, styleConfig: StyleConfig): string => {
  return `
    <section class="testimonials" data-animate="fade-up">
        <h2 class="section-title">O que nossos clientes dizem</h2>
        <div class="testimonials-grid">
            ${testimonials.map((testimonial, index) => `
                <div class="testimonial-item" data-animate="fade-up" data-delay="${index * 150}">
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <strong>${testimonial.name}</strong>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>`;
};

const generateFAQSection = (faq: Array<{ question: string; answer: string }>, styleConfig: StyleConfig): string => {
  return `
    <section class="faq" data-animate="fade-up">
        <h2 class="section-title">Perguntas Frequentes</h2>
        <div class="faq-container">
            ${faq.map((item, index) => `
                <div class="faq-item" data-animate="fade-up" data-delay="${index * 100}">
                    <button class="faq-question" onclick="toggleFAQ(${index})">
                        ${item.question}
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer" id="faq-${index}">
                        <p>${item.answer}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>`;
};

const generateGallerySection = (gallery: string[], styleConfig: StyleConfig): string => {
  return `
    <section class="gallery" data-animate="fade-up">
        <h2 class="section-title">Galeria</h2>
        <div class="gallery-grid">
            ${gallery.map((image, index) => `
                <div class="gallery-item" data-animate="scale-up" data-delay="${index * 100}">
                    <img src="${image}" alt="Galeria ${index + 1}" onclick="openModal('${image}')" />
                </div>
            `).join('')}
        </div>
    </section>`;
};

const generateCTASection = (formData: FormData, styleConfig: StyleConfig): string => {
  return `
    <section class="cta-section" data-animate="fade-up">
        <h2 class="cta-title">Pronto para começar?</h2>
        <a href="${formData.ctaLink}" class="cta-button" target="_blank">
            ${formData.callToAction}
        </a>
        ${formData.contactInfo ? `<p class="contact-info">Contato: ${formData.contactInfo}</p>` : ''}
    </section>`;
};

const generateFooterSection = (formData: FormData, styleConfig: StyleConfig): string => {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; ${currentYear} ${formData.productName}. Todos os direitos reservados.</p>
            <p class="footer-credit">Criado com <a href="https://page.ai" target="_blank">Page.ai</a></p>
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
      font: 'Inter, sans-serif',
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
      font: 'Inter, sans-serif',
      layout: 'fullwidth' as const,
      gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)'
    }
  };

  return configs[style as keyof typeof configs] || configs.minimalista;
};

const generateCSS = (config: StyleConfig, layout: string) => `
/* Reset e Base */
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
    --border-radius: 12px;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    scroll-behavior: smooth;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${config.gradient};
    opacity: 0.05;
    z-index: -1;
}

.hero-centered {
    text-align: center;
    flex-direction: column;
}

.hero-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-fullwidth {
    background: ${config.gradient};
    color: white;
    text-align: center;
}

.hero-content {
    z-index: 2;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    background: ${config.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-fullwidth .hero-title {
    color: white;
    -webkit-text-fill-color: white;
}

.hero-description {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

/* Buttons */
.cta-button {
    display: inline-block;
    background: ${config.gradient};
    color: white;
    padding: 1rem 2.5rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: var(--transition);
    box-shadow: var(--shadow);
    border: none;
    cursor: pointer;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

/* Sections */
.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
}

.benefits {
    padding: 80px 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.benefit-item {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: var(--transition);
}

.benefit-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
    width: 48px;
    height: 48px;
    background: ${config.gradient};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.benefit-text {
    font-size: 1.1rem;
    line-height: 1.6;
}

/* Testimonials */
.testimonials {
    padding: 80px 0;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.testimonial-item {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    text-align: center;
}

.testimonial-text {
    font-size: 1.1rem;
    font-style: italic;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.testimonial-author strong {
    display: block;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
}

/* FAQ */
.faq {
    padding: 80px 0;
    background: rgba(255, 255, 255, 0.5);
}

.faq-container {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: white;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow);
}

.faq-question {
    width: 100%;
    padding: 1.5rem;
    background: none;
    border: none;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
}

.faq-question:hover {
    background: rgba(0, 0, 0, 0.02);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.faq-answer.active {
    max-height: 200px;
}

.faq-answer p {
    padding: 0 1.5rem 1.5rem;
    line-height: 1.6;
}

.faq-icon {
    font-size: 1.5rem;
    transition: var(--transition);
}

.faq-question.active .faq-icon {
    transform: rotate(45deg);
}

/* Gallery */
.gallery {
    padding: 80px 0;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.gallery-item {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
}

.gallery-item:hover {
    transform: scale(1.05);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

/* CTA Section */
.cta-section {
    text-align: center;
    padding: 80px 0;
    background: ${config.gradient};
    color: white;
}

.cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 2rem;
    color: white;
}

.contact-info {
    margin-top: 2rem;
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Footer */
.footer {
    background: var(--primary-color);
    color: white;
    text-align: center;
    padding: 2rem 0;
}

.footer-content p {
    margin-bottom: 0.5rem;
}

.footer-credit a {
    color: var(--accent-color);
    text-decoration: none;
}

/* Animations */
[data-animate] {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-animate].animate {
    opacity: 1;
    transform: translateY(0);
}

[data-animate="scale-up"] {
    transform: scale(0.9);
}

[data-animate="scale-up"].animate {
    transform: scale(1);
}

/* Responsive */
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
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .hero {
        padding: 60px 0;
    }
    
    .benefits,
    .testimonials,
    .faq,
    .gallery,
    .cta-section {
        padding: 60px 0;
    }
}
`;

const generateJavaScript = () => `
// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
});

// FAQ Toggle
function toggleFAQ(index) {
    const answer = document.getElementById(\`faq-\${index}\`);
    const question = answer.previousElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.faq-question').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        answer.classList.add('active');
        question.classList.add('active');
    }
}

// Gallery Modal
function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = \`
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <img src="\${imageSrc}" alt="Gallery Image" />
        </div>
    \`;
    
    const modalStyles = \`
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 12px;
        }
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1001;
        }
    \`;
    
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = modalStyles;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Form validation (if forms are present)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});
`;
