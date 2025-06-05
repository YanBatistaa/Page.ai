
interface FormData {
  productName: string;
  productDescription: string;
  benefits: string[];
  callToAction: string;
  ctaLink: string;
  contactInfo: string;
  image: string;
  style: string;
}

interface GeneratedPage {
  html: string;
  css: string;
  preview: string;
}

export const generateLandingPage = (formData: FormData): GeneratedPage => {
  const { productName, productDescription, benefits, callToAction, ctaLink, contactInfo, style } = formData;

  // Filtrar benefícios não vazios
  const validBenefits = benefits.filter(benefit => benefit.trim() !== '');

  // Estilos baseados na seleção
  const styleConfig = getStyleConfig(style);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} - Landing Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header class="hero">
            <h1 class="hero-title">${productName}</h1>
            <p class="hero-description">${productDescription}</p>
        </header>

        <section class="benefits">
            <h2 class="section-title">Por que escolher ${productName}?</h2>
            <div class="benefits-grid">
                ${validBenefits.map((benefit, index) => `
                    <div class="benefit-item">
                        <div class="benefit-icon">✓</div>
                        <p class="benefit-text">${benefit}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="cta-section">
            <h2 class="cta-title">Pronto para começar?</h2>
            <a href="${ctaLink}" class="cta-button" target="_blank">
                ${callToAction}
            </a>
            ${contactInfo ? `<p class="contact-info">Contato: ${contactInfo}</p>` : ''}
        </section>
    </div>
</body>
</html>`;

  const css = generateCSS(styleConfig);

  return {
    html,
    css,
    preview: html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  };
};

const getStyleConfig = (style: string) => {
  const configs = {
    minimalista: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#666666',
      background: '#ffffff',
      font: 'Arial, sans-serif'
    },
    colorido: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#45b7d1',
      background: '#f8f9fa',
      font: 'Arial, sans-serif'
    },
    profissional: {
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#e74c3c',
      background: '#ffffff',
      font: 'Georgia, serif'
    },
    divertido: {
      primary: '#e74c3c',
      secondary: '#f39c12',
      accent: '#9b59b6',
      background: '#ffeaa7',
      font: 'Comic Sans MS, cursive'
    }
  };

  return configs[style as keyof typeof configs] || configs.minimalista;
};

const generateCSS = (config: any) => `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: ${config.font};
    background-color: ${config.background};
    color: ${config.primary};
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero {
    text-align: center;
    padding: 80px 0;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    color: ${config.primary};
    margin-bottom: 1rem;
}

.hero-description {
    font-size: 1.2rem;
    color: ${config.accent};
    max-width: 600px;
    margin: 0 auto;
}

.benefits {
    padding: 60px 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    color: ${config.primary};
    margin-bottom: 3rem;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
    width: 24px;
    height: 24px;
    background: ${config.secondary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
}

.benefit-text {
    font-size: 1.1rem;
    color: ${config.primary};
}

.cta-section {
    text-align: center;
    padding: 80px 0;
    background: linear-gradient(135deg, ${config.primary}, ${config.secondary});
    color: white;
}

.cta-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.cta-button {
    display: inline-block;
    background: ${config.accent};
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.contact-info {
    margin-top: 2rem;
    font-size: 1.1rem;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .benefits-grid {
        grid-template-columns: 1fr;
    }
}
`;
