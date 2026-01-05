
import React from 'react';
import { ArrowRight, Calendar, MapPin, Quote } from 'lucide-react';
import { Language } from '../App';

interface HeroProps {
  onNavigate: (page: string) => void;
  language: Language;
  churchName: string;
  location: string;
  estDate: string;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, language, churchName, location, estDate }) => {
  return (
    <div className="relative bg-church-900 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
          alt="Church Sanctuary"
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-church-900 via-church-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Powerful Bible Verse Corner Label */}
        <div className="absolute top-0 right-0 hidden lg:block translate-y-[-20%]">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[3rem] max-w-xs shadow-2xl">
            <Quote className="text-sky-400 w-8 h-8 mb-4 opacity-50" />
            <p className="text-slate-200 italic font-serif leading-relaxed mb-4">
              {language === 'en' 
                ? '"Come to me, all you who are weary and burdened, and I will give you rest."' 
                : '"हे सबै थाकेका र बोझले थिचिएका मानिसहरू, मकहाँ आओ, र म तिमीहरूलाई विश्राम दिनेछु। "'}
            </p>
            <p className="text-sky-400 font-bold text-sm tracking-widest uppercase">
              {language === 'en' ? 'Matthew 11:28' : 'मत्ती ११:२८'}
            </p>
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-bold text-white tracking-widest uppercase">
              {language === 'en' ? 'Jaimashi! Welcome' : 'जयमसीह! स्वागत छ'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif mb-8 leading-[1.1] text-white">
            {language === 'en' ? (
              <>Finding Peace in Jesus Christ</>
            ) : (
              <>येशू ख्रीष्टमा शान्ति खोज्दै</>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 font-light leading-relaxed max-w-3xl border-l-4 border-nepal-red pl-6 italic">
            {language === 'en' 
              ? 'Grace and peace to you in the name of our Lord. We are a devoted community of believers in Kathmandu, walking together in faith, hope, and love.' 
              : 'हाम्रा प्रभुको नाममा तपाईंलाई अनुग्रह र शान्ति। हामी काठमाडौंमा विश्वासीहरूको एक समर्पित समुदाय हौं, जो विश्वास, आशा र प्रेममा सँगै हिंडिरहेका छौं।'}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center justify-center bg-nepal-red hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-red-900/40"
            >
              {language === 'en' ? 'Connect With Us' : 'हामीसँग जोडिनुहोस्'}
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>
            <button
               onClick={() => onNavigate('about')}
               className="flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-lg transition-all"
            >
              {language === 'en' ? 'About Our Ministry' : 'हाम्रो मन्त्रालयको बारेमा'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-white/10">
            <div className="flex items-start space-x-4">
              <MapPin className="h-7 w-7 text-sky-400 mt-1" />
              <div>
                <p className="font-bold text-white text-lg">{language === 'en' ? 'Location' : 'स्थान'}</p>
                <p className="text-slate-300">{location}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Calendar className="h-7 w-7 text-sky-400 mt-1" />
              <div>
                <p className="font-bold text-white text-lg">{language === 'en' ? 'Spiritual Home' : 'आत्मिक घर'}</p>
                <p className="text-slate-300">{language === 'en' ? 'All are welcome' : 'सबैलाई स्वागत छ'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
