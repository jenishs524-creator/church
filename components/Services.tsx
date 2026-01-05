
import React from 'react';
import { Clock, Users, BookOpen, Heart, MapPin } from 'lucide-react';
import { Language } from '../App';

interface ServicesProps {
  language: Language;
  location: string;
  estDate: string;
}

const serviceTimes = [
  { 
    en: { day: "Saturdays", name: "Main Worship Service", time: "10:00 AM - 12:00 PM", desc: "Join us for vibrant worship and powerful teaching." },
    ne: { day: "शनिबार", name: "मुख्य आराधना संगति", time: "१०:०० - १२:०० बजे", desc: "आराधना र शक्तिशाली शिक्षाको लागि हामीसँग सामेल हुनुहोस्।" }
  },
  { 
    en: { day: "Wednesdays", name: "Prayer & Bible Study", time: "5:00 PM - 6:30 PM", desc: "Deep dive into scripture and collective intercession." },
    ne: { day: "बुधबार", name: "प्रार्थना र बाइबल अध्ययन", time: "५:०० - ६:३० बजे", desc: "वचनको गहिरो अध्ययन र सामूहिक मध्यस्थता।" }
  },
  { 
    en: { day: "Fridays", name: "Youth & Fellowship", time: "4:00 PM - 5:30 PM", desc: "Building the next generation in the fear of the Lord." },
    ne: { day: "शुक्रबार", name: "युवा र संगति", time: "४:०० - ५:३० बजे", desc: "प्रभुको डरमा अर्को पुस्ता निर्माण गर्दै।" }
  }
];

const ministries = [
  {
    en: { title: "Children's Ministry", desc: "Nurturing the spiritual growth of children through engaging lessons." },
    ne: { title: "बाल मन्त्रालय", desc: "आकर्षक पाठहरू मार्फत बालबालिकाको आत्मिक वृद्धिलाई प्रोत्साहन गर्दै।" },
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    en: { title: "Women's Fellowship", desc: "A place for sisters to grow in prayer, wisdom, and mutual support." },
    ne: { title: "महिला संगति", desc: "दिदीबहिनीहरूका लागि प्रार्थना, बुद्धि र पारस्परिक सहयोगमा बढ्ने ठाउँ।" },
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
  },
  {
    en: { title: "Outreach & Mission", desc: "Extending Christ's love to our community through active service." },
    ne: { title: "सुसमाचार र मिशन", desc: "सक्रिय सेवा मार्फत हाम्रो समुदायमा ख्रीष्टको प्रेम फैलाउँदै।" },
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop"
  }
];

const Services: React.FC<ServicesProps> = ({ language, location }) => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-6xl font-serif font-bold text-church-900 mb-6 tracking-tight">
                {language === 'en' ? 'Weekly Gatherings' : 'साप्ताहिक भेलाहरू'}
              </h2>
              <div className="flex items-start text-nepal-blue bg-blue-100/50 p-6 rounded-3xl border border-blue-200">
                <MapPin className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg">
                    {language === 'en' ? 'Our Location' : 'हाम्रो स्थान'}
                  </p>
                  <p className="text-slate-700">{location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {serviceTimes.map((service, idx) => {
              const data = language === 'en' ? service.en : service.ne;
              return (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border-b-8 border-nepal-red hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center mb-8 text-nepal-blue">
                    <Clock className="w-7 h-7 mr-3" />
                    <span className="font-bold text-xl uppercase tracking-widest">{data.day}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{data.name}</h3>
                  <p className="text-nepal-blue text-xl font-black mb-6">{data.time}</p>
                  <p className="text-slate-500 leading-relaxed font-light">{data.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-church-900 mb-6">
               {language === 'en' ? 'Our Spiritual Focus' : 'हाम्रो आत्मिक केन्द्रविन्दु'}
            </h2>
            <div className="w-20 h-1 bg-nepal-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {ministries.map((ministry, idx) => {
               const data = language === 'en' ? ministry.en : ministry.ne;
               return (
                <div key={idx} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100">
                  <div className="h-64 overflow-hidden relative bg-slate-200">
                     <img src={ministry.imageUrl} alt={data.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 opacity-90" />
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{data.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg font-light">{data.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
