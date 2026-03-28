import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header({ onReportClick }) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">KC</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Kindred Connections</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onReportClick}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-all font-medium"
            >
              Report Item
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}