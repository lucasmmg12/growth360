import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Zap, Target, Bot, BarChart3, Globe, ChevronRight, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';



const Login = ({ startDemo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Credenciales inválidas. Por favor intente nuevamente.");
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col font-montserrat text-gray-900 overflow-y-auto overflow-x-hidden relative">

            {/* Structural background elements - Hidden on mobile for cleaner look */}
            <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full bg-white skew-x-[-12deg] translate-x-[20%] z-0 border-l border-gray-200 shadow-[0_0_80px_rgba(0,0,0,0.02)]"></div>

            <div className="flex-grow flex items-center justify-center p-6 lg:p-20 z-10 w-full">
                <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-center">

                    {/* Left: Brand Context */}
                    <div className="space-y-10 lg:space-y-16 animate-in fade-in slide-in-from-left duration-1000 text-center lg:text-left">
                        <div className="space-y-6 lg:space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900 rounded-2xl text-[10px] font-black tracking-[0.3em] text-white uppercase italic shadow-2xl">
                                Growth 360 • System Core
                            </div>
                            <h1 className="text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter text-gray-900 leading-[0.95] italic">
                                Operación <br />
                                <span className="text-gray-500 not-italic font-light tracking-normal">Inteligente.</span>
                            </h1>
                            <p className="text-gray-500 text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                                Plataforma de alta dirección para el monitoreo de métricas críticas y market intelligence en tiempo real.
                            </p>
                        </div>

                        <div className="pt-2 lg:pt-6">
                            <a href="https://www.growlabs.lat" target="_blank" className="text-[11px] lg:text-[12px] font-black text-gray-900 flex items-center justify-center lg:justify-start gap-3 group tracking-widest uppercase">
                                Conoce el ecosistema Grow Labs <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Right: Security Entrance */}
                    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
                        <div className="relative bg-white p-8 lg:p-16 rounded-[3rem] lg:rounded-[4.5rem] border border-gray-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
                            <div className="mb-10 lg:mb-14 text-center lg:text-left">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter italic">Auth <span className="text-gray-500 font-light not-italic tracking-normal">Portal</span></h3>
                                <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-[9px] lg:text-[10px] mt-4 pl-1">Identificación corporativa requerida</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-8 lg:space-y-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] lg:text-[11px] font-black text-gray-900 uppercase tracking-widest ml-4">Email Empresarial</label>
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 border-none rounded-[1.8rem] lg:rounded-[2rem] py-5 lg:py-6 pl-16 pr-8 focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all font-black text-sm lg:text-base outline-none shadow-inner"
                                            placeholder="socio@entidad.com"
                                            required
                                        />
                                    </div>
                                    <p className="hidden sm:flex text-[8px] lg:text-[9px] text-gray-600 font-bold uppercase tracking-widest ml-6 items-center gap-2">
                                        <HelpCircle size={10} className="text-gray-400" /> Ingrese su correo institucional para validar su identidad.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] lg:text-[11px] font-black text-gray-900 uppercase tracking-widest ml-4">Clave Privada</label>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border-none rounded-[1.8rem] lg:rounded-[2rem] py-5 lg:py-6 pl-16 pr-8 focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all font-black text-sm lg:text-base outline-none shadow-inner"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <p className="hidden sm:flex text-[8px] lg:text-[9px] text-gray-600 font-bold uppercase tracking-widest ml-6 items-center gap-2">
                                        <HelpCircle size={10} className="text-gray-400" /> Su clave está encriptada mediante protocolos de seguridad AES-256.
                                    </p>
                                </div>

                                {error && <div className="p-5 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-center">{error}</div>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full button-primary py-6 lg:py-7 rounded-[2.2rem] lg:rounded-[2.5rem] font-black text-[12px] lg:text-[13px] uppercase tracking-[0.3em] lg:tracking-[0.4em] flex items-center justify-center gap-4 group shadow-2xl"
                                >
                                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-12 lg:mt-16 pt-10 lg:pt-12 border-t border-gray-100">
                                <p className="text-[9px] lg:text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] lg:tracking-[0.5em] text-center mb-8 lg:mb-10 italic font-bold">Sandbox de pruebas (Acceso Demo)</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => startDemo('admin')}
                                            className="w-full py-5 bg-gray-50 hover:bg-gray-100 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-gray-500 transition-all border border-transparent hover:border-gray-200"
                                        >
                                            Demo <span className="text-gray-950 underline decoration-gray-200 decoration-4 underline-offset-4">Admin</span>
                                        </button>
                                        <p className="text-[8px] text-center text-gray-500 font-bold uppercase tracking-tighter">Gestión de socios y plataforma</p>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => startDemo('client')}
                                            className="w-full py-5 bg-gray-50 hover:bg-gray-100 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-gray-500 transition-all border border-transparent hover:border-gray-200"
                                        >
                                            Demo <span className="text-gray-950 underline decoration-gray-200 decoration-4 underline-offset-4">Partner 360</span>
                                        </button>
                                        <p className="text-[8px] text-center text-gray-500 font-bold uppercase tracking-tighter">Visión ejecutiva del negocio</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Login;
