
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AICompanion from './components/AICompanion';
import BibleTraining from './components/BibleTraining';
import Branches from './components/Branches';
import BranchDetail from './components/BranchDetail';
import AdminDashboard from './components/AdminDashboard';
import FloatingAI from './components/FloatingAI';

export type Language = 'en' | 'ne' | 'ko' | 'ja' | 'hi' | 'zh' | 'es' | 'fr' | 'ar' | 'pt' | 'ru' | 'de';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface AIChatLog {
  sessionId: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [aiLogs, setAiLogs] = useState<AIChatLog[]>([]);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('branch/')) {
        setSelectedBranchId(hash.split('/')[1]);
        setCurrentPage('branch-detail');
      } else {
        setCurrentPage(hash);
        setSelectedBranchId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(),
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const handleLogAIChat = (log: Omit<AIChatLog, 'timestamp'>) => {
    const newLog: AIChatLog = {
      ...log,
      timestamp: new Date().toLocaleTimeString(),
    };
    setAiLogs(prev => [...prev, newLog]);
  };

  const churchName = "Utsaha Jagrity Mandali";
  const location = "Gokarneshwor Banquet, Kathmandu";
  const estDate = "15/06/2012";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-nepal-blue selection:text-white">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={navigateTo} 
        language={language} 
        changeLanguage={changeLanguage}
        churchName={churchName}
        location={location}
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} language={language} churchName={churchName} location={location} estDate={estDate} />
            <div className="bg-white py-12">
               <Services language={language} location={location} estDate={estDate} />
            </div>
            <About language={language} estDate={estDate} location={location} />
            <Branches language={language} isMain={true} />
            <Contact language={language} location={location} estDate={estDate} onSendMessage={handleSendMessage} />
          </>
        )}
        
        {currentPage === 'about' && (
          <div className="animate-fade-in">
             <div className="bg-church-900 py-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 blur-[120px]"></div>
                <h1 className="text-5xl md:text-7xl text-white font-serif font-bold relative z-10 tracking-tight">
                  {language === 'en' ? 'Our Ministry Profile' : 'हाम्रो मन्त्रालयको विवरण'}
                </h1>
             </div>
             <About language={language} estDate={estDate} location={location} />
          </div>
        )}

        {currentPage === 'branches' && (
          <div className="animate-fade-in">
             <div className="bg-church-900 py-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/10 blur-[120px]"></div>
                <h1 className="text-5xl md:text-7xl text-white font-serif font-bold relative z-10 tracking-tight">
                  {language === 'en' ? 'Our Branches' : 'हाम्रा शाखाहरू'}
                </h1>
             </div>
             <Branches language={language} />
          </div>
        )}

        {currentPage === 'branch-detail' && selectedBranchId && (
          <BranchDetail branchId={selectedBranchId} language={language} />
        )}

        {currentPage === 'ministries' && (
          <div className="animate-fade-in">
              <div className="bg-church-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl text-white font-serif font-bold tracking-tight">
                   {language === 'en' ? 'Ministries' : 'मन्त्रालयहरू'}
                </h1>
             </div>
             <Services language={language} location={location} estDate={estDate} />
          </div>
        )}

        {currentPage === 'bible-training' && (
          <div className="animate-fade-in">
             <BibleTraining language={language} />
          </div>
        )}

        {currentPage === 'companion' && (
          <div className="animate-fade-in">
             <div className="bg-indigo-950 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl text-white font-serif font-bold tracking-tight">Scripture AI Companion</h1>
             </div>
             <AICompanion />
          </div>
        )}

        {currentPage === 'contact' && (
           <div className="animate-fade-in">
              <Contact language={language} location={location} estDate={estDate} onSendMessage={handleSendMessage} />
           </div>
        )}

        {currentPage === 'admin-portal' && (
          <AdminDashboard messages={messages} aiLogs={aiLogs} language={language} />
        )}
      </main>

      <footer className="bg-church-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">⛪</div>
              <span className="font-serif font-bold text-white text-xl">{churchName}</span>
            </div>
            <p className="text-xs tracking-widest uppercase opacity-60">{location}</p>
            <p className="text-[10px] opacity-30">&copy; {new Date().getFullYear()} Utsaha Jagrity Mandali</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant */}
      <FloatingAI language={language} onMessageLogged={handleLogAIChat} />
    </div>
  );
};

export default App;
