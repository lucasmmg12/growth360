import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserPlus, Users, LogOut, Search, ShieldCheck, Mail, Key, HelpCircle, Zap, LayoutDashboard } from 'lucide-react';
import MethodologyTab from './MethodologyTab';

const AdminView = ({ session, isDemo, onLogout }) => {
    const [clients, setClients] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('directorio');
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        if (isDemo) {
            setClients([
                { id: '1', email: 'viny@suplementos.com', created_at: new Date().toISOString() },
                { id: '2', email: 'gym-center@fitness.com', created_at: new Date().toISOString() },
                { id: '3', email: 'market-pro@business.ar', created_at: new Date().toISOString() },
            ]);
        } else {
            fetchClients();
        }
    }, [isDemo]);

    async function fetchClients() {
        const { data, error } = await supabase.from('profiles').select('*').eq('role', 'client');
        if (!error) setClients(data || []);
    }

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (isDemo) { alert('Modo Demo: Funcionalidad restringida.'); return; }
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({ email: newEmail, password: newPassword });
        if (error) { alert(error.message); } else {
            await supabase.from('profiles').insert([{ id: data.user.id, email: newEmail, role: 'client' }]);
            alert('Entidad creada exitosamente');
            setNewEmail(''); setNewPassword(''); fetchClients();
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col lg:flex-row font-montserrat text-gray-900 overflow-hidden relative">

            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-xs">A</div>
                    <span className="font-extrabold tracking-tighter text-base uppercase italic text-gray-900">Growth<span className="text-gray-300">Admin</span></span>
                </div>
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-2 text-gray-900"
                >
                    {showSidebar ? <XCircle size={24} /> : <Zap className="rotate-90" size={24} />}
                </button>
            </header>

            {/* Sidebar Overlay for Mobile */}
            {showSidebar && (
                <div
                    className="lg:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar Admin - White */}
            <aside className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 flex flex-col p-10 space-y-12 shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 lg:shadow-xl lg:z-20 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xl">A</div>
                    <div>
                        <span className="block font-black tracking-tighter text-xl uppercase italic text-gray-900">Growth<span className="text-gray-300">Admin</span></span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Power Panel</span>
                    </div>
                </div>

                <nav className="flex-grow space-y-2">
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Módulos Admin</p>
                    {[
                        { id: 'directorio', label: 'Ecosistema Clientelar', icon: <Users size={18} /> },
                        { id: 'metodologia', label: 'Metodología 360', icon: <Zap size={18} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setShowSidebar(false);
                            }}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black transition-all duration-300 ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 space-y-4">
                    <div className="flex items-center gap-3 text-gray-950 font-black text-[9px] uppercase tracking-widest px-1 italic">
                        <ShieldCheck size={14} /> Security Level: High
                    </div>
                </div>

                <button onClick={onLogout} className="flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-black text-gray-400 hover:text-black hover:bg-gray-50 transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Admin Content - Gray Bg */}
            <main className="flex-grow p-6 lg:p-16 overflow-y-auto custom-scrollbar bg-transparent">
                <div className="max-w-7xl mx-auto space-y-10 lg:space-y-16">
                    {activeTab === 'directorio' ? (
                        <>
                            <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-200 pb-10 gap-6">
                                <div>
                                    <h1 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tighter capitalize underline decoration-gray-950/5 underline-offset-8">Directorio Corporativo</h1>
                                    <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-[9px] lg:text-[10px]">Gestión avanzada de entidades del ecosistema 360</p>
                                </div>
                                <div className="flex items-baseline gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200">
                                    <span className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter">{clients.length}</span>
                                    <span className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-widest translate-y-[-5px] lg:translate-y-[-10px]">Entidades<br />Activas</span>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                {/* Create Client Form */}
                                <div className="space-y-8 h-fit lg:sticky lg:top-16">
                                    <div className="flex items-center gap-4 text-gray-950 font-black text-[11px] uppercase tracking-[0.3em] mb-6 italic underline decoration-gray-200 underline-offset-4 decoration-2">
                                        <UserPlus size={16} /> Alta de Seguridad
                                    </div>
                                    <form onSubmit={handleCreateUser} className="bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-xl space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest ml-4">Email Corporativo</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                                                <input
                                                    type="email"
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-14 pr-6 focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all font-black text-sm outline-none shadow-inner"
                                                    placeholder="socio@empresa.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest ml-4">Password Inicial</label>
                                            <div className="relative group">
                                                <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-14 pr-6 focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all font-black text-sm outline-none shadow-inner"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full button-primary py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl"
                                        >
                                            {loading ? 'Generando...' : 'Autorizar Socio'}
                                        </button>
                                    </form>
                                </div>

                                {/* Client List */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="flex items-center gap-4 text-gray-950 font-black text-[11px] uppercase tracking-[0.3em] mb-6 italic border-l-4 border-gray-950 pl-5">
                                        <Users size={16} /> Entidades bajo Control
                                    </div>
                                    <div className="bg-white rounded-[4rem] border border-gray-200 shadow-xl overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                                <tr>
                                                    <th className="px-12 py-8">Email / Auth ID</th>
                                                    <th className="py-8">Periodo Alta</th>
                                                    <th className="px-12 py-8 text-right">Estatus</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {clients.map((client) => (
                                                    <tr key={client.id} className="hover:bg-gray-50/50 transition-all duration-300">
                                                        <td className="px-12 py-10">
                                                            <span className="block font-black text-base text-gray-900 tracking-tight">{client.email}</span>
                                                            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest truncate max-w-[200px] block">UID: {client.id}</span>
                                                        </td>
                                                        <td className="py-10">
                                                            <span className="text-xs font-black text-gray-400 uppercase tracking-tight">{new Date(client.created_at).toLocaleDateString('es-AR', { month: 'long', day: '2-digit' })}</span>
                                                        </td>
                                                        <td className="px-12 py-10 text-right">
                                                            <span className="px-4 py-1.5 bg-gray-100 text-gray-950 text-[9px] font-black rounded-lg uppercase tracking-widest">Verificado</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-12">
                            <header className="border-b-2 border-gray-200 pb-12">
                                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Scale Methodology</h1>
                                <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-[10px]">Núcleo doctrinado del ecosistema Growth 360</p>
                            </header>
                            <MethodologyTab />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminView;
