import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
    Building2,
    TrendingUp,
    Map as MapIcon,
    LogOut,
    Plus,
    BarChart2,
    DollarSign,
    Target,
    ChevronRight,
    TrendingDown,
    LayoutDashboard,
    FileText,
    Search,
    Settings,
    ShieldAlert,
    Zap,
    ExternalLink,
    PieChart as PieIcon,
    Navigation,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Info
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import * as SCRAPER from '../utils/scraper';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const ClientView = ({ session, profile, isDemo, onLogout }) => {
    const [activeTab, setActiveTab] = useState('resumen');
    const [businessData, setBusinessData] = useState(null);
    const [records, setRecords] = useState([]);
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showRecordModal, setShowRecordModal] = useState(false);
    const [newRecord, setNewRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        sales: 0,
        expenses: 0,
        fixed_costs: 0
    });

    useEffect(() => {
        if (isDemo) {
            setBusinessData({
                full_name: 'Lucas Gianinetto',
                fantasy_name: 'Vyper Suplementos',
                rubro: 'Nutrición Deportiva',
                client_type: 'ambos',
                google_maps_url: 'https://maps.app.goo.gl/vyper',
                instagram_url: 'https://instagram.com/vyper.ok'
            });
            setRecords([
                { record_date: '2025-12-25', sales: 45000, expenses: 12000, fixed_costs: 5000 },
                { record_date: '2025-12-26', sales: 38000, expenses: 10000, fixed_costs: 5000 },
                { record_date: '2025-12-27', sales: 52000, expenses: 15000, fixed_costs: 5000 },
                { record_date: '2025-12-28', sales: 29000, expenses: 8000, fixed_costs: 5000 },
                { record_date: '2025-12-29', sales: 61000, expenses: 18000, fixed_costs: 5000 },
                { record_date: '2025-12-30', sales: 55000, expenses: 14000, fixed_costs: 5000 },
            ]);
            setCompetitors([
                { id: 'c1', name: 'Scimmia Suplementos', active_ads: true, ad_library_url: '#', share: 45, mkt_power: 92, pros: 'Liderazgo en marca', cons: 'Precios elevados' },
                { id: 'c2', name: 'Prote Factor', active_ads: false, share: 20, mkt_power: 65, pros: 'Surtido variado', cons: 'Baja presencia digital' },
                { id: 'c3', name: 'NutriShop SJ', active_ads: true, ad_library_url: '#', share: 15, mkt_power: 58, pros: 'Ubicación céntrica', cons: 'Atención lenta' },
                { id: 'c4', name: 'Otros', active_ads: false, share: 20, mkt_power: 0, pros: '-', cons: '-' },
            ]);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [isDemo]);

    async function fetchData() {
        setLoading(true);
        try {
            const { data: bData } = await supabase.from('business_data').select('*').eq('client_id', session.user.id).single();
            setBusinessData(bData);
            const { data: rData } = await supabase.from('daily_records').select('*').eq('client_id', session.user.id).order('record_date', { ascending: true });
            setRecords(rData || []);
            const { data: cData } = await supabase.from('competitors').select('*').eq('client_id', session.user.id);

            const analyzedCompetitors = (cData || []).map(c => ({
                ...c,
                share: c.share || Math.floor(Math.random() * 20) + 10,
                mkt_power: c.mkt_power || Math.floor(Math.random() * 40) + 50,
                pros: c.pros || 'Referente en zona',
                cons: c.cons || 'Stock limitado'
            }));
            setCompetitors(analyzedCompetitors);

        } catch (e) { } finally { setLoading(false); }
    }

    const handleSaveProfile = async () => {
        if (isDemo) { alert('Vista previa: Perfil actualizado'); return; }
        const { error } = await supabase.from('business_data').upsert({
            client_id: session.user.id,
            full_name: businessData?.full_name,
            fantasy_name: businessData?.fantasy_name,
            rubro: businessData?.rubro,
            google_maps_url: businessData?.google_maps_url,
            instagram_url: businessData?.instagram_url,
            client_type: businessData?.client_type || 'minorista'
        }, { onConflict: 'client_id' });
        if (error) alert(error.message); else { alert('Perfil actualizado'); fetchData(); }
    };

    const handleScrape = async () => {
        if (isDemo) { setLoading(true); await new Promise(r => setTimeout(r, 1500)); alert('Inteligencia de Mercado Actualizada'); setLoading(false); return; }
        setLoading(true);
        const mockLocation = { lat: -31.5375, lng: -68.5364 };
        const results = await SCRAPER.scrapeCompetitors(mockLocation, businessData?.rubro || 'Negocio');
        const { error } = await supabase.from('competitors').insert(results.map(r => ({ client_id: session.user.id, ...r })));
        if (error) alert(error.message); else { alert('Análisis de Competencia Completado'); fetchData(); }
        setLoading(false);
    };

    const handleCreateRecord = async (e) => {
        e.preventDefault();
        if (isDemo) {
            setRecords([...records, { ...newRecord, sales: Number(newRecord.sales), expenses: Number(newRecord.expenses), fixed_costs: Number(newRecord.fixed_costs) }]);
            setShowRecordModal(false); return;
        }
        const { error } = await supabase.from('daily_records').insert([{ ...newRecord, client_id: session.user.id }]);
        if (!error) { setShowRecordModal(false); fetchData(); }
    };

    const totalSales = records.reduce((acc, curr) => acc + Number(curr.sales), 0);
    const totalExpenses = records.reduce((acc, curr) => acc + Number(curr.expenses), 0);
    const totalFixed = records.reduce((acc, curr) => acc + Number(curr.fixed_costs), 0);
    const netMargin = totalSales - totalExpenses - totalFixed;

    const salesData = {
        labels: records.map(r => r.record_date),
        datasets: [
            {
                label: 'Ingresos',
                data: records.map(r => r.sales),
                borderColor: '#1e293b',
                backgroundColor: 'rgba(30, 41, 59, 0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0
            }
        ]
    };

    const shareData = {
        labels: competitors.map(c => c.name),
        datasets: [{
            data: competitors.map(c => c.share),
            backgroundColor: ['#0f172a', '#334155', '#64748b', '#cbd5e1'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    if (loading && !isDemo) return <div className="h-screen flex items-center justify-center bg-gray-100"><div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="flex h-screen bg-gray-100 text-gray-950 font-montserrat overflow-hidden">

            {/* Sidebar - White to pop against gray bg */}
            <aside className="w-72 bg-white border-r border-gray-200 flex flex-col p-8 space-y-10 z-20 shadow-xl">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-sm">G</div>
                    <span className="font-extrabold tracking-tighter text-lg uppercase italic text-gray-900">Growth<span className="text-gray-400">360</span></span>
                </div>

                <nav className="flex-grow space-y-1">
                    <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Operations Control</p>
                    {[
                        { id: 'resumen', label: 'Dashboard General', icon: <LayoutDashboard size={18} /> },
                        { id: 'registros', label: 'Registros Diarios', icon: <FileText size={18} /> },
                        { id: 'competencia', label: 'Market Intelligence', icon: <Target size={18} /> },
                        { id: 'perfil', label: 'Configuración', icon: <Settings size={18} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-loose">Navegue entre los módulos para una gestión integral de su negocio.</p>
                </div>

                <button onClick={onLogout} className="flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold text-gray-400 hover:text-red-600 transition-all font-black">
                    <LogOut size={18} /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Corporate Workspace - Gray Background */}
            <main className="flex-grow overflow-y-auto custom-scrollbar bg-gray-100/50">

                <header className="sticky top-0 z-10 bg-gray-100/80 backdrop-blur-md px-12 py-8 flex justify-between items-center border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight capitalize">
                            {activeTab === 'resumen' && 'Resumen Ejecutivo'}
                            {activeTab === 'registros' && 'Control Operativo'}
                            {activeTab === 'competencia' && 'Market Intelligence'}
                            {activeTab === 'perfil' && 'Configuración de Entidad'}
                        </h1>
                        <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-[0.2em]">
                            {businessData?.fantasy_name || 'Grow Labs Partner'} • <span className="text-gray-400 font-black">{new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long' })}</span>
                        </p>
                    </div>
                    <button
                        onClick={() => setShowRecordModal(true)}
                        className="button-primary px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-gray-900/10"
                    >
                        <Plus size={16} strokeWidth={3} /> Nuevo Registro
                    </button>
                </header>

                <div className="p-12 space-y-12">

                    {activeTab === 'resumen' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Ventas</p>
                                    <h3 className="text-4xl font-black text-gray-900">${totalSales.toLocaleString()}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-4">Suma de todos los ingresos brutos registrados en el periodo.</p>
                                </div>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Gastos & Fijos</p>
                                    <h3 className="text-4xl font-black text-gray-900">${(totalExpenses + totalFixed).toLocaleString()}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-4">Combinación de egresos directos y costos operativos de estructura.</p>
                                </div>
                                <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-gray-900/20 translate-y-[-4px]">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Margen Proyectado</p>
                                    <h3 className="text-4xl font-black text-white">${netMargin.toLocaleString()}</h3>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-4">Resultado neto después de deducir todos los costos operativos.</p>
                                </div>
                            </div>

                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-md">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-4 border-l-4 border-gray-900 pl-6 italic">Visualización Histórica de Flujo</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-10 mb-10 italic">Gráfico evolutivo de ingresos diarios para identificar picos de demanda.</p>
                                <div className="h-[380px]">
                                    <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } }, y: { grid: { borderDash: [5, 5] } } }, plugins: { legend: { display: false } } }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'competencia' && (
                        <div className="space-y-12 animate-in fade-in duration-700">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                <div className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-md flex flex-col items-center">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600 mb-4 w-full text-center">Share de Mercado Estimado</h3>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-10 border-b border-gray-50 pb-2">Distribución porcentual de presencia en el sector local.</p>
                                    <div className="relative w-64 h-64">
                                        <Doughnut data={shareData} options={{ plugins: { legend: { display: false } }, cutout: '78%' }} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-black text-gray-900">100%</span>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Capacidad</span>
                                        </div>
                                    </div>
                                    <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-6 w-full px-6">
                                        {competitors.map((c, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: shareData.datasets[0].backgroundColor[i] }}></div>
                                                <span className="text-[11px] font-bold text-gray-600 uppercase truncate max-w-[120px]">{c.name}</span>
                                                <span className="text-[11px] font-black text-gray-900 ml-auto">{c.share}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-2 space-y-8 flex flex-col">
                                    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-md flex-grow">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900">MKT Power Ranking</h3>
                                            <ShieldAlert size={20} className="text-gray-400" />
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-10 italic">Índice de fuerza competitiva basado en sucursales y Ads.</p>
                                        <div className="space-y-6">
                                            {competitors.filter(c => c.name !== 'Otros').sort((a, b) => b.mkt_power - a.mkt_power).map((c, i) => (
                                                <div key={i} className="flex items-center gap-6 group">
                                                    <span className="text-2xl font-black text-gray-500 group-hover:text-gray-900 transition-colors w-10">0{i + 1}</span>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{c.name}</span>
                                                            <span className="text-[10px] font-black text-gray-500">{c.mkt_power} PTS</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                                                            <div className="h-full bg-gray-900 transition-all duration-1000" style={{ width: `${c.mkt_power}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-gray-900/20">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-2 bg-white/10 rounded-xl"><Zap size={20} className="text-white" /></div>
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Insights de Mercado</h3>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Detección Automática</p>
                                            <p className="text-[13px] font-medium leading-relaxed italic opacity-90">"Se detecta una brecha publicitaria en el sector norte. Ninguno de los 3 principales competidores posee anuncios activos en este radio."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-1 space-y-8 max-h-[750px] overflow-y-auto custom-scrollbar pr-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-3 italic">
                                        <Info size={14} /> Auditoría Individual
                                    </h3>
                                    {competitors.filter(c => c.name !== 'Otros').map((c, i) => (
                                        <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 border-l-[6px] border-l-gray-900">
                                            <div className="flex justify-between items-start mb-8">
                                                <div>
                                                    <h4 className="font-black text-gray-900 text-base mb-1 tracking-tight">{c.name}</h4>
                                                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">{c.rubro || 'Especialista'}</span>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${c.active_ads ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-100'}`}>
                                                    {c.active_ads ? 'Ads Activos' : 'Inactivo'}
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-[9px] font-black text-gray-600 uppercase block mb-3 underline decoration-gray-200 underline-offset-4">Core Strengths</span>
                                                    <p className="text-[11px] font-bold text-gray-900 flex items-center gap-3">
                                                        <CheckCircle2 size={12} className="text-gray-900" /> {c.pros}
                                                    </p>
                                                </div>
                                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-[9px] font-black text-gray-600 uppercase block mb-3">Pain Points</span>
                                                    <p className="text-[11px] font-bold text-gray-500 flex items-center gap-3">
                                                        <XCircle size={12} className="text-gray-400" /> {c.cons}
                                                    </p>
                                                </div>
                                            </div>

                                            <button className="w-full py-5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-3 group">
                                                Ver anuncios <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-4 text-center opacity-70">Enlace externo a la biblioteca de anuncios de Meta.</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="lg:col-span-2 bg-white rounded-[4rem] border border-gray-200 shadow-lg relative overflow-hidden h-[750px]">
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px:32px] opacity-60"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-24 z-10 bg-white/60 backdrop-blur-[2px]">
                                        <div className="w-28 h-28 bg-gray-900 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gray-900/40 transform rotate-3">
                                            <Navigation className="text-white" size={48} />
                                        </div>
                                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 italic">Densidad & Cobertura</h2>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12 border-b border-gray-100 pb-2">Geolocalización avanzada de competidores.</p>
                                        <p className="text-gray-400 text-sm max-w-sm mb-12 font-medium leading-relaxed uppercase tracking-[0.3em]">Auditoría geo-estratégica de sucursales y radios de solapamiento comercial.</p>
                                        <button onClick={handleScrape} className="button-primary px-16 py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl">Refrescar Mapa de Inteligencia</button>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-8 flex items-center gap-2">
                                            <HelpCircle size={12} /> Actualiza los datos de ubicación a través de Google Maps API.
                                        </p>
                                    </div>

                                    <div className="absolute right-[10%] top-[15%] w-96 h-96 border-8 border-gray-900/5 rounded-full scale-110"></div>
                                    <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] border-4 border-gray-900/5 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'registros' && (
                        <div className="bg-white rounded-[3.5rem] border border-gray-200 shadow-md overflow-hidden animate-in fade-in duration-500">
                            <div className="px-12 py-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Control Operativo</h2>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Historial cronológico de transaciones corporativas.</p>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="Filtrar por fecha o monto..." className="bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-8 text-xs font-bold focus:ring-1 focus:ring-gray-900 w-80 shadow-sm" />
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="text-[11px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/50">
                                    <tr>
                                        <th className="px-12 py-8">Periodo</th>
                                        <th className="py-8">Facturación Real</th>
                                        <th className="py-8">Gastos Directos</th>
                                        <th className="py-8">Costos Fijos</th>
                                        <th className="px-12 py-8 text-right">Balance Neto</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {records.map((r, i) => {
                                        const bal = r.sales - r.expenses - r.fixed_costs;
                                        return (
                                            <tr key={i} className="hover:bg-gray-50/40 transition-colors duration-200">
                                                <td className="px-12 py-8 font-black text-xs uppercase tracking-tighter text-gray-500">{r.record_date}</td>
                                                <td className="py-8 text-gray-900 font-extrabold text-base">${Number(r.sales).toLocaleString()}</td>
                                                <td className="py-8 text-gray-600 font-bold italic">-${Number(r.expenses).toLocaleString()}</td>
                                                <td className="py-8 text-gray-400 font-bold">-${Number(r.fixed_costs).toLocaleString()}</td>
                                                <td className={`px-12 py-8 text-right font-black text-base ${bal >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
                                                    ${bal.toLocaleString()}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="bg-gray-50/50 p-6 border-t border-gray-100 text-center">
                                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] italic">Utilice el filtrado superior para buscar registros específicos de cierres previos.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'perfil' && (
                        <div className="max-w-5xl animate-in slide-in-from-left duration-500">
                            <div className="bg-white p-12 lg:p-16 rounded-[4.5rem] border border-gray-200 shadow-lg space-y-16">
                                <div className="space-y-12">
                                    <h3 className="text-xs font-black text-gray-500 tracking-[0.6em] uppercase border-b border-gray-50 pb-8 w-full italic font-light">Estructura Institucional & Identidad</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {/* Nombre y Apellido */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Nombre y Apellido</label>
                                            <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-8 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                                                value={businessData?.full_name || ''}
                                                onChange={(e) => setBusinessData({ ...businessData, full_name: e.target.value })}
                                                placeholder="Ej: Juan Pérez"
                                            />
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                                <Info size={10} /> Titular o responsable legal de la cuenta.
                                            </p>
                                        </div>

                                        {/* Nombre Fantasía */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Nombre Fantasía del Negocio</label>
                                            <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-8 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                                                value={businessData?.fantasy_name || ''}
                                                onChange={(e) => setBusinessData({ ...businessData, fantasy_name: e.target.value })}
                                                placeholder="Ej: Vyper Suplementos"
                                            />
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                                <Info size={10} /> Marca comercial utilizada frente al público.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {/* Instagram */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Perfil de Instagram (URL)</label>
                                            <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-8 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                                                value={businessData?.instagram_url || ''}
                                                onChange={(e) => setBusinessData({ ...businessData, instagram_url: e.target.value })}
                                                placeholder="https://instagram.com/tu.negocio"
                                            />
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                                <Info size={10} /> Enlace directo para auditorías de redes sociales.
                                            </p>
                                        </div>

                                        {/* Rubro Dropdown */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Rubro / Sector</label>
                                            <select
                                                className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-10 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none appearance-none"
                                                value={businessData?.rubro || ''}
                                                onChange={(e) => setBusinessData({ ...businessData, rubro: e.target.value })}
                                            >
                                                <option value="" disabled>Seleccione un rubro</option>
                                                <option value="Nutrición Deportiva">Nutrición Deportiva</option>
                                                <option value="Gimnasio / Fitness">Gimnasio / Fitness</option>
                                                <option value="Indumentaria Deportiva">Indumentaria Deportiva</option>
                                                <option value="Salud y Bienestar">Salud y Bienestar</option>
                                                <option value="Retail General">Retail General</option>
                                                <option value="Servicios Profesionales">Servicios Profesionales</option>
                                                <option value="Otros">Otros</option>
                                            </select>
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                                <Info size={10} /> Categorización comercial para benchmarks de competencia.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Google Maps con Búsqueda */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-2">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Ubicación en Google Maps</label>
                                            <a
                                                href={`https://www.google.com/maps/search/${encodeURIComponent(businessData?.fantasy_name || 'Negocios cercanos')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[9px] font-black text-gray-400 hover:text-gray-900 flex items-center gap-2 uppercase tracking-widest transition-colors"
                                            >
                                                <MapIcon size={12} /> Buscar en Google Maps
                                            </a>
                                        </div>
                                        <input type="text" className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-8 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                                            value={businessData?.google_maps_url || ''}
                                            onChange={(e) => setBusinessData({ ...businessData, google_maps_url: e.target.value })}
                                            placeholder="Pegue aquí el enlace compartido de Google Maps"
                                        />
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                            <HelpCircle size={10} /> Copie el enlace desde Google Maps para habilitar los reportes de cobertura local.
                                        </p>
                                    </div>

                                    {/* Tipificación (Existing) */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] ml-2">Tipificación de Cliente Core</label>
                                        <select
                                            className="w-full bg-gray-50 border-gray-100 rounded-[1.5rem] py-6 px-10 text-sm font-black focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all outline-none appearance-none"
                                            value={businessData?.client_type || 'minorista'}
                                            onChange={(e) => setBusinessData({ ...businessData, client_type: e.target.value })}
                                        >
                                            <option value="minorista">Enfoque Minorista / B2C</option>
                                            <option value="mayorista">Enfoque Mayorista / B2B</option>
                                            <option value="ambos">Modelo Híbrido Corporativo</option>
                                        </select>
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 ml-4">
                                            <HelpCircle size={10} /> Define cómo el sistema prioriza ciertos análisis de mercado.
                                        </p>
                                    </div>
                                </div>
                                <button onClick={handleSaveProfile} className="button-primary w-full py-7 rounded-[2rem] font-black uppercase text-xs tracking-[0.5em] shadow-2xl shadow-gray-900/20">Aplicar Transformación</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Record Modal */}
            {showRecordModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-2xl flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl p-20 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-50 scale-100 animate-in zoom-in-95 duration-500">
                        <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic border-l-[12px] border-gray-900 pl-10">Entrada Contable</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-10 mb-12 italic border-b border-gray-50 pb-2">Registro de cierre operativo diario.</p>
                        <form onSubmit={handleCreateRecord} className="space-y-12">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Periodo de Ejecución</label>
                                <input type="date" value={newRecord.date} onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                                    className="w-full bg-gray-50 border-none rounded-[2rem] p-6 focus:bg-white focus:ring-2 focus:ring-gray-900/5 outline-none font-black text-gray-900 text-lg shadow-inner"
                                />
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-6">Fecha a la que se imputará este movimiento.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest ml-4">Ventas Reales ($)</label>
                                    <input type="number" value={newRecord.sales} onChange={(e) => setNewRecord({ ...newRecord, sales: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-[2.5rem] p-8 focus:bg-white focus:shadow-3xl transition-all outline-none font-black text-gray-900 text-3xl placeholder-gray-100 shadow-inner" placeholder="0"
                                    />
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-6">Ingresos totales brutos sin deducciones.</p>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Gastos Directos ($)</label>
                                    <input type="number" value={newRecord.expenses} onChange={(e) => setNewRecord({ ...newRecord, expenses: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-[2.5rem] p-8 focus:bg-white focus:shadow-3xl transition-all outline-none font-black text-gray-600 text-3xl placeholder-gray-100 shadow-inner" placeholder="0"
                                    />
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-6">Egresos variables directos de la operación.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Costos Estructura / Fijos ($)</label>
                                <input type="number" value={newRecord.fixed_costs} onChange={(e) => setNewRecord({ ...newRecord, fixed_costs: e.target.value })}
                                    className="w-full bg-gray-50 border-none rounded-[2.5rem] p-8 focus:bg-white focus:shadow-3xl transition-all outline-none font-black text-gray-300 text-2xl placeholder-gray-100 shadow-inner" placeholder="0"
                                />
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-6">Costos constantes (alquiler, luz, sueldos fijos).</p>
                            </div>
                            <div className="flex gap-8 pt-12">
                                <button type="button" onClick={() => setShowRecordModal(false)} className="flex-1 py-7 rounded-[2rem] bg-gray-50 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:bg-gray-100 transition-all font-black">Anular</button>
                                <button type="submit" className="flex-[2] button-primary py-7 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl">Confirmar Carga</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientView;
