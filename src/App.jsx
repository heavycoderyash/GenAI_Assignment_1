import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { personas } from './data/personas';
import { fetchChatResponseStream } from './api/llm';
import './App.css';

function App() {
  const [activePersonaKey, setActivePersonaKey] = useState('anshuman');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  const activePersona = personas[activePersonaKey];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handlePersonaSwitch = (key) => {
    setActivePersonaKey(key);
    setMessages([]);
    setError(null);
    setInput('');
  };

  const handleSend = async (textOverride) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const newUserMsg = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, newUserMsg];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const stream = fetchChatResponseStream(updatedMessages, activePersona.systemPrompt);
      
      let fullContent = '';
      let hasAddedAssistantMessage = false;

      for await (const chunk of stream) {
        fullContent += chunk.content;
        
        let displayContent = fullContent.replace(/<thought_process>[\s\S]*?(<\/thought_process>|$)/gi, '').trim();
        
        if (displayContent.length > 0) {
          if (!hasAddedAssistantMessage) {
            setIsLoading(false);
            setMessages(prevMessages => [
              ...prevMessages, 
              { role: 'assistant', content: displayContent }
            ]);
            hasAddedAssistantMessage = true;
          } else {
            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1] = { 
                role: 'assistant', 
                content: displayContent 
              };
              return newMessages;
            });
          }
        }
      }
      
      if (!hasAddedAssistantMessage) {
        setIsLoading(false);
      }
      
    } catch (err) {
      console.error(err);
      setError("The active persona is currently unavailable due to network latency. Please try your request again in a moment.");
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Scaler Leadership AI</h1>
        <div className="persona-switcher">
          {Object.keys(personas).map(key => (
            <button 
              key={key} 
              className={activePersonaKey === key ? 'active' : ''}
              onClick={() => handlePersonaSwitch(key)}
            >
              {personas[key].name}
            </button>
          ))}
        </div>
      </header>

      <main className="chat-container">
        <div className="active-indicator">
          Currently chatting with: <strong>{activePersona.name}</strong> - {activePersona.role}
        </div>

        <div className="messages-area">
          {messages.length === 0 && !error && (
            <div className="suggestion-chips">
              <p>Quick start:</p>
              {activePersona.suggestionChips.map((chip, idx) => (
                <button key={idx} onClick={() => handleSend(chip)}>{chip}</button>
              ))}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-bubble">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask ${activePersona.name}...`}
            disabled={isLoading}
          />
          <button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;