const theme = {
	breakpoints: [
		'30em',
		'43em',
		'62em',
		'82em',
	],
	space: [
		'0',
		'4px',
		'8px',
		'16px',
		'24px',
		'32px',
		'48px',
	],
	sizes: [],
	colors: {
		Accent: '#dddddd',
		Background: '#f8f8f8',
		Card: '#ffffff',
		Caution: '#ffe000',
		'Caution Dark': '#6e5900',
		'Caution Light': '#fffabc',
		Critical: '#ff2660',
		'Critical Dark': '#480009',
		'Critical Light': '#ffdee4',
		Positive: '#1be500',
		'Positive Dark': '#1d5f00',
		'Positive Light': '#d7fac7',
		Primary: '#0091d4',
		'Primary Dark': '#0074b6',
		'Primary Light': '#009fff',
		'Primary Lighter': '#eaf4fa',
		Text: '#232323',
		'Text Light': '#6b6b6b',
	},
	fonts: {
		'Avenir Next': 'Avenir Next',
	},
	fontSizes: [
		'0',
		'0.75rem',
		'0.875rem',
		'1rem',
		'2rem',
	],
	fontWeights: [
		'100',
		'300',
		'400',
		'500',
		'700',
	],
	lineHeights: [
		'0',
		'1rem',
		'1.25rem',
		'1.5rem',
		'2rem',
	],
	letterSpacings: [
		'0',
		'1px',
	],
	borders: {},
	borderStyles: [],
	borderWidths: [
		'1px',
	],
	radii: [
		'0',
		'3px',
		'4px',
		'6px',
		'8px',
	],
	shadows: {
		'Downward Accent': '0 2px 6px -2px rgba(0, 0, 0, 0.15)',
		'Upward Accent': '0 -2px 6px -2px rgba(0, 0, 0, 0.15)',
		'Inset X Accent': 'inset 0 -1px 0 0 #dddddd',
		'Inset Y Accent': 'inset -1px 0 0 0 #dddddd',
	},
	zIndices: [
		'0',
		'1',
		'10',
		'100',
		'1000',
	],
	buttons: {
		Primary: {
			color: '#ffffff',
			backgroundColor: '#0091d4',
			activeColor: '#ffffff',
			borderWidth: '1px',
			borderColor: '#0091d4',
			borderRadius: '6px',
			fontFamily: 'Avenir Next',
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			fontWeight: '700',
			textTransform: 'uppercase',
			letterSpacing: '1px',
			paddingX: '24px',
			paddingY: '16px',
		},
		Secondary: {
			color: '#232323',
			backgroundColor: 'transparent',
			activeColor: '#232323',
			borderWidth: '1px',
			borderColor: '#dddddd',
			borderRadius: '6px',
			fontFamily: 'Avenir Next',
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			fontWeight: '400',
			textTransform: 'uppercase',
			letterSpacing: '1px',
			paddingX: '24px',
			paddingY: '16px',
		},
		Tertiary: {
			color: '#0091d4',
			backgroundColor: 'transparent',
			activeColor: '#0091d4',
			border: '0',
			fontFamily: 'Avenir Next',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '500',
		},
		Welcome: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '172px',
			height: '104px',
			color: '#0091d4',
			backgroundColor: '#ffffff',
			activeColor: '#0091d4',
			border: '0',
			borderRadius: '4px',
			boxShadow: '0 2px 6px -2px rgba(0, 0, 0, 0.15)',
			fontFamily: 'Avenir Next',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '500',
		},
	},
	texts: {
		Primary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '0.875rem',
			lineHeight: '1rem',
		},
		Secondary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '700',
		},
		Accent: {
			color: '#6b6b6b',
			fontFamily: 'Avenir Next',
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: '400',
			textTransform: 'uppercase',
			letterSpacing: '1px',
		},
		'Accent Small': {
			color: '#6b6b6b',
			fontFamily: 'Avenir Next',
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: '300',
		},
		'Modal Accent': {
			color: '#6b6b6b',
			fontFamily: 'Avenir Next',
			fontSize: '0.75rem',
			lineHeight: '1rem',
			fontWeight: '400',
		},
	},
	headings: {
		Primary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '700',
		},
		Secondary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '2rem',
			lineHeight: '1.5rem',
			fontWeight: '700',
		},
		Tertiary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '1.5rem',
			lineHeight: '2rem',
			fontWeight: '700',
		},
	},
	links: {
		Primary: {
			color: '#0091d4',
			fontFamily: 'Avenir Next',
			fontSize: '1rem',
			lineHeight: '1.25rem',
			fontWeight: '500',
		},
	},
	icons: {
		Primary: {
			fill: '#0091d4',
		},
	},
	labels: {},
	inputs: {
		Primary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '0.875rem',
			backgroundColor: '#ffffff',
			borderStyle: 'none',
			borderRadius: '6px',
			padding: '16px',
		},
	},
	radios: {},
	checkboxes: {
		Primary: {
			width: '1.5em',
			height: '1.5em',
			backgroundColor: '#ffffff',
			borderColor: '#dddddd',
			borderRadius: '4px',
		},
	},
	selects: {
		Primary: {
			color: '#232323',
			fontFamily: 'Avenir Next',
			fontSize: '0.875rem',
			backgroundColor: '#ffffff',
			borderStyle: 'none',
			borderRadius: '6px',
			padding: '16px',
		},
	},
	sliders: {},
	toggles: {},
	textareas: {},
} as const

type StyleTheme = typeof theme

declare module 'styled-components' {
	export interface DefaultTheme extends StyleTheme {}
}

export default theme
