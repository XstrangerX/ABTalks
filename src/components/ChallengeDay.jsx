import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Copy, Check, Terminal, Play } from 'lucide-react';
import { CHALLENGES } from '../data/mockData';
import confetti from 'canvas-confetti';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', ...props.style }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', ...props.style }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ChallengeDay({ dayId, navigate, userState, onUpdateState }) {
  const day = parseInt(dayId);
  const challenge = CHALLENGES.find(c => c.day === day) || CHALLENGES[0];

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  
  // Submission validation simulation states
  const [submittingState, setSubmittingState] = useState('idle'); // idle, checking-git, checking-li, success
  const [submissionError, setSubmissionError] = useState('');

  // Find if already submitted from profile history
  const isAlreadySubmitted = userState.completedDays.includes(day);
  const existingSubmission = userState.submissionHistory[day];

  // Initialize input fields if already submitted
  useEffect(() => {
    if (isAlreadySubmitted && existingSubmission) {
      setGithubUrl(existingSubmission.github);
      setLinkedinUrl(existingSubmission.linkedin);
    } else {
      setGithubUrl('');
      setLinkedinUrl('');
    }
    setSubmittingState('idle');
    setSubmissionError('');
    setTasksCompleted({});
  }, [day, isAlreadySubmitted, existingSubmission]);

  const handleTaskToggle = (index) => {
    setTasksCompleted(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(challenge.starterTemplate);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Pre-fill valid URLs for review ease
  const handleAutoFill = () => {
    setGithubUrl(`https://github.com/${userState.name || 'student'}/abtalks-60-days/commit/d${day}fc4e`);
    setLinkedinUrl(`https://linkedin.com/posts/${userState.name || 'student'}-day${day}-abtalks`);
  };

  // LinkedIn Post Draft Generator
  const generateLinkedInDraft = () => {
    const trackName = userState.selectedTrack === 'frontend' ? 'Frontend Engineering'
                    : userState.selectedTrack === 'ai' ? 'AI App Development'
                    : userState.selectedTrack === 'backend' ? 'Backend System Design'
                    : 'Full-Stack Web Dev';
    
    return `🔥 Day ${day} of #60DaysOfCode with #ABTalks!

Today, I built: "${challenge.title}" for the ${trackName} track.

Key highlights:
${challenge.tasks.map(t => `• ${t.substring(0, 50)}...`).slice(0, 3).join('\n')}

Feeling consistent and pushing code every single day. Onward! 🚀

#learninginpublic #proofofwork #indiacodes #developer`;
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generateLinkedInDraft());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  // Simulated validation process
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      setSubmissionError('Please fill out both GitHub and LinkedIn URLs');
      return;
    }
    
    setSubmissionError('');
    setSubmittingState('checking-git');

    // Simulate Git commit API validation check (1.2 seconds)
    setTimeout(() => {
      setSubmittingState('checking-li');
      
      // Simulate LinkedIn API validation check (1.2 seconds)
      setTimeout(() => {
        setSubmittingState('success');
        
        // Trigger celebratory confetti burst!
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Update user state: add completed day, increment streak if it is today
        const wasCompleted = userState.completedDays.includes(day);
        const newCompletedDays = wasCompleted 
          ? userState.completedDays 
          : [...userState.completedDays, day];
        
        // Increment streak if submitting today's challenge or if recovered
        let newStreak = userState.streak;
        if (!wasCompleted && day === userState.currentDay) {
          newStreak = userState.streak + 1;
        }

        const nextDay = day === userState.currentDay ? day + 1 : userState.currentDay;

        const updated = {
          ...userState,
          streak: newStreak,
          completedDays: newCompletedDays,
          currentDay: nextDay <= 60 ? nextDay : 60,
          submissionHistory: {
            ...userState.submissionHistory,
            [day]: {
              github: githubUrl.trim(),
              linkedin: linkedinUrl.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          }
        };

        onUpdateState(updated);
      }, 1200);
    }, 1200);
  };

  // Navigations
  const goPrev = () => { if (day > 1) navigate(`/day/${day - 1}`); };
  const goNext = () => { if (day < 60) navigate(`/day/${day + 1}`); };

  // Difficulty badge styling
  const diffColor = challenge.difficulty === 'Easy' ? 'var(--color-success)'
                  : challenge.difficulty === 'Medium' ? 'var(--color-warning)'
                  : 'var(--color-error)';

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '90px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', width: 'auto', display: 'inline-flex', borderRadius: '8px' }}
        >
          ← Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={goPrev} disabled={day <= 1} className="btn-icon" style={{ opacity: day <= 1 ? 0.3 : 1 }}>
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
          </button>
          
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            Day {day} of 60
          </span>
          
          <button onClick={goNext} disabled={day >= 60} className="btn-icon" style={{ opacity: day >= 60 ? 0.3 : 1 }}>
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* Challenge Title Block */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ 
            fontSize: '0.65rem', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            border: `1px solid ${diffColor}`,
            color: diffColor,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {challenge.difficulty} Difficulty
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>+{challenge.xp} XP Available</span>
        </div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>{challenge.title}</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          {challenge.description}
        </p>
      </div>

      {/* Tasks Checklist */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>Build Checklist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {challenge.tasks.map((task, idx) => (
            <label 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.78rem',
                color: tasksCompleted[idx] || isAlreadySubmitted ? 'var(--text-dim)' : 'var(--text-main)',
                textDecoration: tasksCompleted[idx] || isAlreadySubmitted ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              <input 
                type="checkbox" 
                checked={!!tasksCompleted[idx] || isAlreadySubmitted}
                disabled={isAlreadySubmitted}
                onChange={() => handleTaskToggle(idx)}
                style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
              />
              <span>{task}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Starter Template */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Terminal style={{ width: '14px', height: '14px', color: 'var(--color-primary)' }} />
            Starter Code Template
          </span>
          <button 
            onClick={handleCopyCode} 
            className="btn-icon" 
            style={{ padding: '4px', border: 'none', background: 'transparent' }}
            title="Copy Code"
          >
            {copiedCode ? <Check style={{ width: '14px', height: '14px', color: 'var(--color-success)' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
          </button>
        </div>
        <pre style={{
          background: 'rgba(0,0,0,0.5)',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '0.7rem',
          color: 'var(--color-secondary)',
          overflowX: 'auto',
          fontFamily: 'monospace',
          border: '1px solid var(--border-color)',
          maxHeight: '120px'
        }}>
          <code>{challenge.starterTemplate}</code>
        </pre>
      </div>

      {/* Help Resources */}
      <div className="glass-card" style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Recommended Resources</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {challenge.resources.map((res, idx) => (
            <a 
              key={idx} 
              href={res.url} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                color: 'var(--color-secondary)',
                width: 'fit-content'
              }}
            >
              {res.name}
              <ExternalLink style={{ width: '10px', height: '10px' }} />
            </a>
          ))}
        </div>
      </div>

      {/* Submission Panel */}
      <div className="glass-card" style={{ 
        border: isAlreadySubmitted ? '1px solid var(--color-success)' : '1px solid var(--border-color)',
        boxShadow: isAlreadySubmitted ? '0 0 15px var(--color-success-glow)' : 'none'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAlreadySubmitted ? (
            <>
              <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--color-success)' }} />
              Proof of Work Verified!
            </>
          ) : (
            "Submit Proof of Work"
          )}
        </h3>

        {/* Dynamic Submission form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* GitHub Input */}
          <div className="input-group" style={{ marginBottom: '0' }}>
            <label className="input-label" htmlFor="git-url">
              <Github style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              GitHub Commit or Repository URL
            </label>
            <input
              id="git-url"
              className="input-field"
              type="url"
              disabled={isAlreadySubmitted || submittingState !== 'idle'}
              placeholder="https://github.com/username/project/commit/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          {/* LinkedIn Input */}
          <div className="input-group" style={{ marginBottom: '0' }}>
            <label className="input-label" htmlFor="li-url">
              <Linkedin style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              LinkedIn Post URL
            </label>
            <input
              id="li-url"
              className="input-field"
              type="url"
              disabled={isAlreadySubmitted || submittingState !== 'idle'}
              placeholder="https://linkedin.com/posts/activity-..."
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>

          {/* Helper Draft Drawer */}
          {!isAlreadySubmitted && (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Stuck writing LinkedIn post?
                </span>
                <button 
                  type="button"
                  onClick={handleCopyDraft}
                  className="btn-secondary"
                  style={{ 
                    width: 'auto', 
                    padding: '3px 8px', 
                    fontSize: '0.65rem', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedDraft ? <Check style={{ width: '10px', height: '10px', color: 'var(--color-success)' }} /> : <Copy style={{ width: '10px', height: '10px' }} />}
                  {copiedDraft ? 'Copied' : 'Get AI Draft'}
                </button>
              </div>
              <div style={{ 
                fontSize: '0.65rem', 
                color: 'var(--text-dim)', 
                background: 'rgba(0,0,0,0.3)',
                padding: '8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: '90px',
                overflowY: 'auto'
              }}>
                {generateLinkedInDraft()}
              </div>
            </div>
          )}

          {submissionError && (
            <div style={{ color: 'var(--color-error)', fontSize: '0.72rem', textAlign: 'center' }}>
              {submissionError}
            </div>
          )}

          {/* Autocomplete helper for review */}
          {!isAlreadySubmitted && submittingState === 'idle' && (
            <button 
              type="button" 
              onClick={handleAutoFill}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.68rem',
                cursor: 'pointer',
                textAlign: 'left',
                width: 'fit-content',
                textDecoration: 'underline'
              }}
            >
              ⚡ Auto-fill demonstration links
            </button>
          )}

          {/* Submit Actions */}
          {isAlreadySubmitted ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--color-success)'
            }}>
              Verified at {existingSubmission?.timestamp || '11:45 PM'}
            </div>
          ) : (
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submittingState !== 'idle'}
              style={{
                background: submittingState === 'checking-git' ? 'var(--color-primary)' 
                          : submittingState === 'checking-li' ? 'var(--color-secondary)'
                          : 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
              }}
            >
              {submittingState === 'idle' && (
                <>
                  <Play style={{ width: '14px', height: '14px', fill: '#fff' }} />
                  Submit Day {day} Proof
                </>
              )}
              {submittingState === 'checking-git' && "Verifying GitHub commit... ⏳"}
              {submittingState === 'checking-li' && "Verifying LinkedIn post... ⏳"}
            </button>
          )}

        </form>
      </div>

    </div>
  );
}
