import React from 'react';
import {
    Zap,
    Target,
    TrendingUp,
    Search,
    BarChart2,
    Rocket,
    ShieldCheck,
    ArrowRight,
    BrainCircuit,
    Layers,
    Activity,
    Lock
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MethodologyTab = () => {
    const growthComparisonData = {
        labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
        datasets: [
            {
                label: 'Gestión con Growth360 (Data-Driven)',
                data: [100, 150, 280, 500, 850, 1400],
                borderColor: '#0f172a',
                backgroundColor: 'rgba(15, 23, 42, 0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 6,
                pointBackgroundColor: '#0f172a',
            },
            {
                label: 'Gestión Tradicional (Intuición)',
                data: [100, 110, 130, 140, 160, 165],
                borderColor: '#cbd5e1',
                borderDash: [5, 5],
                fill: false,
                tension: 0.2,
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#0f172a',
                bodyColor: '#64748b',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                displayColors: false
            }
        },
        scales: {
            y: {
                display: false,
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Montserrat',
                        weight: 'bold',
                        size: 10
                    },
                    color: '#94a3b8'
                }
            }
        }
    };

    return (
        <div className="space-y-20 animate-in fade-in duration-700 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gray-900 rounded-[2.5rem] lg:rounded-[4rem] p-8 lg:p-24 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl space-y-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase italic border border-white/10">
                        The Growth Framework
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black tracking-tighter italic leading-[0.9]">
                        Información <br />
                        <span className="text-gray-500 not-italic font-light tracking-normal">como activo de guerra.</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl italic">
                        No somos un software de gestión contable. Somos el motor de inteligencia que transforma datos brutos en decisiones ejecutivas de alto impacto.
                    </p>
                </div>
            </section>

            {/* The Growth Gap Chart */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">La Brecha de Crecimiento</h3>
                        <div className="w-20 h-1.5 bg-gray-900 rounded-full"></div>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm lg:text-base">
                        Las empresas que operan "a ciegas" basándose en el saldo bancario del día suelen estancarse en una meseta operativa.
                        <strong> Growth360</strong> permite identificar picos de demanda, ineficiencias en el gasto y oportunidades de mercado antes que la competencia.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg"><TrendingUp size={20} /></div>
                            <div>
                                <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Escalabilidad Exponencial</h4>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">La data permite reinvertir con precisión quirúrgica.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 p-6 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 opacity-60">
                            <div className="p-3 bg-gray-300 text-white rounded-xl"><Activity size={20} /></div>
                            <div>
                                <h4 className="font-black text-gray-400 uppercase text-xs tracking-widest mb-1">Estancamiento Tradicional</h4>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Decisiones reactivas basadas en urgencias, no en estrategia.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] border border-gray-200 shadow-xl h-[350px] lg:h-[500px] flex flex-col relative overflow-hidden group">
                    <div className="absolute top-8 left-12">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em] italic mb-2 block">Comparativa de Rendimiento</span>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-[9px]">Growth360 Partner</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-[9px]">Gestión Común</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex-grow">
                        <Line data={growthComparisonData} options={chartOptions} />
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">Proyección basada en optimización de ROAS y reducción de ineficiencias del 18%.</p>
                    </div>
                </div>
            </section>

            {/* Process Flow - 4 Pillars */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h3 className="text-xs font-black text-gray-500 tracking-[0.6em] uppercase italic">El Ecosistema Growth360</h3>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Arquitectura de Decisión</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        {
                            step: '01',
                            title: 'Captura Rigurosa',
                            desc: 'Sincronización diaria de ingresos y egresos categorizados.',
                            icon: <Layers size={24} />,
                            color: 'bg-gray-50'
                        },
                        {
                            step: '02',
                            title: 'Inteligencia Competitiva',
                            desc: 'Scraping avanzado de competidores y análisis de anuncios.',
                            icon: <Search size={24} />,
                            color: 'bg-gray-100'
                        },
                        {
                            step: '03',
                            title: 'Diagnostico Core',
                            desc: 'Cálculo de márgenes reales descontando costos variables y fijos.',
                            icon: <BarChart2 size={24} />,
                            color: 'bg-gray-200'
                        },
                        {
                            step: '04',
                            title: 'Escalabilidad',
                            desc: 'Identificación de brechas de mercado para expansión territorial.',
                            icon: <Rocket size={24} />,
                            color: 'bg-gray-900 text-white'
                        },
                    ].map((item, i) => (
                        <div key={i} className={`${item.color} p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] space-y-8 flex flex-col relative group transition-transform hover:-translate-y-2 duration-300 shadow-sm border border-gray-100`}>
                            <span className="text-4xl font-black opacity-10 italic absolute top-8 right-10">{item.step}</span>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${i === 3 ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                                {item.icon}
                            </div>
                            <div className="space-y-3">
                                <h4 className={`text-sm font-black uppercase tracking-tight ${i === 3 ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                                <p className={`text-[11px] font-bold leading-relaxed tracking-tighter italic ${i === 3 ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Strategic Advantages Cards */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[4rem] border border-gray-200 shadow-xl space-y-12">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Ventajas Comparativas</h3>
                        <ShieldCheck size={32} className="text-gray-900" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-3 font-black text-gray-900 text-xs uppercase tracking-widest decoration-gray-200 underline underline-offset-8">
                                <BrainCircuit size={18} /> Claridad Absoluta
                            </h4>
                            <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">Elimina el "creo que ganamos dinero". Sabrás exactamente cuánto dinero neto queda después de cada operación.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-3 font-black text-gray-900 text-xs uppercase tracking-widest decoration-gray-200 underline underline-offset-8">
                                <Target size={18} /> Sniper Marketing
                            </h4>
                            <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">Analizamos dónde invierte tu competencia para que tú inviertas donde ellos NO están, maximizando el ROAS.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-3 font-black text-gray-900 text-xs uppercase tracking-widest decoration-gray-200 underline underline-offset-8">
                                <Lock size={18} /> Control de Fugitividad
                            </h4>
                            <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">Detecta aumentos anómalos en costos fijos o gastos operativos antes de que comprometan la caja.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-3 font-black text-gray-900 text-xs uppercase tracking-widest decoration-gray-200 underline underline-offset-8">
                                <Rocket size={18} /> Roadmap de Escala
                            </h4>
                            <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">Transformamos tu negocio en un sistema predecible y replicable listo para la expansión.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-16 rounded-[4rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                    <div className="space-y-8 relative z-10">
                        <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                        <h3 className="text-4xl font-black tracking-tighter italic">¿Cómo escalar <br /><span className="text-gray-500">con nosotros?</span></h3>
                        <p className="text-gray-400 text-[13px] font-medium leading-relaxed italic border-l-2 border-white/20 pl-6">
                            "La diferencia entre un autoempleo y una verdadera empresa es la calidad de los reportes de los que dispones para delegar operaciones."
                        </p>
                    </div>

                    <div className="space-y-6 pt-12 relative z-10">
                        <button className="w-full py-6 bg-white text-gray-900 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-gray-100 transition-all shadow-xl group">
                            Siguiente Nivel <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <p className="text-[9px] text-gray-500 font-black text-center uppercase tracking-widest">Growth360 Executive Ecosystem v4.2</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MethodologyTab;
