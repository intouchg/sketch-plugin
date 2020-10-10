
const theme = {
	breakpoints: [ '30em', '43em', '62em', '82em' ],
	colors: {
		Card: '#ffffff',
		Background: '#f8f8f8',
		Accent: '#dddddd',
		Primary: '#2c90ce',
		'Primary Light': '#e0eff9',
		Text: '#232323',
		'Text Light': '#999999',
		Critical: '#ff4867',
		Positive: '#1dce4a',
		Warning: '#ffe31e',
	},
	space: [ '0', '4px', '8px', '16px', '24px', '32px', '48px' ],
	fonts: {
		Avenir: '\'Avenir Next\', sans-serif',
	},
	fontSizes: [ '0', '0.75rem', '0.875rem', '1rem', '2rem' ],
	lineHeights: [ '0', '1rem', '1.25rem', '1.5rem', '2rem' ],
	fontWeights: {
		Regular: '300',
		Medium: '400',
		Demibold: '600',
		Bold: '700',
	},
	borders: {},
	zIndices: [ 0, 1, 10, 100, 1000 ],
	radii: {
		Small: '4px',
		Large: '6px',
	},
	shadows: {
		Medium: '0 2px 6px -2px rgba(0, 0, 0, 0.15)',
	},
	buttons: {
		Primary: {
			color: '#ffffff',
			backgroundColor: '#2c90ce',
			activeColor: '#ffffff',
			border: '1px solid',
			borderColor: '#2c90ce',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			fontWeight: '600',
		},
		Secondary: {
			color: '#232323',
			backgroundColor: '#f8f8f8',
			activeColor: '#232323',
			border: '1px solid',
			borderColor: '#999999',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			fontWeight: '400',
		},
		Tertiary: {
			color: '#2c90ce',
			backgroundColor: 'transparent',
			activeColor: '#2c90ce',
			border: '0',
			borderColor: '',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '600',
		},
		Welcome: {
			display: 'flex',
			justifyContent: 'center',
			width: '172px',
			height: '104px',
			color: '#2c90ce',
			backgroundColor: '#ffffff',
			activeColor: '#2c90ce',
			border: '0',
			borderColor: '',
			borderRadius: '4px',
			boxShadow: '0 2px 6px -2px rgba(0, 0, 0, 0.15)',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '600',
		},
	},
	texts: {
		Primary: {
			color: '#232323',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.875rem',
			lineHeight: '1rem',
		},
		Accent: {
			color: '#999999',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: '400',
			textTransform: 'uppercase',
			letterSpacing: '1px',
		},
		'Accent Small': {
			color: '#999999',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: '300',
		},
	},
	headings: {
		Primary: {
			color: '#232323',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '700',
		},
		Secondary: {
			color: '#232323',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '2rem',
			lineHeight: '1.5rem',
			fontWeight: '700',
		},
	},
	links: {
		Primary: {
			color: '#2c90ce',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '600',
		},
	},
	icons: {
		Primary: {
			fill: '#2c90ce',
		},
	},
	inputs: {
		Primary: {
			color: '#232323',
			fontFamily: '\'Avenir Next\', sans-serif',
			fontSize: '0.875rem',
			lineHeight: '1rem',
		},
	},
} as const

type StyleTheme = typeof theme

declare module 'styled-components' {
	export interface DefaultTheme extends StyleTheme {}
}

export default theme
