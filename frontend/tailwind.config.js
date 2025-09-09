/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quantum': {
          'black': '#0a0a0f',
          'indigo': '#1a1a2e',
          'violet': '#16213e',
          'cyan': '#00ffff',
          'purple': '#8b5cf6',
          'orange': '#ff6b35',
          'electric': '#ffffff'
        }
      },
      backgroundImage: {
        'quantum-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'aurora-gradient': 'linear-gradient(45deg, #00ffff, #8b5cf6, #ff6b35)',
        'neon-glow': 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)'
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'hologram': 'hologram 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
          '100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        hologram: {
          '0%': { opacity: '0.8', transform: 'translateY(0px)' },
          '100%': { opacity: '1', transform: 'translateY(-2px)' }
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' }
        }
      },
      fontFamily: {
        'quantum': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}



