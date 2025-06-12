
  /** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  
    darkMode: ["class", "class"], // Enables dark mode (optional)
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
      "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js Pages Router
      "./components/**/*.{js,ts,jsx,tsx}", // Components folder
      "./src/**/*.{js,ts,jsx,tsx}", // Any files in the src directory
    ],
 
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
  	screens: {
  		xs: '480px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px',
  		'4xl': '2560px'
  	},
  	extend: {
  		colors: {
  			gray: {
  				'0': 'rgb(var(--gray-0) / <alpha-value>)',
  				'50': 'rgb(var(--gray-50) / <alpha-value>)',
  				'100': 'rgb(var(--gray-100) / <alpha-value>)',
  				'200': 'rgb(var(--gray-200) / <alpha-value>)',
  				'300': 'rgb(var(--gray-300) / <alpha-value>)',
  				'400': 'rgb(var(--gray-400) / <alpha-value>)',
  				'500': 'rgb(var(--gray-500) / <alpha-value>)',
  				'600': 'rgb(var(--gray-600) / <alpha-value>)',
  				'700': 'rgb(var(--gray-700) / <alpha-value>)',
  				'800': 'rgb(var(--gray-800) / <alpha-value>)',
  				'900': 'rgb(var(--gray-900) / <alpha-value>)',
  				'1000': 'rgb(var(--gray-1000) / <alpha-value>)'
  			},
  			primary: {
  				lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
  				light: 'rgb(var(--primary-light) / <alpha-value>)',
  				DEFAULT: 'hsl(var(--primary))',
  				dark: 'rgb(var(--primary-dark) / <alpha-value>)',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
  				light: 'rgb(var(--secondary-light) / <alpha-value>)',
  				DEFAULT: 'hsl(var(--secondary))',
  				dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			red: {
  				lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
  				light: 'rgb(var(--red-light) / <alpha-value>)',
  				DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
  				dark: 'rgb(var(--red-dark) / <alpha-value>)'
  			},
  			orange: {
  				lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
  				light: 'rgb(var(--orange-light) / <alpha-value>)',
  				DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
  				dark: 'rgb(var(--orange-dark) / <alpha-value>)'
  			},
  			blue: {
  				lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
  				light: 'rgb(var(--blue-light) / <alpha-value>)',
  				DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
  				dark: 'rgb(var(--blue-dark) / <alpha-value>)'
  			},
  			green: {
  				lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
  				light: 'rgb(var(--green-light) / <alpha-value>)',
  				DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
  				dark: 'rgb(var(--green-dark) / <alpha-value>)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			inter: [
  				'var(--font-inter)'
  			],
  			lexend: [
  				'var(--font-lexend)'
  			]
  		},
  		animation: {
  			blink: 'blink 1.4s infinite both;',
  			'scale-up': 'scaleUp 500ms infinite alternate',
  			'spin-slow': 'spin 4s linear infinite',
  			popup: 'popup 500ms var(--popup-delay, 0ms) linear 1',
  			skeleton: 'skeletonWave 1.6s linear 0.5s infinite',
  			'spinner-ease-spin': 'spinnerSpin 0.8s ease infinite',
  			'spinner-linear-spin': 'spinnerSpin 0.8s linear infinite'
  		},
  		backgroundImage: {
  			skeleton: '`linear-gradient(90deg,transparent,#ecebeb,transparent)`',
  			'skeleton-dark': '`linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`'
  		},
  		keyframes: {
  			blink: {
  				'0%': {
  					opacity: '0.2'
  				},
  				'20%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0.2'
  				}
  			},
  			scaleUp: {
  				'0%': {
  					transform: 'scale(0)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			popup: {
  				'0%': {
  					transform: 'scale(0)'
  				},
  				'50%': {
  					transform: 'scale(1.3)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			skeletonWave: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'50%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			spinnerSpin: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			}
  		},
  		content: {
  			underline: 'url("/public/underline.svg")'
  		},
  		boxShadow: {
  			profilePic: '0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
    }),
      require("tailwindcss-animate")
],
}// satisfies Config;

