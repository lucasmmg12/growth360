import React from 'react';

const Footer = () => {
    return (
        <footer className="py-16 border-t border-gray-100 bg-white/60 backdrop-blur-xl relative z-10">
            <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white text-[11px] font-black shadow-lg shadow-gray-900/10">G</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Growth<span className="text-gray-900">360</span> Ecosystem</span>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">
                    Desarrollado integralmente por <span className="text-gray-900 font-black not-italic border-b border-gray-900/20 pb-0.5">Grow Labs</span>
                </p>

                <div className="flex gap-10 items-center">
                    <a href="https://www.growlabs.lat" target="_blank" className="text-[10px] font-black text-gray-900 uppercase tracking-widest hover:text-gray-600 transition-all">Grow Labs Latam</a>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest cursor-default">Directorio 2025</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
