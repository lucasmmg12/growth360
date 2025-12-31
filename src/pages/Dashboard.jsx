import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminView from '../components/AdminView';
import ClientView from '../components/ClientView';

const Dashboard = ({ session, isDemo, onLogout }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(isDemo ? false : true);

    useEffect(() => {
        if (isDemo) {
            setProfile({ id: session.id, role: session.role, email: session.email });
            return;
        }

        async function getProfile() {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) throw error;
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, [session, isDemo]);

    if (loading) {
        return (
            <div className="min-h-screen bg-grow-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-grow-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleSignOut = () => {
        if (isDemo) onLogout();
        else supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-grow-950 text-white font-montserrat">
            {profile?.role === 'admin' ? (
                <AdminView session={session} isDemo={isDemo} onLogout={handleSignOut} />
            ) : (
                <ClientView session={session} profile={profile} isDemo={isDemo} onLogout={handleSignOut} />
            )}
        </div>
    );
};

export default Dashboard;
