import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateLandingPage } from "@/utils/pageGenerator";

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

interface LandingFormProps {
  onComplete: (data: FormData, generatedPage: any) => void;
}

const LandingForm = ({ onComplete }: LandingFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productDescription: '',
    benefits: ['', '', ''],
    callToAction: '',
    ctaLink: '',
    contactInfo: '',
    image: '',
    style: ''
  });

  const totalSteps = 7;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    updateFormData('benefits', newBenefits);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    
    toast({
      title: "Gerando Landing Page... ✨",
      description: "Nossa IA está criando sua página personalizada. Aguarde alguns segundos...",
    });

    // Simular processamento da IA
    setTimeout(() => {
      const generatedPage = generateLandingPage(formData);
      
      toast({
        title: "Landing Page Criada! 🎉",
        description: "Sua página está pronta! Visualize o resultado e baixe os arquivos.",
      });

      onComplete(formData, generatedPage);
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.productName.trim() !== '';
      case 1: return formData.productDescription.trim() !== '';
      case 2: return formData.benefits.some(benefit => benefit.trim() !== '');
      case 3: return formData.callToAction.trim() !== '';
      case 4: return formData.ctaLink.trim() !== '';
      case 5: return true; // Optional field
      case 6: return formData.style !== '';
      default: return false;
    }
  };

  const steps = [
    {
      title: "Nome do Produto",
      description: "Como se chama seu produto ou serviço?",
      content: (
        <div className="space-y-4">
          <Label htmlFor="productName" className="text-lg font-medium">
            Qual é o nome do seu produto/serviço?
          </Label>
          <Input
            id="productName"
            placeholder="Ex: MeuApp, Consultoria Digital, Curso Online..."
            value={formData.productName}
            onChange={(e) => updateFormData('productName', e.target.value)}
            className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
          />
        </div>
      )
    },
    {
      title: "Descrição",
      description: "O que seu produto faz de especial?",
      content: (
        <div className="space-y-4">
          <Label htmlFor="productDescription" className="text-lg font-medium">
            Descreva em uma frase o que ele faz:
          </Label>
          <Textarea
            id="productDescription"
            placeholder="Ex: Automatiza vendas no WhatsApp para pequenas empresas..."
            value={formData.productDescription}
            onChange={(e) => updateFormData('productDescription', e.target.value)}
            className="text-lg p-4 border-2 focus:border-blue-500 transition-colors min-h-[120px]"
          />
        </div>
      )
    },
    {
      title: "Benefícios",
      description: "Quais os principais benefícios?",
      content: (
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Quais são os principais benefícios? (máximo 3)
          </Label>
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="relative">
              <Input
                placeholder={`Benefício ${index + 1}${index === 0 ? ' (obrigatório)' : ' (opcional)'}`}
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
              />
              {benefit && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Call to Action",
      description: "Qual ação você quer que os visitantes tomem?",
      content: (
        <div className="space-y-4">
          <Label htmlFor="callToAction" className="text-lg font-medium">
            Qual a sua chamada para ação?
          </Label>
          <Input
            id="callToAction"
            placeholder="Ex: Comprar Agora, Assinar Grátis, Solicitar Orçamento..."
            value={formData.callToAction}
            onChange={(e) => updateFormData('callToAction', e.target.value)}
            className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
          />
        </div>
      )
    },
    {
      title: "Link de Destino",
      description: "Para onde o botão deve levar?",
      content: (
        <div className="space-y-4">
          <Label htmlFor="ctaLink" className="text-lg font-medium">
            URL de destino da ação:
          </Label>
          <Input
            id="ctaLink"
            type="url"
            placeholder="https://..."
            value={formData.ctaLink}
            onChange={(e) => updateFormData('ctaLink', e.target.value)}
            className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
          />
        </div>
      )
    },
    {
      title: "Contato",
      description: "Como as pessoas podem te contatar?",
      content: (
        <div className="space-y-4">
          <Label htmlFor="contactInfo" className="text-lg font-medium">
            Deseja incluir seu WhatsApp ou e-mail de contato? (opcional)
          </Label>
          <Input
            id="contactInfo"
            placeholder="Ex: (11) 99999-9999 ou contato@email.com"
            value={formData.contactInfo}
            onChange={(e) => updateFormData('contactInfo', e.target.value)}
            className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
          />
        </div>
      )
    },
    {
      title: "Estilo",
      description: "Qual visual combina com sua marca?",
      content: (
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Escolha o estilo da página:
          </Label>
          <Select onValueChange={(value) => updateFormData('style', value)} value={formData.style}>
            <SelectTrigger className="text-lg p-4 border-2 focus:border-blue-500 transition-colors">
              <SelectValue placeholder="Selecione um estilo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimalista">🎯 Minimalista - Limpo e direto</SelectItem>
              <SelectItem value="colorido">🌈 Colorido - Vibrante e alegre</SelectItem>
              <SelectItem value="profissional">💼 Profissional - Sério e confiável</SelectItem>
              <SelectItem value="divertido">🎉 Divertido - Descontraído e criativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Passo {currentStep + 1} de {totalSteps}
            </Badge>
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <Progress value={progress} className="w-full h-2 mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-800">
            {steps[currentStep].title}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {steps[currentStep].description}
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="min-h-[200px]">
            {steps[currentStep].content}
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            {currentStep === totalSteps - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-white font-semibold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Landing Page
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingForm;
