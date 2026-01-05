
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language, AIChatLog } from '../App';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface FloatingAIProps {
  language: Language;
  onMessageLogged?: (log: Omit<AIChatLog, 'timestamp'>) => void;
}

const FloatingAI: React.FC<FloatingAIProps> = ({ language, onMessageLogged }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const sessionIdRef = useRef(Math.random().toString(36).substr(2, 9));
  
  // Mapping of respectful greetings for the initial state
  const getInitialGreeting = (lang: Language) => {
    switch (lang) {
      case 'ne': return 'जयमसीह! तपाईंलाई आदरपूर्वक स्वागत छ। म उत्साह जागृति मण्डलीको सहायक हुँ। म तपाईंलाई कसरी मद्दत गर्न सक्छु?';
      case 'ko': return 'Jaimashi! 정중하게 인사드립니다. Utsaha Jagrity Mandali 교회의 조수로서 어떻게 도와드릴까요?';
      case 'ja': return 'Jaimashi! 丁重にご挨拶申し上げます。Utsaha Jagrity Mandali教会の助手として、どのようにお手伝いできますか？';
      case 'hi': return 'जयमसीह! ससम्मान अभिवादन। मैं उत्साह जागृति मण्डली का सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?';
      default: return 'Jaimashi! Respectful greetings to you. I am the assistant for Utsaha Jagrity Mandali. How may I serve you today?';
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: getInitialGreeting(language) }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if no conversation has started
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ role: 'assistant', text: getInitialGreeting(language) }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    // Log user message for admin
    onMessageLogged?.({
      sessionId: sessionIdRef.current,
      role: 'user',
      text: userMsg
    });

    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // We pass the conversation context to help the AI understand the flow
      const historyContext = messages.map(m => `${m.role}: ${m.text}`).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user said: "${userMsg}". 
        Context: You are a friendly, human-like, and EXTREMELY RESPECTFUL AI assistant for "Utsaha Jagrity Mandali" in Kathmandu, Nepal. 
        Main Location: Gokarneshwor Banquet, Kathmandu. 
        Pastor: Mosha Tamang.
        
        BEHAVIOR RULES:
        1. If the user's message is just a greeting (like "hi", "hello", "namaste", or "jaimashi"), respond with "Jaimashi!", a respectful welcome, and ask how you can help.
        2. If the user asks a specific question or makes a statement about the church, faith, or anything else, answer it DIRECTLY and CONCISELY. 
        3. For direct answers, DO NOT include "Jaimashi!" or introductory greetings. Just provide the answer the user is looking for.
        4. Always maintain a humble and polite tone.
        
        Language Rule: Speak perfectly and naturally in ${language}.
        Conversation History for context:
        ${historyContext}`,
        config: {
          systemInstruction: "You are a humble, polite, and respectful pastoral assistant for Utsaha Jagrity Mandali. You distinguish between greetings and questions. You answer questions directly without repeating greetings.",
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I apologize, I am unable to respond at this moment. God bless you.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);

      // Log AI response for admin
      onMessageLogged?.({
        sessionId: sessionIdRef.current,
        role: 'assistant',
        text: aiText
      });

    } catch (err) {
      const errorMsg = "Grace to you. I am experiencing a brief difficulty. Please try again soon.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
      onMessageLogged?.({
        sessionId: sessionIdRef.current,
        role: 'assistant',
        text: `[Error: ${errorMsg}]`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-fade-in">
          <div className="bg-nepal-blue p-6 text-white flex justify-between items-center shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2.5 rounded-2xl">
                <Sparkles size={20} className="text-sky-300" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight">UJM Helper</h3>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Live Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50/50">
            <div className="text-[10px] text-center text-slate-400 bg-slate-100/50 py-2 rounded-lg">
              Pastor monitored for your care and support
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-nepal-blue text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex space-x-1">
                   <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                   <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3 shrink-0">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-nepal-blue/10 outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-nepal-blue text-white p-4 rounded-2xl hover:bg-nepal-red transition-all shadow-xl active:scale-90"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-nepal-blue text-white p-5 rounded-full shadow-2xl hover:bg-nepal-red hover:scale-110 transition-all group"
        >
          <MessageCircle size={32} />
        </button>
      )}
    </div>
  );
};

export default FloatingAI;
