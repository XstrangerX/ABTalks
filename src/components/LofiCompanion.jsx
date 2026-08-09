import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, Sparkles, Moon, Sun } from 'lucide-react';

const AUDIO_TRACKS = [
  {
    name: "Midnight Focus (Synth)",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    name: "Deep Space Coding",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    name: "Rain & Coffee Lo-Fi",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function LofiCompanion({ isMidnight, setIsMidnight }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked by browser. Click play manually."));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (e) => {
    const idx = parseInt(e.target.value);
    setCurrentTrackIndex(idx);
    setIsPlaying(false);
    
    // Change audio source
    if (audioRef.current) {
      audioRef.current.src = AUDIO_TRACKS[idx].url;
      // If was playing, play new track
      if (isPlaying) {
        setTimeout(() => {
          audioRef.current.play().catch(err => console.log(err));
          setIsPlaying(true);
        }, 100);
      }
    }
  };

  const toggleMidnight = () => {
    const nextState = !isMidnight;
    setIsMidnight(nextState);
    if (nextState) {
      document.body.classList.add('midnight-mode');
    } else {
      document.body.classList.remove('midnight-mode');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '16px', marginTop: '20px', border: '1px dashed var(--color-primary)' }}>
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={AUDIO_TRACKS[currentTrackIndex].url} 
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music className="spin-slow" style={{ color: 'var(--color-primary)', width: '18px', height: '18px' }} />
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Midnight Companion</h3>
        </div>
        
        {/* Toggle Theme */}
        <button 
          onClick={toggleMidnight}
          className="btn-icon"
          style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px', marginLeft: 'auto' }}
          title="Toggle eye-soothing sepia focus mode"
        >
          {isMidnight ? (
            <>
              <Sun style={{ width: '14px', height: '14px', color: 'var(--color-warning)' }} />
              <span style={{ fontSize: '0.7rem' }}>Late Night</span>
            </>
          ) : (
            <>
              <Moon style={{ width: '14px', height: '14px', color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.7rem' }}>Midnight</span>
            </>
          )}
        </button>
      </div>

      {/* Cassette Tape Visualizer */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '60px',
        marginBottom: '12px',
        overflow: 'hidden'
      }}>
        {/* Cassette Outline */}
        <svg viewBox="0 0 100 45" style={{ width: '100%', height: '100%', opacity: 0.8 }}>
          <rect x="5" y="2" width="90" height="41" rx="3" fill="#1e293b" stroke="var(--color-primary)" strokeWidth="1" />
          <rect x="25" y="12" width="50" height="20" rx="1" fill="#0f172a" />
          
          {/* Cassette Spools */}
          <circle cx="38" cy="22" r="5" fill="#334155" />
          <circle cx="38" cy="22" r="3" fill="#000" className={`cassette-wheel ${isPlaying ? '' : 'paused'}`} stroke="var(--color-secondary)" strokeDasharray="3 2" />
          
          <circle cx="62" cy="22" r="5" fill="#334155" />
          <circle cx="62" cy="22" r="3" fill="#000" className={`cassette-wheel ${isPlaying ? '' : 'paused'}`} stroke="var(--color-secondary)" strokeDasharray="3 2" />
        </svg>
        <div style={{
          position: 'absolute',
          bottom: '4px',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em'
        }}>
          {isPlaying ? "PLAYING FOCUS LO-FI" : "CONSOL PAUSED"}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={togglePlay}
            className="btn-icon"
            style={{ 
              borderRadius: '50%', 
              width: '32px', 
              height: '32px', 
              background: isPlaying ? 'var(--color-success-glow)' : 'var(--color-primary-glow)',
              borderColor: isPlaying ? 'var(--color-success)' : 'var(--color-primary)'
            }}
          >
            {isPlaying ? (
              <Pause style={{ width: '14px', height: '14px', fill: 'var(--color-success)', color: 'var(--color-success)' }} />
            ) : (
              <Play style={{ width: '14px', height: '14px', fill: 'var(--color-primary)', color: 'var(--color-primary)', marginLeft: '2px' }} />
            )}
          </button>

          <select 
            onChange={handleTrackChange}
            value={currentTrackIndex}
            style={{
              flexGrow: 1,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '6px',
              fontSize: '0.75rem',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          >
            {AUDIO_TRACKS.map((t, idx) => (
              <option key={idx} value={idx}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 4px' }}>
          <Volume2 style={{ width: '12px', height: '12px', color: 'var(--text-dim)' }} />
          <input 
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{
              flexGrow: 1,
              accentColor: 'var(--color-primary)',
              height: '3px',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </div>
  );
}
