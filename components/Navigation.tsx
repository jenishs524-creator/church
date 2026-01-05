
import React, { useState, useEffect } from 'react';
import { Menu, X, Church, Globe, ChevronDown, Lock } from 'lucide-react';
import { Language } from '../App';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: Language;
  changeLanguage: (lang: Language) => void;
  churchName: string;
  location: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage, language, changeLanguage, churchName, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // Hidden way to access admin: Click logo 5 times within 3 seconds
  useEffect(() => {
    if (logoClicks === 5) {
      handleNavClick('admin-portal');
      setLogoClicks(0);
    }
    const timer = setTimeout(() => setLogoClicks(0), 3000);
    return () => clearTimeout(timer);
  }, [logoClicks]);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ne', label: 'Nepali', native: 'नेपाली' },
    { code: 'ko', label: 'Korean', native: '한국어' },
    { code: 'ja', label: 'Japanese', native: '日本語' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'zh', label: 'Chinese', native: '中文' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'fr', label: 'French', native: 'Français' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
    { code: 'pt', label: 'Portuguese', native: 'Português' },
    { code: 'ru', label: 'Russian', native: 'Русский' },
    { code: 'de', label: 'German', native: 'Deutsch' },
  ];

  const navItems = [
    { id: 'home', en: 'Home', ne: 'घर', ko: '홈', ja: 'ホーム', hi: 'होम', zh: '首页', es: 'Inicio', fr: 'Accueil', ar: 'الرئيسية', pt: 'Início', ru: 'Главная', de: 'Startseite' },
    { id: 'about', en: 'About', ne: 'बारेमा', ko: '정보', ja: 'について', hi: 'बारे में', zh: '关于', es: 'Acerca de', fr: 'À propos', ar: 'حول', pt: 'Sobre', ru: 'О нас', de: 'Über uns' },
    { id: 'branches', en: 'Branches', ne: 'शाखाहरू', ko: '지점', ja: '支部', hi: 'शाखाएं', zh: '分部', es: 'Ramas', fr: 'Succursales', ar: 'الفروع', pt: 'Filiais', ru: 'Филиалы', de: 'Filialen' },
    { id: 'ministries', en: 'Ministries', ne: 'सेवाहरू', ko: '사역', ja: 'ミニストリー', hi: 'मंत्रालय', zh: '事工', es: 'Ministerios', fr: 'Ministères', ar: 'الخدمات', pt: 'Ministérios', ru: 'Служения', de: 'Dienste' },
    { id: 'bible-training', en: 'Academy', ne: 'तालिम', ko: '교육', ja: 'トレーニング', hi: 'प्रशिक्षण', zh: '学院', es: 'Academia', fr: 'Académie', ar: 'الأكاديمية', pt: 'Academia', ru: 'Академия', de: 'Akademie' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    setLangOpen(false);
  };

  const handleLogoTouch = () => {
    setLogoClicks(prev => prev + 1);
  };

  const currentLangLabel = languages.find(l => l.code === language)?.native || 'English';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div 
            className="flex items-center cursor-pointer group select-none active:scale-95 transition-transform" 
            onClick={handleLogoTouch}
          >
            <div className="bg-nepal-blue text-white p-2 rounded-xl mr-3 group-hover:bg-nepal-red transition-colors">
              <Church className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base md:text-xl text-slate-900 leading-none truncate max-w-[140px] md:max-w-none">{churchName}</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight uppercase truncate max-w-[140px] md:max-w-none mt-1">{location}</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] xl:text-xs font-black transition-all duration-200 uppercase tracking-widest relative group ${
                  currentPage === item.id ? 'text-nepal-blue' : 'text-slate-500 hover:text-nepal-blue'
                }`}
              >
                {item[language as keyof typeof item] || item.en}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-nepal-blue transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}

            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-100 transition-all border border-slate-100"
              >
                <Globe size={14} className="text-nepal-blue" />
                <span>{currentLangLabel}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl py-3 border border-slate-100 animate-fade-in grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-xs font-bold hover:bg-blue-50 transition-colors flex justify-between items-center ${language === lang.code ? 'text-nepal-blue bg-blue-50/50' : 'text-slate-700'}`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] opacity-40 font-normal">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
               onClick={() => handleNavClick('contact')}
               className="bg-nepal-blue text-white px-6 py-3 rounded-xl text-[11px] font-black hover:bg-nepal-red transition-all shadow-lg active:scale-95 uppercase tracking-widest"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 bg-slate-100 rounded-xl"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest ${
                  currentPage === item.id ? 'bg-blue-50 text-nepal-blue' : 'text-slate-600'
                }`}
              >
                {item[language as keyof typeof item] || item.en}
              </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-slate-100">
               <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Language Select</p>
               <div className="grid grid-cols-2 gap-3 px-2">
                 {languages.map(lang => (
                   <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`text-xs font-bold py-4 px-4 rounded-2xl border transition-all ${language === lang.code ? 'border-nepal-blue text-nepal-blue bg-blue-50' : 'border-slate-100 text-slate-600 bg-slate-50'}`}
                   >
                     {lang.native}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
