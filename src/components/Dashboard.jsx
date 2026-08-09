import React, { useState } from 'react';
import { Flame, Shield, Trophy, Target, Award, Calendar, AlertOctagon, HelpCircle, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { CHALLENGES, TRACKS } from '../data/mockData';

export default function Dashboard({ navigate, userState, onUpdateState }) {
  const { name, selectedTrack, currentDay, streak, freezesAvailable, completedDays, badgeCount, rank, streakHistory } = userState;
  
  // Find current track info
  const trackInfo = TRACKS.find(t => t.id === selectedTrack) || TRACKS[1];
  
  // Find today's challenge
  const todayChallenge = CHALLENGES.find(c => c.day === currentDay) || CHALLENGES[0];
  
  // Calculate percentage of challenge completed (e.g., of 60 days)
  const totalDays = 60;
  const completionPercent = Math.round((completedDays.length / totalDays) * 100);

  // Calculate SVG stroke offset for the streak progress ring
  // Circumference is 2 * pi * r = 2 * 3.14 * 50 = 314
  const radius = 50;
  const strokeDash = 2 * Math.PI * radius;
  const progressRatio = streak / 60; // 60 days
  const strokeOffset = strokeDash - (progressRatio * strokeDash);

  // Handle Streak Freeze recovery action
  const handleUseFreeze = () => {
    if (freezesAvailable <= 0) return;
    
    // Recovery simulation: Restore streak of 11, replace last missed day status to completed/frozen, decrement freeze count
    const updatedHistory = streakHistory.map(item => 
      item.day === 12 ? { day: 12, status: 'completed' } : item
    );
    
    const updated = {
      ...userState,
      streak: 12, // restore streak to 12
      freezesAvailable: freezesAvailable - 1,
      completedDays: [...completedDays, 12],
      streakHistory: updatedHistory,
      stateId: 'ACTIVE', // change developer state label to active
      stateName: 'Active Student (Day 12)'
    };
    
    onUpdateState(updated);
  };

  // Determine user rank title based on completed days
  const getRankDescription = () => {
    if (streak >= 50) return "Consistency Overlord";
    if (streak >= 30) return "Streak Master";
    if (streak >= 10) return "Rising Star";
    return "Code Novice";
  };

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '90px' }}>
      
      {/* Header Profile Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
            {trackInfo.title}
          </span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            Hey, {name || "Developer"} 👋
          </h1>
        </div>
        
        {/* Achievements Badge summary */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="btn-icon" style={{ borderRadius: '50%', gap: '0' }} title="Earned Badges">
            <Award style={{ width: '16px', height: '16px', color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', marginLeft: '2px' }}>{badgeCount}</span>
          </div>
          <div className="btn-icon" style={{ borderRadius: '50%', gap: '0' }} title="Streak Freezes Available">
            <Shield style={{ width: '16px', height: '16px', color: 'var(--color-secondary)' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', marginLeft: '2px' }}>{freezesAvailable}</span>
          </div>
        </div>
      </div>

      {/* Edge Case: Broken Streak Alert */}
      {userState.stateId === 'MISSED' && freezesAvailable > 0 && (
        <div className="glass-card" style={{ 
          border: '1px solid var(--color-error)', 
          background: 'rgba(239, 68, 68, 0.08)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <AlertOctagon style={{ width: '20px', height: '20px', color: 'var(--color-error)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Streak Broken! (Missed Yesterday)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                You missed submitting your Day 12 task. Your 11-day streak has dropped to 0!
              </p>
            </div>
          </div>
          <button 
            onClick={handleUseFreeze} 
            className="btn"
            style={{ 
              background: 'linear-gradient(135deg, var(--color-warning), #d97706)',
              color: '#000',
              fontWeight: '700',
              fontSize: '0.8rem',
              padding: '8px 16px'
            }}
          >
            <RefreshCw className="spin-slow" style={{ width: '14px', height: '14px' }} />
            Use Streak Freeze (1 Left) to Restore Streak!
          </button>
        </div>
      )}

      {/* Dynamic Radial Streak & Metric Ring */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px' }}>
        <div className="streak-circle-container">
          <svg className="streak-circle-svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
            <circle className="streak-circle-bg" cx="60" cy="60" r="50" />
            <circle 
              className="streak-circle-progress" 
              cx="60" 
              cy="60" 
              r="50" 
              strokeDasharray={strokeDash}
              strokeDashoffset={strokeOffset}
            />
          </svg>
          <div className="streak-text-container">
            <span className="streak-number">{streak}</span>
            <span className="streak-lbl">Days</span>
          </div>
        </div>

        <div style={{ flexGrow: 1, marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standing Rank</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Trophy style={{ width: '14px', height: '14px' }} />
              {getRankDescription()}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Challenge Complete</span>
              <span>{completionPercent}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
              <div style={{ 
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', 
                width: `${completionPercent}%`, 
                height: '100%', 
                transition: 'width 0.8s ease'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Task Spotlight */}
      <div className="glass-card active-border pulse-border" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            padding: '3px 8px', 
            background: 'var(--color-primary-glow)', 
            border: '1px solid var(--color-primary)', 
            borderRadius: '4px', 
            color: 'var(--color-primary)',
            fontWeight: 700
          }}>
            TODAY'S TASK (DAY {currentDay})
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Target style={{ width: '12px', height: '12px' }} />
            +{todayChallenge.xp} XP
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{todayChallenge.title}</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px', lineClamp: '2' }}>
          {todayChallenge.description.substring(0, 110)}...
        </p>

        <button 
          onClick={() => navigate(`/day/${currentDay}`)} 
          className="btn btn-primary"
          style={{ padding: '10px 16px', fontSize: '0.8rem' }}
        >
          Begin Day {currentDay} Challenge
          <ChevronRight style={{ width: '14px', height: '14px' }} />
        </button>
      </div>

      {/* 60-Day Progress Calendar Tracker */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Calendar style={{ width: '16px', height: '16px', color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Streak Roadmap</h3>
        </div>
        
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Click any block to check its challenge details.
        </p>

        <div className="grid-calendar">
          {CHALLENGES.map((ch) => {
            const isCompleted = completedDays.includes(ch.day);
            const isToday = ch.day === currentDay;
            
            // Check if day was missed in history
            const historyItem = streakHistory.find(h => h.day === ch.day);
            const isMissed = historyItem && historyItem.status === 'missed';
            
            let statusClass = 'upcoming';
            if (isCompleted) statusClass = 'completed';
            else if (isMissed) statusClass = 'missed';
            else if (isToday) statusClass = 'active';

            return (
              <div 
                key={ch.day} 
                className={`calendar-day ${statusClass}`}
                onClick={() => navigate(`/day/${ch.day}`)}
              >
                {ch.day}
                {/* Custom tooltip displaying challenge summary */}
                <div className="tooltip-custom">
                  <strong>Day {ch.day}</strong>: {ch.title.substring(0, 15)}...
                  <br />
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-success)' }}>
                    {isCompleted ? '✓ Completed' : isMissed ? '✗ Missed' : isToday ? '✦ Active Now' : '⌛ Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Calendar Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '14px', fontSize: '0.65rem', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.3)', border: '1px solid var(--color-success)' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.3)', border: '1px solid var(--color-error)' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Missed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(245, 158, 11, 0.3)', border: '1px solid var(--color-warning)' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Locked</span>
          </div>
        </div>
      </div>

    </div>
  );
}
