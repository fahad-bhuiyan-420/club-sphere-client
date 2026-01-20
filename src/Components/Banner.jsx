import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useNavigate } from 'react-router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
    const navigate = useNavigate();

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070",
            title: "Discover Your Passion",
            subtitle: "Join the most vibrant student communities on campus.",
            primaryBtnText: "View Clubs",
            primaryPath: "/clubs"
        },
        {
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
            title: "Connect & Collaborate",
            subtitle: "Build lifelong friendships and professional networks.",
            primaryBtnText: "View Events",
            primaryPath: "/events"
        }
    ];

    return (
        <div className="relative h-[500px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl my-6">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                navigation={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>

                            <div className="relative h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl space-y-6">
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg text-slate-200 max-w-xl">{slide.subtitle}</p>
                                
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button 
                                        onClick={() => navigate(slide.primaryPath)}
                                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        {slide.primaryBtnText}
                                    </button>
                                    <button 
                                        onClick={() => navigate('/how-it-works')}
                                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all"
                                    >
                                        How it Works
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;