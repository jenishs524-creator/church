
import React from 'react';
import { Calendar, MapPin, Info, GraduationCap, Globe, ShieldCheck, HeartHandshake } from 'lucide-react';
import { LeadershipMember } from '../types';
import { Language } from '../App';

interface AboutProps {
  language: Language;
  estDate?: string;
  location?: string;
}

const leaders: LeadershipMember[] = [
  {
    name: "Mosha Tamang",
    role: "Pastor",
    roleNe: "पास्टर",
    bio: "Pastor Mosha Tamang leads with a deep commitment to biblical truth and pastoral care, guiding Utsaha Jagrity Mandali in its mission to serve the body of Christ in Kathmandu.",
    bioNe: "पास्टर मोसा तामाङ बाइबलीय सत्य र गोठालो हेरचाहप्रति गहिरो प्रतिबद्धताका साथ नेतृत्व गर्नुहुन्छ, काठमाडौंमा ख्रीष्टको शरीरको सेवा गर्ने आफ्नो उद्देश्यमा उत्साह जागृति मण्डलीलाई मार्गदर्शन गर्नुहुन्छ।",
    imageUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  },
  {
    name: "Kabita Bulun",
    role: "Pasterni",
    roleNe: "पास्टरनी",
    bio: "Pasterni Kabita Bulun provides spiritual mentorship and compassionate support to the women and families of the congregation, fostering a spirit of unity and grace.",
    bioNe: "पास्टरनी कबिता बुलुनले मण्डलीका महिला र परिवारहरूलाई आत्मिक मार्गदर्शन र दयालु सहयोग प्रदान गर्नुहुन्छ, एकता र अनुग्रहको भावनालाई बढावा दिनुहुन्छ।",
    imageUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  }
];

const About: React.FC<AboutProps> = ({ 
  language, 
  estDate = "15/06/2012", 
  location = "Gokarneshwor Banquet, Kathmandu" 
}) => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
             <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full text-slate-600 text-xs font-bold uppercase tracking-widest">
                < ShieldCheck size={16} />
                <span>{language === 'en' ? 'Our Mission' : 'हाम्रो उद्देश्य'}</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-serif font-bold text-church-900 leading-tight">
               {language === 'en' ? 'Rooted in Faith, Serving in Love' : 'विश्वासमा जडित, प्रेममा सेवारत'}
             </h2>
             <p className="text-xl text-slate-600 leading-relaxed font-light">
               {language === 'en' 
                 ? `Utsaha Jagrity Mandali is a vibrant Christian fellowship located at ${location}. Our ministry is dedicated to the exaltation of God through worship, the edification of saints through discipleship, and the evangelization of the world through the Gospel of Jesus Christ.` 
                 : `उत्साह जागृति मण्डली ${location} मा अवस्थित एक जीवन्त ईसाई संगति हो। हाम्रो मन्त्रालय आराधनाको माध्यमबाट परमेश्वरको महिमा, चेलापनको माध्यमबाट विश्वासीहरूको उन्नति, र येशू ख्रीष्टको सुसमाचारको माध्यमबाट संसारको मुक्तिमा समर्पित छ।`}
             </p>
             <p className="text-lg text-slate-500 font-light leading-relaxed">
               {language === 'en'
                 ? "Since our inception, we have strived to build a community where individuals can find spiritual restoration and practical guidance rooted in the Holy Scriptures. We believe in the transformative power of God's Word to change lives and impact generations for eternity."
                 : "हाम्रो स्थापनाकालदेखि नै हामीले एउटा यस्तो समुदाय निर्माण गर्ने प्रयास गरेका छौं जहाँ व्यक्तिहरूले पवित्र शास्त्रमा आधारित आत्मिक पुर्नस्थापना र व्यावहारिक मार्गदर्शन पाउन सक्छन्। हामी विश्वास गर्छौं कि परमेश्वरको वचनमा जीवन परिवर्तन गर्ने र पुस्ताहरूलाई अनन्तसम्म प्रभाव पार्ने शक्ति छ।"}
             </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-church-50 rounded-full blur-[100px] -z-10"></div>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                  <Globe className="text-nepal-blue w-12 h-12 mb-4" />
                  <h4 className="font-bold text-church-900">{language === 'en' ? 'Global Vision' : 'विश्वव्यापी दर्शन'}</h4>
               </div>
               <div className="bg-church-900 p-8 rounded-[3rem] text-white shadow-xl flex flex-col items-center text-center translate-y-8">
                  <HeartHandshake className="text-sky-400 w-12 h-12 mb-4" />
                  <h4 className="font-bold">{language === 'en' ? 'Local Service' : 'स्थानीय सेवा'}</h4>
               </div>
            </div>
          </div>
        </div>

        <div id="church-details" className="mb-32">
          <div className="bg-church-900 text-white rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-10">
                  <Info className="text-sky-400 w-10 h-10" />
                  <h3 className="text-3xl font-serif font-bold uppercase tracking-wider">
                    {language === 'en' ? 'Ministry Profile' : 'मन्त्रालयको विवरण'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="flex items-start space-x-5">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <MapPin className="text-sky-300 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-sky-400 uppercase tracking-widest">{language === 'en' ? 'Location' : 'स्थान'}</h4>
                        <p className="text-white text-md">{location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-5">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <Calendar className="text-sky-300 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-sky-400 uppercase tracking-widest">{language === 'en' ? 'Established' : 'स्थापना'}</h4>
                        <p className="text-white text-xl font-bold">{estDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start space-x-5">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <GraduationCap className="text-sky-300 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-sky-400 uppercase tracking-widest">{language === 'en' ? 'Training' : 'तालिम'}</h4>
                        <p className="text-white text-md font-medium">
                          {language === 'en' ? 'Theological Studies' : 'ईश्वरीय अध्ययन'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-5">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <Globe className="text-sky-300 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-sky-400 uppercase tracking-widest">{language === 'en' ? 'Community' : 'समुदाय'}</h4>
                        <p className="text-white text-md">Gokarneshwor Fellowship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-full min-h-[400px] relative bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <ShieldCheck className="w-64 h-64 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-church-900 via-transparent to-transparent lg:block hidden"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-church-900 mb-4">
              {language === 'en' ? 'Leadership' : 'नेतृत्व'}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic font-light">
               {language === 'en' ? 'Dedicated to shepherd the flock with integrity and love.' : 'निष्ठा र प्रेमका साथ झुण्डको गोठालो गर्न समर्पित।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {leaders.map((leader, index) => (
              <div key={index} className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-10 hover:shadow-2xl transition-all">
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-50 shadow-inner bg-slate-200">
                   <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover opacity-0" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-2xl font-bold text-slate-900 mb-1">{leader.name}</h4>
                  <p className="text-nepal-red font-bold uppercase tracking-widest text-xs mb-4">{language === 'en' ? leader.role : leader.roleNe}</p>
                  <p className="text-slate-500 leading-relaxed font-light">{language === 'en' ? leader.bio : leader.bioNe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
