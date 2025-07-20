import { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Icône de chat
import axios from 'axios';
import './ChatWidget.css'; // On crée ce fichier après

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8001/chat', { question: input });
      const botMessage = { from: 'bot', text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: 'bot', text: "Erreur de l'IA." }]);
    }
  };

  return (
    <>
      <div className="chatbot-toggle" onClick={toggleChat}>
        <MessageCircle size={28} />
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écris ici..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
