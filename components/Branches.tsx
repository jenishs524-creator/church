
import React from 'react';
import { MapPin, Info, ArrowRight, Calendar, User } from 'lucide-react';
import { Language } from '../App';
import { branchData } from '../data/branches';

interface BranchesProps {
  language: Language;
  isMain?: boolean;
}

const Branches: React.FC<BranchesProps> = ({ language, isMain = false }) => {
  const t = {
    title: { en: "Our Locations", ne: "हाम्रा स्थानहरू", ko: "우리의 위치", ja: "私たちの場所", hi: "हमारे स्थान", zh: "我们的位置", es: "Nuestras Ubicaciones", fr: "Nos Emplacements" },
    viewDetails: { en: "Learn More", ne: "थप जान्नुहोस्", ko: "자세히 보기", ja: "詳細を見る", hi: "अधिक जानें", zh: "了解更多", es: "Saber más", fr: "En savoir plus" },
    est: { en: "Est.", ne: "स्थापना", ko: "설립", ja: "設立", hi: "स्थापना", zh: "建立", es: "Est.", fr: "Fondé" }
  };

  const getT = (key: keyof typeof t) => t[key][language as keyof typeof t.title] || t[key].en;

  const list = isMain ? branchData.filter(b => b.id === 'main') : branchData;

  const handleBranchClick = (id: string) => {
    window.location.hash = `branch/${id}`;
  };

  return (
    <div className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isMain && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-church-900 mb-4">{getT('title')}</h2>
            <div className="w-24 h-1.5 bg-nepal-red mx-auto rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((branch) => (
            <div 
              key={branch.id} 
              onClick={() => handleBranchClick(branch.id)}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-200 cursor-pointer flex flex-col h-full"
            >
              <div className="h-56 bg-church-900 relative overflow-hidden">
                <div className="absolute inset-0 hero-pattern opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className={`w-16 h-16 ${branch.id === 'main' ? 'text-nepal-red' : 'text-sky-400'} group-hover:scale-110 transition-transform`} />
                </div>
                {branch.id === 'main' && (
                   <div className="absolute top-6 left-6 bg-nepal-red text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                     Main Church
                   </div>
                )}
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">
                  {language === 'ne' ? branch.nameNe : branch.name}
                </h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start space-x-3 text-slate-500">
                    <MapPin className="w-5 h-5 mt-0.5 text-nepal-blue flex-shrink-0" />
                    <p className="text-sm font-medium leading-relaxed">{language === 'ne' ? branch.locationNe : branch.location}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">{getT('est')}: {branch.established}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <User className="w-4 h-4" />
                    <span className="text-xs">{branch.leader}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <span className="text-nepal-blue font-black text-xs uppercase tracking-widest">{getT('viewDetails')}</span>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-nepal-blue group-hover:text-white transition-colors shadow-inner">
                      <ArrowRight size={18} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;
