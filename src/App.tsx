import React, { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import Textarea from './components/Textarea';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    setMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="p-4">
        <h1 className="text-2xl font-bold mb-4">WhatsApp Chatbot Configurator</h1>
        <Input
          id="userInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma mensagem..."
        />
        <Button onClick={handleSend}>Enviar</Button>
        <div className="mt-4 p-2 border rounded">
          <p className="font-bold">Mensagem:</p>
          <p>{message}</p>
        </div>
      </Card>
    </div>
  );
};

export default App;
