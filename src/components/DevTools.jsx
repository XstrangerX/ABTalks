import React, { useState } from 'react';
import { Sliders, CheckCircle, AlertTriangle, UserPlus, Trophy, ChevronUp, ChevronDown } from 'lucide-react';
import { USER_STATES } from '../data/mockData';

export default function DevTools({ currentState, onStateChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const states = [
    {
      id: 'NEW',
      name: 'New Student (Day 1)',
      desc: 'First day, empty profile, 0 streak, onboarding workflow',
      icon: UserPlus,
      color: '#6366f1' // Indigo
    },
    {
      id: 'ACTIVE',
      name: 'Active Streak (Day 12)',
      desc: 'Day 12, 11-day active streak, completed today pending',
      icon: CheckCircle,
      color: '#10b981' // Emerald
    },
    {
      id: 'MISSED',
      name: 'Missed Day (Day 13)',
      desc: 'Streak broken, 1 available freeze, recovery options active',
      icon: AlertTriangle,
      color: '#ef4444' // Red
    },
    {
      id: 'COMPLETED',
      name: 'Challenge Completed (Day 60)',
      desc: '60/60 completed, graduation certificate unlocked',
      icon: Trophy,
      color: '#f59e0b' // Amber
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '72px', // Float right above the sticky bottom navigation
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '390px',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        margin: '0 12px',
        pointerEvents: 'auto',
        background: '#0a0d1d',
        border: '1px solid var(--color-primary)',
        borderRadius: '12px',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.8), 0 0 15px var(--color-primary-glow)',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out',
        maxHeight: isOpen ? '360px' : '42px'
      }}>
        {/* Header/Toggle Bar */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between',
            padding: '10px 16px',
            background: 'linear-gradient(90deg, #10142d, #0b0e22)',
            cursor: 'pointer',
            borderBottom: isOpen ? '1px solid var(--border-color)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders style={{ width: '16px', height: '16px', color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: '#fff' }}>
              JUDGE DEVTOOLS : <span style={{ color: states.find(s => s.id === currentState.stateId)?.color }}>{currentState.stateName}</span>
            </span>
          </div>
          {isOpen ? (
            <ChevronDown style={{ width: '16px', height: '16px', color: 'var(--text-muted)', marginLeft: 'auto' }} />
          ) : (
            <ChevronUp style={{ width: '16px', height: '16px', color: 'var(--text-muted)', marginLeft: 'auto' }} />
          )}
        </div>

        {/* State Selection List */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', textAlign: 'center' }}>
            Select any state below to instantly reload pages with simulated edge cases.
          </p>
          
          {states.map((s) => {
            const Icon = s.icon;
            const isSelected = currentState.stateId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onStateChange(USER_STATES[s.id]);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: isSelected ? `1px solid ${s.color}` : '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  padding: '6px',
                  borderRadius: '6px',
                  background: isSelected ? s.color : 'rgba(255,255,255,0.02)',
                  color: isSelected ? '#000' : s.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? '#fff' : 'var(--text-main)' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                    {s.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
