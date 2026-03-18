// tailwind.config.js
// ================================================================
//  JARVIS UI — TAILWIND CONFIG
//  Extends Tailwind with all custom HUD utilities.
//  Drop this into any Blazor Server project alongside the RCL.
// ================================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.razor',
    './**/*.html',
    './**/*.cshtml',
    // Include the RCL components for purge scanning
    './node_modules/JarvisUI/**/*.razor',
  ],

  theme: {
    extend: {

      // ── Color palette ────────────────────────────────────────
      colors: {
        'j-cyan':       '#00e5ff',
        'j-cyan-mid':   '#22d3ee',
        'j-cyan-dim':   '#0e7490',
        'j-cyan-deep':  '#0891b2',
        'j-amber':      '#f97316',
        'j-red':        '#ef4444',
        'j-green':      '#22c55e',
        'j-bg':         '#020d18',
        'j-bg-card':    '#030f1e',
        'j-bg-danger':  '#08010a',
      },

      // ── Font family ──────────────────────────────────────────
      fontFamily: {
        'hud': ['"Courier New"', '"Lucida Console"', 'monospace'],
      },

      // ── Letter spacing ───────────────────────────────────────
      letterSpacing: {
        'hud-xs': '0.10em',
        'hud-sm': '0.12em',
        'hud-lg': '0.16em',
      },

      // ── Box shadows (glow effects) ───────────────────────────
      boxShadow: {
        'j-glow':       '0 0 12px rgba(0,229,255,0.35)',
        'j-glow-sm':    '0 0 6px rgba(0,229,255,0.20)',
        'j-glow-lg':    '0 0 24px rgba(0,229,255,0.45)',
        'j-glow-amber': '0 0 12px rgba(249,115,22,0.35)',
        'j-glow-red':   '0 0 12px rgba(239,68,68,0.35)',
        'j-glow-green': '0 0 12px rgba(34,197,94,0.30)',
        'j-inner':      'inset 0 0 24px rgba(0,229,255,0.06)',
      },

      // ── Custom keyframe animations ───────────────────────────
      keyframes: {
        'j-scan-v': {
          '0%':   { top: '-2px',  opacity: '0'   },
          '8%':   { opacity: '0.9' },
          '88%':  { opacity: '0.5' },
          '100%': { top: '100%',  opacity: '0'   },
        },
        'j-scan-h': {
          '0%':   { left: '-2px', opacity: '0'   },
          '8%':   { opacity: '0.8' },
          '88%':  { opacity: '0.4' },
          '100%': { left: '100%', opacity: '0'   },
        },
        'j-pulse': {
          '0%, 100%': { opacity: '1'   },
          '50%':      { opacity: '0.2' },
        },
        'j-blink': {
          '0%, 49%, 100%': { opacity: '1' },
          '50%, 99%':      { opacity: '0' },
        },
        'j-spin': {
          'to': { transform: 'rotate(360deg)' },
        },
        'j-spin-rev': {
          'to': { transform: 'rotate(-360deg)' },
        },
        'j-dot-march': {
          '0%, 100%': { opacity: '0.15' },
          '50%':      { opacity: '1'    },
        },
        'j-wave': {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%':      { transform: 'scaleY(1)'    },
        },
        'j-corner-blink': {
          '0%, 100%': { opacity: '1'   },
          '50%':      { opacity: '0.2' },
        },
        'j-danger-pulse': {
          '0%, 100%': { borderColor: 'rgba(239,68,68,0.18)', boxShadow: 'none' },
          '50%':      { borderColor: 'rgba(239,68,68,0.85)', boxShadow: '0 0 18px rgba(239,68,68,0.30)' },
        },
        'j-glitch': {
          '0%, 90%, 100%': { transform: 'none',             opacity: '1'    },
          '92%':           { transform: 'translateX(-3px)',  opacity: '0.8'  },
          '94%':           { transform: 'translateX(3px)',   opacity: '0.9'  },
          '96%':           { transform: 'translateX(-1px)',  opacity: '0.85' },
        },
        'j-btn-shine': {
          '0%':   { left: '-60px' },
          '100%': { left: '110%'  },
        },
        'j-tab-draw': {
          'from': { width: '0' },
          'to':   { width: 'var(--j-tab-w, 50px)' },
        },
        'j-radar': {
          'to': { transform: 'rotate(360deg)' },
        },
      },

      // ── Animation utilities (maps to animation: name duration ...) 
      animation: {
        'j-scan-v':       'j-scan-v 3.5s ease-in-out infinite',
        'j-scan-h':       'j-scan-h 5s ease-in-out infinite',
        'j-pulse':        'j-pulse 2.8s ease-in-out infinite',
        'j-blink':        'j-blink 1.2s step-end infinite',
        'j-blink-slow':   'j-blink 2s ease-in-out infinite',
        'j-spin':         'j-spin 4s linear infinite',
        'j-spin-rev':     'j-spin-rev 6s linear infinite',
        'j-dot-march':    'j-dot-march 1.4s ease-in-out infinite',
        'j-wave':         'j-wave 0.6s ease-in-out infinite',
        'j-corner-blink': 'j-corner-blink 3s ease-in-out infinite',
        'j-danger-pulse': 'j-danger-pulse 1.8s ease-in-out infinite',
        'j-glitch':       'j-glitch 6s ease-in-out infinite',
        'j-btn-shine':    'j-btn-shine 2.4s ease-in-out infinite',
        'j-radar':        'j-radar 4s linear infinite',
        'j-tab-draw':     'j-tab-draw 1.8s ease-out forwards',
      },

      // ── Clip-path utilities ──────────────────────────────────
      // (Tailwind doesn't include clip-path by default)
      // Use as: clip-[polygon(...)]  via arbitrary values
      // OR add the named ones here for purge safety:
    },
  },

  plugins: [
    // ── Custom JarvisUI plugin ───────────────────────────────
    function ({ addUtilities, addComponents, theme }) {

      // Clip-path shapes
      addUtilities({
        '.j-clip-notch-sm': {
          clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
        },
        '.j-clip-notch-md': {
          clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
        },
        '.j-clip-notch-lg': {
          clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)',
        },
        '.j-clip-notch-tl': {
          clipPath: 'polygon(16px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 16px)',
        },
        '.j-clip-hex': {
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
        },
        '.j-clip-hex-btn': {
          clipPath: 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)',
        },
        '.j-clip-btn-notch-l': {
          clipPath: 'polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10px)',
        },
        '.j-clip-btn-notch-r': {
          clipPath: 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%)',
        },
        '.j-clip-btn-both': {
          clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)',
        },
        '.j-clip-icon-sq': {
          clipPath: 'polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)',
        },
        '.j-clip-scan-btn': {
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        },
        // Rail shape for side bar
        '.j-clip-rail': {
          clipPath: 'polygon(0 8px, 3px 0, 3px 100%, 0 calc(100% - 8px))',
        },
        // Tick segment
        '.j-clip-tick': {
          clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)',
        },
      });

      // Glow border utilities
      addUtilities({
        '.j-border-glow-cyan': {
          border: '1px solid rgba(0,229,255,0.70)',
          boxShadow: '0 0 12px rgba(0,229,255,0.25)',
        },
        '.j-border-glow-amber': {
          border: '1px solid rgba(249,115,22,0.70)',
          boxShadow: '0 0 12px rgba(249,115,22,0.25)',
        },
        '.j-border-glow-red': {
          border: '1px solid rgba(239,68,68,0.70)',
          boxShadow: '0 0 12px rgba(239,68,68,0.25)',
        },
        '.j-border-dim': {
          border: '1px solid rgba(0,229,255,0.07)',
        },
        '.j-border-mid': {
          border: '1px solid rgba(0,229,255,0.18)',
        },
        '.j-border-full': {
          border: '1px solid rgba(0,229,255,0.70)',
        },
      });

      // Text utilities
      addUtilities({
        '.j-text-hud': {
          fontFamily: '"Courier New", "Lucida Console", monospace',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        },
        '.j-text-glitch': {
          animation: 'j-glitch 6s ease-in-out infinite',
        },
      });
    },
  ],
};
