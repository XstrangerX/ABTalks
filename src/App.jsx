import React, { useState, useEffect } from 'react';
import { Flame, Home, Layout, Award, Settings, Bell, Moon } from 'lucide-react';
import { USER_STATES } from './data/mockData';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ChallengeDay from './components/ChallengeDay';
import LofiCompanion from './components/LofiCompanion';
import DevTools from './components/DevTools';

export default function App() {
  // Client-Side Router State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Global Mock User State - start with Day 12 Active by default for immediate reviewer experience, but judges can hot-swap
  const [userState, setUserState] = useState(USER_STATES.ACTIVE);
  const [isMidnight, setIsMidnight] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom navigation trigger
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    // Scroll mobile container to top on route change
    const container = document.getElementById('mobile-content-scroll');
    if (container) container.scrollTop = 0;
  };

  // Routing Map Matcher
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <LandingPage 
          navigate={navigate} 
          userState={userState} 
          onUpdateState={setUserState} 
        />
      );
    }
    
    if (currentPath === '/dashboard') {
      return (
        <Dashboard 
          navigate={navigate} 
          userState={userState} 
          onUpdateState={setUserState}
        />
      );
    }
    
    if (currentPath.startsWith('/day/')) {
      const dayId = currentPath.split('/day/')[1] || '1';
      return (
        <ChallengeDay 
          dayId={dayId} 
          navigate={navigate} 
          userState={userState} 
          onUpdateState={setUserState}
        />
      );
    }

    // Default Fallback
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>404 - Page Not Found</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          We couldn't find the route: "{currentPath}"
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Safety
        </button>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Centered Mobile Sandbox for Desktop viewports */}
      <div className="mobile-wrapper">
        
        {/* Top Mini Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(5, 7, 15, 0.4)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div 
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <Flame style={{ width: '18px', height: '18px', fill: 'var(--color-primary)', color: 'var(--color-primary)' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              AB<span style={{ color: 'var(--color-primary)' }}>TALKS</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              color: 'var(--text-muted)', 
              background: 'rgba(255,255,255,0.04)', 
              padding: '2px 8px', 
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}>
              {userState.selectedTrack ? userState.selectedTrack.toUpperCase() : 'NO TRACK'}
            </span>
          </div>
        </div>

        {/* Scrollable Viewport Content */}
        <div 
          id="mobile-content-scroll"
          style={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            position: 'relative',
            zIndex: 1
          }}
        >
          {renderRoute()}
          
          {/* Include Lo-Fi Companion inside scrollable view, except on the Landing Page */}
          {currentPath !== '/' && currentPath !== '' && (
            <div style={{ padding: '0 16px 24px' }}>
              <LofiCompanion isMidnight={isMidnight} setIsMidnight={setIsMidnight} />
            </div>
          )}
        </div>

        {/* Sticky Bottom Tab Bar */}
        <nav className="bottom-nav">
          <button 
            onClick={() => navigate('/')} 
            className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
          >
            <Home style={{ width: '18px', height: '18px' }} />
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')} 
            className={`nav-link ${currentPath === '/dashboard' ? 'active' : ''}`}
          >
            <Layout style={{ width: '18px', height: '18px' }} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate(`/day/${userState.currentDay}`)} 
            className={`nav-link ${currentPath.startsWith('/day/') ? 'active' : ''}`}
          >
            <Award style={{ width: '18px', height: '18px' }} />
            <span>Day {userState.currentDay}</span>
          </button>
        </nav>

        {/* Floating Debug Tools for Evaluation */}
        <DevTools currentState={userState} onStateChange={setUserState} />

      </div>
    </div>
  );
}
