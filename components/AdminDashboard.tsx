
import React, { useState, useMemo } from 'react';
import { ContactMessage, AIChatLog, Language } from '../App';
import { Mail, User, Calendar, MessageCircle, AlertCircle, ShieldCheck, Lock, ArrowRight, Activity, Terminal } from 'lucide-react';

interface AdminDashboardProps {
  messages: ContactMessage[];
  aiLogs: AIChatLog[];
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, aiLogs, language }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [view, setView] = useState<'contact' | 'ai'>('contact');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '2015') {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const groupedAiLogs = useMemo(() => {
    const groups: Record<string, AIChatLog[]> = {};
    aiLogs.forEach(log => {
      if (!groups[log.sessionId]) groups[log.sessionId] = [];
      groups[log.sessionId].push(log);
    });
    return Object.entries(groups).reverse(); // Newest sessions first
  }, [aiLogs]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-church-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 w-full max-w-md shadow-2xl animate-fade-in">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-50 text-nepal-blue rounded-[2rem] flex items-center justify-center mx-auto mb-6">
               <Lock size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Restricted Access</h2>
            <p className="text-slate-400 text-sm mt-2">Enter the church mission code to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Secure Passcode"
                className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-4 text-center text-xl font-bold tracking-widest focus:ring-4 focus:ring-nepal-blue/10 outline-none transition-all ${error ? 'border-red-300' : 'border-slate-100'}`}
              />
              {error && <p className="text-red-500 text-xs mt-2 text-center font-bold">Incorrect passcode. Access denied.</p>}
            </div>
            <button className="w-full bg-nepal-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-church-800 transition-all flex items-center justify-center space-x-2">
              <span>Authorize Access</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-900">Secure Admin Portal</h1>
              <p className="text-slate-500 mt-1">Utsaha Jagrity Mandali - Pastoral Monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-2xl p-1 flex shadow-sm border border-slate-100">
              <button 
                onClick={() => setView('contact')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'contact' ? 'bg-nepal-blue text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Submissions
              </button>
              <button 
                onClick={() => setView('ai')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'ai' ? 'bg-nepal-red text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                AI Live Logs
              </button>
            </div>
            <button 
              onClick={() => setIsAuthorized(false)} 
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors bg-white px-6 py-3 rounded-xl shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {view === 'contact' ? (
          <div>
            {messages.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <AlertCircle className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-800 mb-2">No Submissions Yet</h3>
                <p className="text-slate-500 text-lg">New contact requests will be recorded here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 hover:border-nepal-blue/30 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-50">
                      <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-blue-50 text-nepal-blue rounded-[1.5rem] flex items-center justify-center shadow-inner">
                          <User size={28} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-slate-900">{msg.name}</h4>
                          <div className="flex items-center text-slate-500 text-sm mt-1">
                            <Mail size={16} className="mr-2 text-nepal-red" />
                            <span className="font-medium underline">{msg.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center bg-slate-50 px-5 py-2.5 rounded-2xl text-slate-400 text-sm font-bold">
                        <Calendar size={16} className="mr-2" />
                        <span>{msg.date}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 p-8 rounded-[2rem] text-slate-700 text-lg leading-relaxed font-light border border-slate-100 italic">
                      "{msg.message}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {groupedAiLogs.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Activity className="w-10 h-10 text-slate-300 animate-pulse" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-800 mb-2">No AI Activity</h3>
                <p className="text-slate-500 text-lg">Conversations with the AI Helper will appear here live.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {groupedAiLogs.map(([sessionId, logs]) => (
                  <div key={sessionId} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col">
                    <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-nepal-red/10 text-nepal-red rounded-xl flex items-center justify-center">
                          <Terminal size={18} />
                        </div>
                        <h4 className="text-sm font-black text-slate-600 uppercase tracking-[0.2em]">Session ID: {sessionId}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                        {logs.length} Messages
                      </span>
                    </div>
                    <div className="p-8 space-y-6">
                      {logs.map((log, idx) => (
                        <div key={idx} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-5 rounded-[1.5rem] shadow-sm relative group ${
                            log.role === 'user' 
                              ? 'bg-nepal-blue text-white rounded-br-none' 
                              : 'bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200'
                          }`}>
                            <p className="text-sm leading-relaxed">{log.text}</p>
                            <span className={`absolute -bottom-5 right-0 text-[10px] font-bold ${log.role === 'user' ? 'text-nepal-blue' : 'text-slate-400'}`}>
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
