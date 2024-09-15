import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Send, Settings, MessageSquare, Clock, Users, BarChart, QrCode } from 'lucide-react';

const defaultFAQs = [
  { question: "Qual é o prazo de entrega?", answer: "Nosso prazo de entrega padrão é de 3 a 5 dias úteis." },
  { question: "Como faço para rastrear meu pedido?", answer: "Você pode rastrear seu pedido usando o número de rastreamento enviado para seu e-mail." },
  { question: "Vocês aceitam devolução?", answer: "Sim, aceitamos devoluções em até 7 dias após o recebimento do produto." },
];

const WhatsAppChatbotConfigurator = () => {
  const [step, setStep] = useState('welcome');
  const [companyInfo, setCompanyInfo] = useState({ name: '', industry: '', supportTeamSize: '' });
  const [welcomeMessage, setWelcomeMessage] = useState('Olá! Bem-vindo à [Nome da Empresa]. Como posso te ajudar hoje?');
  const [businessHours, setBusinessHours] = useState({ weekdays: '', weekends: '' });
  const [outOfHoursMessage, setOutOfHoursMessage] = useState('Atualmente estamos fora do nosso horário de atendimento. Retornaremos assim que possível! Obrigado pelo contato!');
  const [faqList, setFaqList] = useState(defaultFAQs);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqList = [...faqList];
    newFaqList[index][field] = value;
    setFaqList(newFaqList);
  };

  const addFaqItem = () => {
    setFaqList([...faqList, { question: '', answer: '' }]);
  };

  const removeFaqItem = (index) => {
    const newFaqList = faqList.filter((_, i) => i !== index);
    setFaqList(newFaqList);
  };

  const handleUserInput = () => {
    if (inputMessage.trim() === '') return;

    setChatHistory(prev => [...prev, { sender: 'user', message: inputMessage }]);
    setInputMessage('');
    
    setTimeout(() => {
      let botResponse = getBotResponse(inputMessage.toLowerCase());
      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (input) => {
    if (input.includes('olá') || input.includes('oi')) {
      return welcomeMessage.replace('[Nome da Empresa]', companyInfo.name);
    } else if (input.includes('horário')) {
      return `Nosso horário de atendimento é ${businessHours.weekdays} de segunda a sexta, e ${businessHours.weekends} nos fins de semana.`;
    } else {
      const matchedFaq = faqList.find(faq => input.includes(faq.question.toLowerCase()));
      if (matchedFaq) {
        return matchedFaq.answer;
      }
      return outOfHoursMessage;
    }
  };

  const generateQRCode = () => {
    const fakeQRCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify({
      companyName: companyInfo.name,
      welcomeMessage: welcomeMessage,
      businessHours: businessHours,
      faqCount: faqList.length
    }))}`;
    setQrCodeUrl(fakeQRCodeUrl);
  };

  useEffect(() => {
    if (step === 'qrcode') {
      generateQRCode();
    }
  }, [step]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Configurador Avançado de Chatbot WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={step} onValueChange={setStep}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="welcome"><Settings className="mr-2" /> Início</TabsTrigger>
              <TabsTrigger value="companyInfo"><Users className="mr-2" /> Empresa</TabsTrigger>
              <TabsTrigger value="businessHours"><Clock className="mr-2" /> Horários</TabsTrigger>
              <TabsTrigger value="faq"><MessageSquare className="mr-2" /> FAQ</TabsTrigger>
              <TabsTrigger value="test"><BarChart className="mr-2" /> Teste</TabsTrigger>
              <TabsTrigger value="qrcode"><QrCode className="mr-2" /> QR Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="welcome">
              <h2 className="text-xl font-bold mb-4">Bem-vindo ao Configurador de Chatbot</h2>
              <p>Configure seu chatbot WhatsApp passo a passo. Clique nas abas acima para navegar entre as seções.</p>
            </TabsContent>

            <TabsContent value="companyInfo">
              <h2 className="text-xl font-bold mb-4">Informações da Empresa</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                    placeholder="Digite o nome da sua empresa"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Ramo de Atividade</Label>
                  <Input
                    id="industry"
                    value={companyInfo.industry}
                    onChange={(e) => handleCompanyInfoChange('industry', e.target.value)}
                    placeholder="Ex: Varejo, Tecnologia, Serviços"
                  />
                </div>
                <div>
                  <Label htmlFor="supportTeamSize">Tamanho da Equipe de Suporte</Label>
                  <Input
                    id="supportTeamSize"
                    type="number"
                    value={companyInfo.supportTeamSize}
                    onChange={(e) => handleCompanyInfoChange('supportTeamSize', e.target.value)}
                    placeholder="Número de pessoas no atendimento"
                  />
                </div>
                <div>
                  <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Mensagem de boas-vindas para os clientes"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="businessHours">
              <h2 className="text-xl font-bold mb-4">Horário de Funcionamento</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weekdayHours">Horário de Segunda a Sexta</Label>
                  <Input
                    id="weekdayHours"
                    value={businessHours.weekdays}
                    onChange={(e) => setBusinessHours(prev => ({ ...prev, weekdays: e.target.value }))}
                    placeholder="Ex: 9h às 18h"
                  />
                </div>
                <div>
                  <Label htmlFor="weekendHours">Horário nos Fins de Semana</Label>
                  <Input
                    id="weekendHours"
                    value={businessHours.weekends}
                    onChange={(e) => setBusinessHours(prev => ({ ...prev, weekends: e.target.value }))}
                    placeholder="Ex: 10h às 14h ou Fechado"
                  />
                </div>
                <div>
                  <Label htmlFor="outOfHoursMessage">Mensagem Fora do Horário</Label>
                  <Textarea
                    id="outOfHoursMessage"
                    value={outOfHoursMessage}
                    onChange={(e) => setOutOfHoursMessage(e.target.value)}
                    placeholder="Mensagem para clientes fora do horário de atendimento"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <h2 className="text-xl font-bold mb-4">Perguntas Frequentes (FAQ)</h2>
              {faqList.map((faq, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="Pergunta"
                  />
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    placeholder="Resposta"
                  />
                  <Button onClick={() => removeFaqItem(index)} variant="destructive">Remover</Button>
                </div>
              ))}
              <Button onClick={addFaqItem} className="mb-4">Adicionar FAQ</Button>
            </TabsContent>

            <TabsContent value="test">
              <h2 className="text-xl font-bold mb-4">Teste seu Chatbot</h2>
              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`mb-4 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                    <span className={`inline-block p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {msg.message}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                  className="flex-grow"
                />
                <Button onClick={handleUserInput}>
                  <Send size={20} />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="qrcode">
              <h2 className="text-xl font-bold mb-4">QR Code do Seu Chatbot</h2>
              <p>Escaneie este QR Code para conectar seu WhatsApp ao chatbot configurado:</p>
              {qrCodeUrl && (
                <div className="mt-4 flex justify-center">
                  <img src={qrCodeUrl} alt="QR Code do Chatbot" className="w-48 h-48" />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppChatbotConfigurator;
