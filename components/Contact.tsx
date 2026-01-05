
import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Loader2, MessageSquare, ExternalLink } from 'lucide-react';
import { Language, ContactMessage } from '../App';

interface ContactProps {
  language: Language;
  location: string;
  estDate: string;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
}

const Contact: React.FC<ContactProps> = ({ language, location, estDate, onSendMessage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const t = {
    title: { en: 'Get in Touch', ne: 'सम्पर्क गर्नुहोस्', ko: '연락하기', ja: 'お問い合わせ', hi: 'संपर्क करें' },
    name: { en: 'Full Name', ne: 'पूरा नाम', ko: '성함', ja: 'お名前', hi: 'पूरा नाम' },
    email: { en: 'Email Address', ne: 'इमेल ठेगाना', ko: 'इमेइल जुसो', ja: 'メールアドレス', hi: 'ईमेल पता' },
    msg: { en: 'Message', ne: 'सन्देश', ko: '메सीजी', ja: 'メッセージ', hi: 'संदेश' },
    submit: { en: 'Submit Request', ne: 'अनुरोध बुझाउनुहोस्', ko: '요청 제출', ja: '送信する', hi: 'अनुरोध सबमिट करें' },
    thanks: { en: 'Thank You!', ne: 'धन्यवाद!', ko: '감사합니다!', ja: 'ありがとうございます！', hi: 'धन्यवाद!' },
    mapLabel: { en: 'Our Main Location', ne: 'हाम्रो मुख्य स्थान' }
  };

  const getT = (key: keyof typeof t) => t[key][language as keyof typeof t.title] || t[key].en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) return;
    setStatus('submitting');
    
    // Call the parent handler
    onSendMessage(formData);

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-church-900 text-white py-28 relative overflow-hidden" id="contact">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic tracking-tight">
               {getT('title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Contact Form */}
            <div className="bg-white shadow-2xl rounded-[3rem] p-10 md:p-16 border border-slate-100">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">{getT('thanks')}</h4>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-lg font-bold text-nepal-blue hover:underline">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{getT('name')}</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-100 border-none rounded-2xl px-6 py-5 text-slate-900 focus:ring-4 focus:ring-nepal-blue/20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{getT('email')}</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-100 border-none rounded-2xl px-6 py-5 text-slate-900 focus:ring-4 focus:ring-nepal-blue/20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{getT('msg')}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-slate-100 border-none rounded-2xl px-6 py-5 text-slate-900 focus:ring-4 focus:ring-nepal-blue/20" />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-church-900 hover:bg-black text-white font-bold py-6 px-10 rounded-2xl flex items-center justify-center transition-all shadow-xl">
                    {status === 'submitting' ? <Loader2 className="animate-spin mr-3" /> : <MessageSquare className="mr-3" />}
                    {getT('submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Location & Map Section */}
            <div className="space-y-10">
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-md overflow-hidden flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-nepal-red/20 p-3 rounded-2xl">
                      <MapPin className="text-nepal-red" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white">{getT('mapLabel')}</h4>
                      <p className="text-church-200 text-sm mt-1">{location}</p>
                    </div>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gokarneshwor Banquet Kathmandu Nepal")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-white transition-colors"
                    title="View larger map"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                
                {/* Embedded Google Map Iframe */}
                <div className="flex-grow rounded-2xl overflow-hidden shadow-inner bg-slate-800 border border-white/10 min-h-[400px]">
                  <iframe
                    title="Main Church Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=Gokarneshwor%20Banquet%20Kathmandu%20Nepal&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  ></iframe>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 text-church-200">
                    <Phone className="text-sky-400" size={18} />
                    <span className="text-sm font-medium">9808877006</span>
                  </div>
                  <div className="flex items-center space-x-3 text-church-200">
                    <Mail className="text-sky-400" size={18} />
                    <span className="text-sm font-medium truncate">utsahajagritmandali@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;
