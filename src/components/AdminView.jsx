import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserPlus, Users, LogOut, Search, ShieldCheck, Mail, Key, HelpCircle } from 'lucide-react';

const AdminView = ({ session, isDemo, onLogout }) => {
    const [clients, setClients] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-transparent flex font-montserrat text-gray-900 overflow-hidden">

            {/* Sidebar Admin - White */}
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col p-10 space-y-12 shadow-xl z-20">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xl">A</div>
                    <div>
                        <span className="block font-black tracking-tighter text-xl uppercase italic text-gray-900">Growth<span className="text-gray-300">Admin</span></span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Power Panel</span>
                    </div>
                </div>

                <div className="flex-grow space-y-8">
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                        <div className="flex items-center gap-3 text-gray-950 font-black text-[10px] uppercase tracking-widest px-1 italic">
                            <ShieldCheck size={18} /> System Core
                        </div>
                        <div className="space-y-4 px-1">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Estatus</span>
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Acceso</span>
                                <span className="px-3 py-1 bg-gray-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                                    {isDemo ? 'Demo Mode' : 'Admin'}
                                </span>
                            </div>
                        </div>
                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-1 text-center">Núcleo central de gestión institucional.</p>
                    </div>
                </div>

                <button onClick={onLogout} className="flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-black text-gray-400 hover:text-black hover:bg-gray-50 transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Admin Content - Gray Bg */}
            <main className="flex-grow p-16 overflow-y-auto custom-scrollbar bg-transparent">
                <div className="max-w-7xl mx-auto space-y-16">

                    <header className="flex justify-between items-end border-b-2 border-gray-200 pb-12">
                        <div>
                            <h1 className="text-5xl font-black text-gray-900 tracking-tighter capitalize underline decoration-gray-950/5 underline-offset-8">Directorio Corporativo</h1>
                            <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-[10px]">Gestión avanzada de entidades del ecosistema 360</p>
                        </div>
                        <div className="flex items-baseline gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200">
                            <span className="text-6xl font-black text-gray-900 tracking-tighter">{clients.length}</span>
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest translate-y-[-10px]">Entidades<br />Activas</span>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Create Client Form - White Card */}
                        <div className="space-y-8 h-fit sticky top-16">
                            <div className="flex items-center gap-4 text-gray-950 font-black text-[11px] uppercase tracking-[0.3em] mb-6 italic underline decoration-gray-200 underline-offset-4 decoration-2">
                                <UserPlus size={16} /> Alta de Seguridad
                            </div>
                            <form onSubmit={handleCreateUser} className="bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-xl space-y-10">
                                <div className="space-y-4 text-center mb-4">
                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Credenciales del Socio</p>
                                </div>
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
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-4 flex items-center gap-2">
                                        <HelpCircle size={10} /> Correo para acceso y notificaciones del sistema.
                                    </p>
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
                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-4 flex items-center gap-2">
                                        <HelpCircle size={10} /> Contraseña de primer acceso para el nuevo socio.
                                    </p>
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

                        {/* Client List - White Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-4 text-gray-950 font-black text-[11px] uppercase tracking-[0.3em] mb-6 italic border-l-4 border-gray-950 pl-5">
                                <Users size={16} /> Entidades bajo Control
                            </div>
                            <div className="bg-white rounded-[4rem] border border-gray-200 shadow-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                        <tr>
                                            <th className="px-12 py-8">Email / Auth ID</th>
                                            <th className="py-8">Periodo Alta</th>
                                            <th className="px-12 py-8 text-right">Estatus Legal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {clients.map((client) => (
                                            <tr key={client.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                                <td className="px-12 py-10">
                                                    <span className="block font-black text-base text-gray-900 tracking-tight">{client.email}</span>
                                                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">UID: {client.id.slice(0, 12)}</span>
                                                </td>
                                                <td className="py-10">
                                                    <span className="text-xs font-black text-gray-400 uppercase tracking-tight italic">{new Date(client.created_at).toLocaleDateString('es-AR', { month: 'long', day: '2-digit' })}</span>
                                                </td>
                                                <td className="px-12 py-10 text-right">
                                                    <span className="px-6 py-2 bg-gray-100 text-gray-950 text-[10px] font-black rounded-xl uppercase tracking-widest shadow-sm">Auditado</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {clients.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-12 py-24 text-center text-gray-300 font-black uppercase tracking-widest text-sm">Base de datos vacía</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
                                    <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Haga clic en una entidad para ver auditoría técnica detallada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminView;
