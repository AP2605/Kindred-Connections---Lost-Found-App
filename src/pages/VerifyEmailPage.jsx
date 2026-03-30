import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('[v0] Verifying email...');
        
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[v0] Verification error:', error);
          setStatus('error');
          setMessage('Email verification failed. Please try signing up again.');
          return;
        }

        if (data?.session) {
          console.log('[v0] Email verified successfully');
          setStatus('success');
          setMessage('Link Verified. You can return to your original Device/tab');
          
          // Auto redirect to home after 5 seconds
          setTimeout(() => {
            navigate('/');
          }, 5000);
        } else {
          setStatus('error');
          setMessage('Email verification failed. Please try signing up again.');
        }
      } catch (err) {
        console.error('[v0] Error during verification:', err);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 p-8 shadow-lg text-center">
          {/* Logo Section */}
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-md">
            <span className="text-white font-bold text-2xl">KC</span>
          </div>

          {/* Status Messages */}
          {status === 'verifying' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verifying Email
              </h1>
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Email Verified!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Redirecting to home page in 5 seconds...
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Go to Home Now
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verification Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Return to Login
              </button>
            </>
          )}
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
          Kindred Connections - Community Lost & Found
        </p>
      </div>
    </div>
  );
}