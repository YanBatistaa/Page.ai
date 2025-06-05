
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
    setFormData(data);
    setGeneratedPage(generated);
    setShowPreview(true);
    setShowForm(false);
    console.log('Form completed with data:', data);
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
              Gerador de Landing Pages com IA
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
              Page.ai
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Crie <span className="font-semibold text-blue-600">landing pages profissionais</span> em minutos.<br />
              Sem programar, sem designer. Apenas 7 perguntas rápidas.
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

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2 min</div>
                <div className="text-sm text-gray-600">Tempo médio de criação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-sm text-gray-600">Páginas criadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">4.9★</div>
                <div className="text-sm text-gray-600">Avaliação dos usuários</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* How it works section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em apenas 4 passos simples, sua landing page estará pronta para converter visitantes em clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Responda 7 Perguntas",
                description: "Conte-nos sobre seu produto, benefícios e público-alvo",
                icon: <Users className="w-8 h-8" />,
                color: "blue"
              },
              {
                step: "02", 
                title: "IA Gera sua Página",
                description: "Nossa IA cria copy persuasiva e design profissional",
                icon: <Sparkles className="w-8 h-8" />,
                color: "purple"
              },
              {
                step: "03",
                title: "Preview em Tempo Real",
                description: "Visualize e aprove sua landing page antes de publicar",
                icon: <Globe className="w-8 h-8" />,
                color: "indigo"
              },
              {
                step: "04",
                title: "Baixe ou Compartilhe",
                description: "Receba o código ou um link para usar imediatamente",
                icon: <Download className="w-8 h-8" />,
                color: "emerald"
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
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
                Vamos Criar Sua Landing Page
              </h2>
              <p className="text-xl text-gray-600">
                Responda essas 7 perguntas rápidas e veja a mágica acontecer
              </p>
            </div>
            <LandingForm onComplete={handleFormComplete} />
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Criar sua Primeira Landing Page?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já usam o Page.ai para gerar páginas que convertem
          </p>
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
