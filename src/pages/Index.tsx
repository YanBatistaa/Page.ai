
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Zap, Globe, Download, Share2, Sparkles, Users, TrendingUp } from "lucide-react";
import LandingForm from "@/components/LandingForm";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import PagePreview from "@/components/PagePreview";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const [generatedPage, setGeneratedPage] = useState(null);

  const handleStartClick = () => {
    setShowForm(true);
    setShowPreview(false);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleFormComplete = (data: any, generated: any) => {
    console.log('Form completed with enhanced data:', data);
    setFormData(data);
    setGeneratedPage(generated);
    setShowPreview(true);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
    setShowForm(true);
  };

  // Se estiver na tela de preview, mostrar apenas ela
  if (showPreview && generatedPage && formData) {
    return (
      <PagePreview
        generatedPage={generatedPage}
        formData={formData}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerador de Landing Pages com IA Avançada
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
              Page.ai
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Crie <span className="font-semibold text-blue-600">landing pages profissionais</span> com animações, seções personalizadas e JavaScript interativo.<br />
              Sem programar, sem designer. Apenas algumas perguntas inteligentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={handleStartClick}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora - Grátis
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-2" />
                Ver Exemplos
              </Button>
            </div>

            {/* Enhanced stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2 min</div>
                <div className="text-sm text-gray-600">Tempo médio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Seções disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">JS</div>
                <div className="text-sm text-gray-600">Animações incluídas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Responsivo</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Enhanced How it works section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como Funciona - Agora Ainda Melhor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agora com seções opcionais, animações JavaScript, upload de imagens e layouts personalizáveis para páginas ainda mais profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Configure Sua Página",
                description: "Escolha seções opcionais, animações e layouts personalizados",
                icon: <Users className="w-8 h-8" />,
                color: "blue",
                features: ["Depoimentos", "FAQ", "Galeria", "Animações JS"]
              },
              {
                step: "02", 
                title: "IA Gera com Estilo",
                description: "Nossa IA cria HTML, CSS e JavaScript profissionais",
                icon: <Sparkles className="w-8 h-8" />,
                color: "purple",
                features: ["CSS Avançado", "JS Interativo", "Responsivo", "SEO Ready"]
              },
              {
                step: "03",
                title: "Adicione Suas Imagens",
                description: "Upload de imagens e regeneração instantânea da página",
                icon: <Globe className="w-8 h-8" />,
                color: "indigo",
                features: ["Upload Fácil", "Preview Imediato", "Otimização", "Multi-formato"]
              },
              {
                step: "04",
                title: "Publique Profissionalmente",
                description: "Baixe todos os arquivos ou publique com um clique",
                icon: <Download className="w-8 h-8" />,
                color: "emerald",
                features: ["HTML + CSS + JS", "Links Públicos", "Domínio Custom", "Analytics"]
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color}-100 text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className={`text-sm font-bold text-${item.color}-600 mb-2`}>
                    PASSO {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="space-y-1">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Form Section */}
      {showForm && (
        <section id="form-section" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Vamos Criar Sua Landing Page Profissional
              </h2>
              <p className="text-xl text-gray-600">
                Agora com mais opções e funcionalidades avançadas
              </p>
            </div>
            <LandingForm onComplete={handleFormComplete} />
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <PricingSection />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Criar Landing Pages Profissionais?
          </h2>
          <p className="text-xl mb-4 opacity-90 max-w-3xl mx-auto">
            Agora com JavaScript interativo, seções personalizáveis, upload de imagens e muito mais
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">✨ Animações JavaScript</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">📱 100% Responsivo</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🖼️ Upload de Imagens</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">⚡ Super Rápido</span>
          </div>
          <Button 
            onClick={handleStartClick}
            size="lg" 
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Começar Gratuitamente
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Page.ai</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                A forma mais rápida e inteligente de criar landing pages profissionais que convertem visitantes em clientes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Gerador com IA</li>
                <li>Templates Profissionais</li>
                <li>Analytics Integrado</li>
                <li>Domínio Personalizado</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Tutoriais</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Page.ai. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
