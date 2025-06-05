
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, Globe, Download, Share2, BarChart3, Shield, HeartHandshake } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "IA Avançada",
      description: "Nossa inteligência artificial cria copy persuasiva e layouts otimizados para conversão",
      color: "yellow"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "4 Estilos Únicos",
      description: "Minimalista, colorido, profissional ou divertido - escolha o que combina com sua marca",
      color: "pink"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Preview em Tempo Real",
      description: "Veja sua landing page sendo criada ao vivo, sem esperas ou surpresas",
      color: "blue"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Código Limpo",
      description: "Receba HTML e CSS otimizados, prontos para hospedar em qualquer servidor",
      color: "green"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Link Instantâneo",
      description: "Compartilhe sua página com um link temporário antes mesmo de hospedar",
      color: "purple"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Integrado",
      description: "Acompanhe visitantes, conversões e performance (Plano Pro)",
      color: "indigo"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguro e Rápido",
      description: "Seus dados são protegidos e suas páginas carregam em menos de 2 segundos",
      color: "emerald"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Suporte Brasileiro",
      description: "Atendimento em português com equipe especializada em conversão",
      color: "rose"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Recursos que Fazem a Diferença
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todas as ferramentas que você precisa para criar landing pages que realmente convertem visitantes em clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${feature.color}-100 text-${feature.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
