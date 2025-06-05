
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para testar o Page.ai",
      features: [
        "1 landing page por mês",
        "Todos os 4 estilos disponíveis",
        "Download do código HTML/CSS",
        "Link temporário (7 dias)",
        "Suporte por email"
      ],
      buttonText: "Começar Grátis",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      paymentUrl: null
    },
    {
      name: "Pro",
      price: "R$ 29",
      period: "/mês",
      yearlyPrice: "R$ 290/ano",
      description: "Para quem quer crescer sem limites",
      features: [
        "Landing pages ilimitadas",
        "Domínio personalizado",
        "Analytics avançado",
        "A/B Testing",
        "Links permanentes",
        "Suporte prioritário",
        "Backup automático",
        "Integração com ferramentas"
      ],
      buttonText: "Começar Pro",
      buttonVariant: "default" as const,
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      paymentUrls: {
        monthly: "https://invoice.infinitepay.io/plans/yanbatista-dev/5ecef2DJDn",
        yearly: "https://invoice.infinitepay.io/plans/yanbatista-dev/cxPMpuXbn"
      }
    }
  ];

  const handlePayment = (paymentUrl: string) => {
    window.open(paymentUrl, '_blank');
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Preços Simples e Transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece grátis e evolua conforme sua necessidade. Sem pegadinhas, sem taxas escondidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
              plan.popular 
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                : 'border border-gray-200 hover:border-blue-300'
            }`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 inline mr-1" />
                  MAIS POPULAR
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto ${
                  plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {plan.name}
                </CardTitle>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                  {plan.yearlyPrice && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {plan.yearlyPrice} - economize 17%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mt-4">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.paymentUrls ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handlePayment(plan.paymentUrls.monthly)}
                      variant={plan.buttonVariant}
                      className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                          : 'border-2 border-blue-200 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Pagar Mensalmente - R$ 29
                    </Button>
                    <Button 
                      onClick={() => handlePayment(plan.paymentUrls.yearly)}
                      variant="outline"
                      className="w-full py-3 text-lg font-semibold border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300"
                    >
                      Pagar Anualmente - R$ 290
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant={plan.buttonVariant}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                        : 'border-2 border-blue-200 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Tem dúvidas sobre qual plano escolher?
          </p>
          <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
