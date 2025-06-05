
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Download, 
  Share2, 
  Eye, 
  ArrowLeft, 
  Copy, 
  ExternalLink,
  Palette,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PagePreviewProps {
  generatedPage: {
    html: string;
    css: string;
    preview: string;
  };
  formData: any;
  onBack: () => void;
}

const PagePreview = ({ generatedPage, formData, onBack }: PagePreviewProps) => {
  const [activeTab, setActiveTab] = useState("preview");

  const handleDownload = (type: "html" | "css" | "both") => {
    if (type === "html") {
      const blob = new Blob([generatedPage.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.productName.toLowerCase().replace(/\s+/g, "-")}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "css") {
      const blob = new Blob([generatedPage.css], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "styles.css";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Download both files in a zip would require additional library
      handleDownload("html");
      setTimeout(() => handleDownload("css"), 100);
    }
    
    toast({
      title: "Download iniciado!",
      description: "Seus arquivos estão sendo baixados.",
    });
  };

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado!",
      description: `Código ${type} copiado para a área de transferência.`,
    });
  };

  const handleShare = () => {
    // Simulate sharing functionality
    const shareUrl = `https://page-ai-preview.com/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copiado!",
      description: "Link temporário copiado para compartilhamento.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{formData.productName}</h1>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Eye className="w-3 h-3 mr-1" />
                  Página Gerada
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
              <Button
                onClick={() => handleDownload("both")}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Arquivos
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Ferramentas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                  <TabsList className="grid w-full grid-cols-1 h-auto">
                    <TabsTrigger value="preview" className="justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="html" className="justify-start">
                      <Code className="w-4 h-4 mr-2" />
                      HTML
                    </TabsTrigger>
                    <TabsTrigger value="css" className="justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      CSS
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2 pt-4 border-t">
                  <Button
                    onClick={() => handleDownload("html")}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar HTML
                  </Button>
                  <Button
                    onClick={() => handleDownload("css")}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar CSS
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Gerar Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="preview" className="m-0">
                    <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Preview da Landing Page</h3>
                      <Badge variant="outline">Live Preview</Badge>
                    </div>
                    <div className="h-[700px] overflow-auto">
                      <iframe
                        srcDoc={generatedPage.preview}
                        className="w-full h-full border-0"
                        title="Landing Page Preview"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="html" className="m-0">
                    <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Código HTML</h3>
                      <Button
                        onClick={() => handleCopyCode(generatedPage.html, "HTML")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <div className="h-[700px] overflow-auto">
                      <pre className="p-4 text-sm bg-gray-900 text-green-400 h-full overflow-auto">
                        <code>{generatedPage.html}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="css" className="m-0">
                    <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Código CSS</h3>
                      <Button
                        onClick={() => handleCopyCode(generatedPage.css, "CSS")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <div className="h-[700px] overflow-auto">
                      <pre className="p-4 text-sm bg-gray-900 text-blue-400 h-full overflow-auto">
                        <code>{generatedPage.css}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
