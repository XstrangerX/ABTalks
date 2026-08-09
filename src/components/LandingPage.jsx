import React, { useState } from 'react';
import { Award, Zap, Code, ShieldCheck, Flame, ChevronRight, User } from 'lucide-react';
import { TRACKS } from '../data/mockData';

export default function LandingPage({ navigate, userState, onUpdateState }) {
  const [pledgeName, setPledgeName] = useState(userState.name || '');
  const [selectedTrack, setSelectedTrack] = useState(userState.selectedTrack || 'fullstack');
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState('');

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (!pledgeName.trim()) {
      setError('Please enter your name to sign the pledge');
      return;
    }
    setError('');
    
    // Customize current user state with their name and selected track
    const updated = {
      ...userState,
      name: pledgeName.trim(),
      selectedTrack: selectedTrack,
      // If it's a new state, reset progress.
      currentDay: 1,
      streak: 0,
      completedDays: [],
      streakHistory: []
    };
    
    onUpdateState(updated);
    setSigned(true);
    
    // Redirect to dashboard with a short delay for animation satisfaction
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  const testimonials = [
    { name: "Devi Prasad", role: "SDE-1 @ Razorpay", comment: "The daily commit pressure made me write code even when I felt lazy. Got recruited directly via my LinkedIn posts!", track: "Backend" },
    { name: "Meera Sen", role: "Frontend Dev @ Groww", comment: "Having a public streak forces recruiters to look at your consistency. ABTalks changed how I learn.", track: "Frontend" }
  ];

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          padding: '6px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Flame style={{ width: '20px', height: '20px', fill: '#fff', color: '#fff' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>
          AB<span style={{ color: 'var(--color-primary)' }}>TALKS</span>
        </span>
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '4px 12px',
          borderRadius: '99px',
          margin: '0 auto',
          fontSize: '0.75rem',
          color: 'var(--color-primary)',
          fontWeight: 600
        }}>
          <Zap style={{ width: '12px', height: '12px', fill: 'var(--color-primary)' }} />
          India's Ultimate Developer Streak
        </div>
        
        <h1 style={{ fontSize: '2.1rem', lineHeight: '1.2', fontWeight: 800 }}>
          60 Days. <br />
          <span className="glow-text-primary">60 Proofs.</span> <br />
          No Excuses.
        </h1>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto' }}>
          Commit to building and publishing one project daily. Forge consistent habits and get noticed by top companies.
        </p>
      </div>

      {/* Statistics Banner */}
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'center', padding: '16px 12px' }}>
        <div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-secondary)' }}>12,840+</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Coders</div>
        </div>
        <div style={{ borderLeft: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-success)' }}>94.2%</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Placements Rate</div>
        </div>
      </div>

      {/* Value Pillars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>How it Works</h2>
        
        <div className="glass-card" style={{ display: 'flex', gap: '16px', padding: '14px' }}>
          <div style={{ padding: '8px', background: 'rgba(99,102,241,0.08)', borderRadius: '10px', height: 'fit-content' }}>
            <Code style={{ width: '20px', height: '20px', color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>1. Pick Your Focus Track</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Choose Frontend, Fullstack, Systems, or AI based on your career targets.</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', gap: '16px', padding: '14px' }}>
          <div style={{ padding: '8px', background: 'rgba(6,182,212,0.08)', borderRadius: '10px', height: 'fit-content' }}>
            <Flame style={{ width: '20px', height: '20px', color: 'var(--color-secondary)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>2. Build & Commit Daily</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload code to GitHub and write a LinkedIn post showcasing what you built.</p>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', gap: '16px', padding: '14px' }}>
          <div style={{ padding: '8px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', height: 'fit-content' }}>
            <Award style={{ width: '20px', height: '20px', color: 'var(--color-success)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>3. Earn Trophies & Placements</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unlock certificates and show recruiters your consistent proof-of-work history.</p>
          </div>
        </div>
      </div>

      {/* The Commitment Pledge Panel */}
      <div className="glass-card pulse-border" style={{ padding: '24px 20px', border: '1px solid var(--color-primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <ShieldCheck style={{ width: '32px', height: '32px', color: 'var(--color-primary)', margin: '0 auto 8px' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Take The 60-Day Pledge</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Commit to daily consistency. No shortcuts allowed.</p>
        </div>

        {signed ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '1.5rem', color: 'var(--color-success)', fontWeight: 800, marginBottom: '8px' }}>
              Pledge Signed! ✍️
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Preparing your developer workstation... Get ready to build.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePledgeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Name Input */}
            <div className="input-group">
              <label className="input-label" htmlFor="pledge-name">
                <User style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Your Full Name
              </label>
              <input
                id="pledge-name"
                className="input-field"
                type="text"
                placeholder="Enter your name to sign"
                value={pledgeName}
                onChange={(e) => setPledgeName(e.target.value)}
              />
            </div>

            {/* Track selector list */}
            <div className="input-group">
              <label className="input-label">Select Your Focus Track</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TRACKS.map((track) => (
                  <label 
                    key={track.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: selectedTrack === track.id ? `1px solid ${track.color}` : '1px solid var(--border-color)',
                      background: selectedTrack === track.id ? `rgba(${parseInt(track.color.slice(1,3), 16)}, ${parseInt(track.color.slice(3,5), 16)}, ${parseInt(track.color.slice(5,7), 16)}, 0.08)` : 'rgba(0,0,0,0.2)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: selectedTrack === track.id ? 600 : 400,
                      transition: 'all 0.2s'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="track" 
                      value={track.id}
                      checked={selectedTrack === track.id}
                      onChange={() => setSelectedTrack(track.id)}
                      style={{ accentColor: track.color }}
                    />
                    <div>
                      <span style={{ color: selectedTrack === track.id ? track.color : 'inherit', fontWeight: 'bold' }}>
                        {track.title}
                      </span>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {track.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div style={{ color: 'var(--color-error)', fontSize: '0.75rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: '4px' }}>
              I Commit to the 60 Days
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </button>
          </form>
        )}
      </div>

      {/* Alumni Testimony Carousel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Alumni Placements</h2>
        
        {testimonials.map((t, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '14px', fontSize: '0.8rem' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '8px' }}>
              "{t.comment}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{t.name}</span>
                <span style={{ color: 'var(--text-dim)', marginLeft: '6px' }}>({t.role})</span>
              </div>
              <span style={{ 
                fontSize: '0.65rem', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-muted)'
              }}>{t.track} Track</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
