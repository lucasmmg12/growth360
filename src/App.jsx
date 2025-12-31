import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [session, setSession] = useState(null);
    const [demoUser, setDemoUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const startDemo = (role) => {
        setDemoUser({ id: 'demo-' + role, role, email: `demo-${role}@growlabs.lat` });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-grow-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-grow-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const activeSession = session || demoUser;

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={!activeSession ? <Login startDemo={startDemo} /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard/*"
                    element={activeSession ? <Dashboard session={activeSession} isDemo={!!demoUser} onLogout={() => setDemoUser(null)} /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to={activeSession ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
