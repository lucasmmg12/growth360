import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[10px] font-black">G</div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Growth 360 Ecosystem</span>
                </div>

                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] italic">
                    Desarrollado integralmente por <span className="text-gray-900 font-extrabold not-italic">Grow Labs</span>
                </p>

                <div className="flex gap-8">
                    <a href="https://www.growlabs.lat" target="_blank" className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b-2 border-transparent hover:border-black transition-all pb-1">Grow Labs Latam</a>
                    <a href="#" className="text-[10px] font-black text-gray-300 uppercase tracking-widest cursor-not-allowed">Directorio 2025</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
