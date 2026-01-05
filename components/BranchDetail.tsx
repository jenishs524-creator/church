
import React from 'react';
import { MapPin, Calendar, Clock, User, Phone, ArrowLeft, ExternalLink } from 'lucide-react';
import { Language } from '../App';
import { branchData } from '../data/branches';

interface BranchDetailProps {
  branchId: string;
  language: Language;
}

const BranchDetail: React.FC<BranchDetailProps> = ({ branchId, language }) => {
  const branch = branchData.find(b => b.id === branchId);

  if (!branch) return <div className="py-20 text-center">Branch not found.</div>;

  const t = {
    back: { en: "Back to Branches", ne: "शाखाहरूमा फर्कनुहोस्" },
    est: { en: "Established", ne: "स्थापना" },
    leader: { en: "Branch Leader", ne: "शाखा प्रमुख" },
    start: { en: "Service Starts", ne: "सेवा सुरु हुने समय" },
    contact: { en: "Contact Details", ne: "सम्पर्क विवरण" },
    viewMap: { en: "Open in Google Maps", ne: "गुगल नक्सामा खोल्नुहोस्" }
  };

  const getT = (key: keyof typeof t) => t[key][language === 'ne' ? 'ne' : 'en'];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <button 
          onClick={() => window.location.hash = 'branches'}
          className="flex items-center space-x-2 text-nepal-blue font-bold mb-10 hover:underline"
        >
          <ArrowLeft size={18} />
          <span>{getT('back')}</span>
        </button>

        <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-church-900 mb-6">
              {language === 'ne' ? branch.nameNe : branch.name}
            </h1>
            <p className="text-xl text-slate-500 font-light mb-12 max-w-2xl leading-relaxed">
              {branch.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-nepal-red">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{getT('est')}</h4>
                    <p className="text-lg font-bold text-slate-800">{branch.established}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-nepal-blue">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{getT('leader')}</h4>
                    <p className="text-lg font-bold text-slate-800">{branch.leader}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-sky-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{getT('start')}</h4>
                    <p className="text-lg font-bold text-slate-800">{branch.startTime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-green-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{getT('contact')}</h4>
                    <p className="text-lg font-bold text-slate-800">{branch.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-slate-200">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-nepal-red" />
                  <span className="font-bold text-slate-700">{language === 'ne' ? branch.locationNe : branch.location}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nepal-blue flex items-center space-x-2 text-sm font-bold hover:underline"
                >
                  <span>{getT('viewMap')}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="h-96 relative bg-slate-200 flex items-center justify-center">
                 {/* Visual placeholder for Map */}
                 <div className="absolute inset-0 opacity-10 hero-pattern bg-church-900"></div>
                 <div className="text-center relative z-10 px-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
                       <MapPin size={40} className="text-nepal-red" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Map visualization centered on {branch.location}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;
