import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&auto=format&fit=crop",
    title1: "Travel &",
    title2: "Adventure",
    desc: "Sed convallis sit amet leo quis feugiat. Nunc interdum mollis facilisis. Donec id urna aliquet, suscipit turpis ut facilisis purus.",
    num: "01"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&auto=format&fit=crop",
    title1: "Move The",
    title2: "Earth",
    desc: "Sed convallis sit amet leo quis feugiat. Nunc interdum mollis facilisis. Donec id urna aliquet, suscipit turpis ut facilisis purus.",
    num: "02"
  },
  {
    id: 3,
    image: "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/06/Most-Beautiful-Places-in-the-World.jpg",
    title1: "Explore",
    title2: "Journey",
    desc: "Sed convallis sit amet leo quis feugiat. Nunc interdum mollis facilisis. Donec id urna aliquet, suscipit turpis ut facilisis purus.",
    num: "03"
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[75vh] lg:h-[85vh] w-full flex flex-col md:flex-row bg-[#3f4f56]">

      <div className="w-full md:w-1/2 h-full relative overflow-hidden">
        {slides.map((s, index) => (
          <img
            key={s.id}
            src={s.image}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/10 z-10" />
      </div>

      <div className="w-full md:w-1/2 h-full relative flex items-center justify-center p-8 lg:p-20 bg-[#01151c] overflow-hidden">

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="doodle" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M 50 50 Q 150 0 200 100 T 350 50" stroke="currentColor" strokeWidth="4" fill="none" />
              <circle cx="300" cy="200" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="100" cy="300" r="20" stroke="currentColor" strokeWidth="6" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#doodle)" />
          </svg>
        </div>

        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[15rem] font-bold text-white opacity-10 select-none pointer-events-none">
          {slide.num}
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-tight mb-6">
            <div className="text-[#fb5b52]">{slide.title1}</div>
            <div className="text-transparent" style={{ WebkitTextStroke: "2px #fb5b52" }}>
              {slide.title2}
            </div>
          </h1>

          <p className="text-gray-300 text-sm md:text-base mb-10">
            {slide.desc}
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/destinations')}
              className="bg-[#fb5b52] text-white px-8 py-3 font-semibold hover:bg-red-600 transition"
            >
              View Adventure
            </button>

            <button 
              onClick={() => navigate('/destinations')}
              className="border border-[#fb5b52] text-[#fb5b52] px-8 py-3 font-semibold hover:bg-[#fb5b52] hover:text-white transition"
            >
              Take A Tour
            </button>
          </div>
        </div>

        <div className="absolute bottom-20 md:bottom-24 right-12 flex gap-6 text-sm uppercase text-gray-400 z-40">
          <button onClick={handlePrev} className="hover:text-white transition">
            ← Prev
          </button>
          <button onClick={handleNext} className="hover:text-white transition">
            Next →
          </button>
        </div>

      </div>

    
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 transform translate-y-[1px] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none">
          <path 
            fill={theme.palette.mode === 'dark' ? '#0f172a' : '#fff1f0'} 
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,165.3C672,171,768,213,864,213.3C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

    
      <button 
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' })}
        className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center text-white cursor-pointer group"
        aria-label="Scroll down"
      >
        <div className="bg-[#fb5b52] shadow-xl shadow-[#fb5b52]/40 p-3 md:p-4 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
          <svg className="w-7 h-7 md:w-8 md:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>

    </section>
  );
}

export default Hero;
