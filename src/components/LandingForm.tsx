
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Plus, Trash2 } from "lucide-react";
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
  layout: string;
  animations: boolean;
  optionalSections: {
    testimonials: boolean;
    faq: boolean;
    gallery: boolean;
    pricing: boolean;
  };
  testimonials: Array<{ text: string; name: string; role: string }>;
  faq: Array<{ question: string; answer: string }>;
  gallery: string[];
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
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
    style: '',
    layout: 'centered',
    animations: true,
    optionalSections: {
      testimonials: false,
      faq: false,
      gallery: false,
      pricing: false
    },
    testimonials: [{ text: '', name: '', role: '' }],
    faq: [{ question: '', answer: '' }],
    gallery: [''],
    customColors: {
      primary: '',
      secondary: '',
      accent: '',
      background: ''
    }
  });

  const totalSteps = 9;
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

  const addTestimonial = () => {
    updateFormData('testimonials', [...formData.testimonials, { text: '', name: '', role: '' }]);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    updateFormData('testimonials', newTestimonials);
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateFormData('testimonials', newTestimonials);
  };

  const addFAQ = () => {
    updateFormData('faq', [...formData.faq, { question: '', answer: '' }]);
  };

  const removeFAQ = (index: number) => {
    const newFAQ = formData.faq.filter((_, i) => i !== index);
    updateFormData('faq', newFAQ);
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const newFAQ = [...formData.faq];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    updateFormData('faq', newFAQ);
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
      case 5: return true; // Optional sections
      case 6: return true; // Testimonials (optional)
      case 7: return true; // FAQ (optional)
      case 8: return formData.style !== '';
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
          
          <div className="mt-6 space-y-4">
            <Label className="text-lg font-medium">Informações de contato (opcional):</Label>
            <Input
              placeholder="Ex: (11) 99999-9999 ou contato@email.com"
              value={formData.contactInfo}
              onChange={(e) => updateFormData('contactInfo', e.target.value)}
              className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      )
    },
    {
      title: "Seções Opcionais",
      description: "Quais seções extras você quer incluir?",
      content: (
        <div className="space-y-6">
          <Label className="text-lg font-medium">
            Escolha as seções que deseja incluir:
          </Label>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox 
                checked={formData.optionalSections.testimonials}
                onCheckedChange={(checked) => 
                  updateFormData('optionalSections', {
                    ...formData.optionalSections, 
                    testimonials: checked
                  })
                }
              />
              <div>
                <Label className="font-medium">Depoimentos</Label>
                <p className="text-sm text-gray-600">Mostre o que seus clientes dizem</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox 
                checked={formData.optionalSections.faq}
                onCheckedChange={(checked) => 
                  updateFormData('optionalSections', {
                    ...formData.optionalSections, 
                    faq: checked
                  })
                }
              />
              <div>
                <Label className="font-medium">Perguntas Frequentes</Label>
                <p className="text-sm text-gray-600">Esclareça dúvidas comuns</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox 
                checked={formData.optionalSections.gallery}
                onCheckedChange={(checked) => 
                  updateFormData('optionalSections', {
                    ...formData.optionalSections, 
                    gallery: checked
                  })
                }
              />
              <div>
                <Label className="font-medium">Galeria de Imagens</Label>
                <p className="text-sm text-gray-600">Exiba fotos dos seus produtos</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Ativar animações</Label>
              <Switch 
                checked={formData.animations}
                onCheckedChange={(checked) => updateFormData('animations', checked)}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Adiciona efeitos visuais à página</p>
          </div>
        </div>
      )
    },
    {
      title: "Depoimentos",
      description: "Configure os depoimentos dos clientes",
      content: formData.optionalSections.testimonials ? (
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Adicione depoimentos dos seus clientes:
          </Label>
          
          {formData.testimonials.map((testimonial, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Depoimento {index + 1}</Label>
                  {formData.testimonials.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeTestimonial(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <Textarea
                  placeholder="Digite o depoimento..."
                  value={testimonial.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  className="min-h-[80px]"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Nome do cliente"
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Cargo/Empresa"
                    value={testimonial.role}
                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addTestimonial}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Depoimento
          </Button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Seção de depoimentos não selecionada.</p>
          <p className="text-sm text-gray-500">Volte para ativar esta seção.</p>
        </div>
      )
    },
    {
      title: "Perguntas Frequentes",
      description: "Configure as perguntas e respostas",
      content: formData.optionalSections.faq ? (
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Adicione perguntas frequentes:
          </Label>
          
          {formData.faq.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>FAQ {index + 1}</Label>
                  {formData.faq.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFAQ(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <Input
                  placeholder="Digite a pergunta..."
                  value={item.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                />
                
                <Textarea
                  placeholder="Digite a resposta..."
                  value={item.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addFAQ}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Pergunta
          </Button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Seção de FAQ não selecionada.</p>
          <p className="text-sm text-gray-500">Volte para ativar esta seção.</p>
        </div>
      )
    },
    {
      title: "Estilo e Layout",
      description: "Qual visual combina com sua marca?",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-medium">
              Escolha o estilo da página:
            </Label>
            <Select onValueChange={(value) => updateFormData('style', value)} value={formData.style}>
              <SelectTrigger className="text-lg p-4 border-2 focus:border-blue-500 transition-colors mt-2">
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
          
          <div>
            <Label className="text-lg font-medium">
              Escolha o layout da seção principal:
            </Label>
            <Select onValueChange={(value) => updateFormData('layout', value)} value={formData.layout}>
              <SelectTrigger className="text-lg p-4 border-2 focus:border-blue-500 transition-colors mt-2">
                <SelectValue placeholder="Selecione um layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="centered">📄 Centralizado - Texto no centro</SelectItem>
                <SelectItem value="split">📊 Dividido - Texto e imagem lado a lado</SelectItem>
                <SelectItem value="fullwidth">🖼️ Largura total - Com fundo colorido</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <div className="min-h-[300px]">
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
