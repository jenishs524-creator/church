
import React from 'react';
import { BookOpen, GraduationCap, Users, CheckCircle, ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { Language } from '../App';

interface BibleTrainingProps {
  language: Language;
}

const BibleTraining: React.FC<BibleTrainingProps> = ({ language }) => {
  const features = [
    { 
      en: { title: "Theological Foundations", desc: "Systematic study of core Christian doctrines and biblical truth." }, 
      ne: { title: "ईश्वरीय अध्ययन", desc: "बाइबलीय सत्य र ईसाई सिद्धान्तहरूको व्यवस्थित अध्ययन।" } 
    },
    { 
      en: { title: "Servant Leadership", desc: "Equipping believers for ministry and practical church leadership." }, 
      ne: { title: "सेवामूलक नेतृत्व", desc: "मन्त्रालय र व्यावहारिक मण्डली नेतृत्वका लागि विश्वासीहरूलाई सुसज्जित पार्ने।" } 
    },
    { 
      en: { title: "Biblical Hermeneutics", desc: "Learning sound interpretation techniques for deep scripture study." }, 
      ne: { title: "बाइबलीय व्याख्या", desc: "गहिरो शास्त्र अध्ययनका लागि सही व्याख्या प्रविधिहरू सिक्दै।" } 
    },
    { 
      en: { title: "Gospel Discipleship", desc: "Walking daily in the footsteps of Jesus with spiritual discipline." }, 
      ne: { title: "सुसमाचार चेलापन", desc: "आत्मिक अनुशासनका साथ दैनिक येशूको पाइला पछ्याउँदै।" } 
    }
  ];

  return (
    <div className="bg-white">
      {/* Academy Header */}
      <div className="bg-church-900 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/10 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
            <Award className="text-sky-400" size={16} />
            <span>Theological Excellence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Utsaha Jagrity <span className="text-sky-400">Academy</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Study to show thyself approved unto God, a workman that needeth not to be ashamed."
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
            <div className="lg:w-1/2 space-y-12">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-nepal-blue px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.3em] border border-blue-100 shadow-sm">
                 <Shield size={18} />
                 <span>Equipping The Saints</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-church-900 leading-tight tracking-tight">
                {language === 'ne' ? 'वचनमा आफ्नो विश्वास गहिरो बनाउनुहोस्' : 'Transformation Through Biblical Education'}
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed font-light">
                 {language === 'ne' 
                   ? 'उत्साह जागृति मण्डलीमा, हामी सुदृढ सिद्धान्त र आत्मिक अनुशासन मार्फत जीवन परिवर्तन गर्न व्यवस्थित बाइबल तालिम प्रदान गर्दछौं।'
                   : 'At Utsaha Jagrity Mandali, we believe education is the bedrock of strong faith. Our structured courses bridge the gap between ancient scripture and modern living.'}
              </p>
              
              <div className="grid grid-cols-2 gap-8 py-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-2xl text-nepal-blue">12+</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Years of Teaching</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-2xl text-nepal-red">300+</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Graduated Students</p>
                </div>
              </div>

              <button className="flex items-center space-x-4 bg-nepal-red text-white px-12 py-6 rounded-[2.5rem] font-black text-lg hover:bg-red-700 transition-all shadow-2xl hover:translate-x-3 active:scale-95 group">
                <span>Start Your Journey</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-8 relative">
               <div className="absolute -top-20 -right-20 w-80 h-80 bg-nepal-blue/5 rounded-full blur-[100px]"></div>
               <div className="space-y-8 pt-20">
                  <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop" className="rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Study" />
                  <div className="bg-church-900 p-12 rounded-[4rem] text-white shadow-2xl">
                     <BookOpen className="text-sky-400 w-14 h-14 mb-8" />
                     <h4 className="font-bold text-3xl mb-4 font-serif">Deep Study</h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">Immersive scripture analysis for the dedicated student.</p>
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl">
                     <Users className="text-nepal-red w-14 h-14 mb-8" />
                     <h4 className="font-bold text-3xl text-church-900 mb-4 font-serif">Community</h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">Learning together in a circle of mutual accountability.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=2070&auto=format&fit=crop" className="rounded-[4rem] shadow-2xl" alt="Training" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
             {features.map((f, i) => {
               const data = language === 'ne' ? f.ne : f.en;
               return (
                <div key={i} className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 hover:border-nepal-blue transition-all group hover:bg-white hover:shadow-2xl flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-10 group-hover:bg-nepal-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                      <CheckCircle size={32} />
                   </div>
                   <h4 className="text-2xl font-bold text-church-900 mb-6 font-serif">{data.title}</h4>
                   <p className="text-slate-500 leading-relaxed font-light">{data.desc}</p>
                </div>
              );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleTraining;
