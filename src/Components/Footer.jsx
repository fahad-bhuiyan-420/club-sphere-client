import React from 'react';
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                
                {/* Brand & Description */}
                <div className="text-center md:text-left space-y-3">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
                        ClubSphere<span className="text-indigo-600">.</span>
                    </h2>
                    <p className="max-w-sm text-slate-500 font-medium leading-relaxed text-sm">
                        An integrated ecosystem designed to bridge the gap between students, 
                        innovative clubs, and impactful community events.
                    </p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                        © {new Date().getFullYear()} ClubSphere Engineering.
                    </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-4">
                    {/* Facebook Link */}
                    <a 
                        href="https://www.facebook.com/fahadahmedakamantu" 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex items-center gap-3 bg-slate-50 hover:bg-indigo-600 px-6 py-3 rounded-2xl transition-all duration-300 shadow-sm"
                    >
                        <div className="bg-white p-2 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform">
                            <FaFacebookF size={18} />
                        </div>
                        <span className="font-black text-slate-700 group-hover:text-white text-sm">Facebook</span>
                    </a>

                    {/* Contact Link */}
                    <a 
                        href="tel:+88801717665101"
                        className="group flex items-center gap-3 bg-slate-50 hover:bg-slate-900 px-6 py-3 rounded-2xl transition-all duration-300 shadow-sm"
                    >
                        <div className="bg-white p-2 rounded-lg text-slate-900 group-hover:scale-110 transition-transform">
                            <FaPhoneAlt size={16} />
                        </div>
                        <span className="font-black text-slate-700 group-hover:text-white text-sm">Contact</span>
                    </a>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;