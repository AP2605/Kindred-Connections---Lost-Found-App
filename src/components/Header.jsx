import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header({ onReportClick }) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
   <header className="border-b border-green-200 dark:border-green-900 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">KC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kindred Connections</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Community Lost & Found</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onReportClick}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium shadow-md active:scale-95"
            >
              Report Item
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors text-white dark:text-white hover:text-green-700 dark:hover:text-green-300"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}