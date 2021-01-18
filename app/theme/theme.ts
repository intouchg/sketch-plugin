const theme = {
	"breakpoints": [
		"30em",
		"43em",
		"62em",
		"82em"
	],
	"space": [
		"0",
		"4px",
		"8px",
		"16px",
		"24px",
		"32px",
		"48px"
	],
	"sizes": {},
	"colors": {
		"Accent": "#dddddd",
		"Background": "#f8f8f8",
		"Card": "#ffffff",
		"Caution": "#ffdf00",
		"Caution Dark": "#6b5900",
		"Caution Light": "#fffac3",
		"Critical": "#ff4565",
		"Critical Dark": "#41000b",
		"Critical Light": "#ffdfe4",
		"Positive": "#6ce11d",
		"Positive Dark": "#315d13",
		"Positive Light": "#def8cc",
		"Primary": "#2c90ce",
		"Primary Dark": "#1274b1",
		"Primary Light": "#009fff",
		"Primary Lighter": "#eaf4fa",
		"Text": "#232323",
		"Text Light": "#6b6b6b"
	},
	"fonts": {
		"Avenir Next": "Avenir Next"
	},
	"fontSizes": [
		"0",
		"0.75rem",
		"0.875rem",
		"1rem",
		"2rem"
	],
	"fontWeights": {
		"Regular": "300",
		"Medium": "400",
		"Demibold": "500",
		"Bold": "700"
	},
	"lineHeights": [
		"0",
		"1rem",
		"1.25rem",
		"1.5rem",
		"2rem"
	],
	"letterSpacings": [],
	"borders": {},
	"borderStyles": {},
	"borderWidths": {
		"Thin": "1px"
	},
	"radii": {
		"Small": "3px",
		"Medium": "4px",
		"Large": "6px"
	},
	"shadows": {
		"Medium": "0 2px 6px -2px rgba(0, 0, 0, 0.15)"
	},
	"zIndices": [
		"0",
		"1",
		"10",
		"100",
		"1000"
	],
	"buttons": {
		"Primary": {
			"color": "#ffffff",
			"backgroundColor": "#2c90ce",
			"activeColor": "#ffffff",
			"border": "1px solid",
			"borderColor": "#2c90ce",
			"borderRadius": "6px",
			"fontFamily": "Avenir Next",
			"fontSize": "0.875rem",
			"lineHeight": "1.25rem",
			"fontWeight": "600",
			"textTransform": "uppercase",
			"letterSpacing": "1px",
			"paddingX": "24px",
			"paddingY": "14px"
		},
		"Secondary": {
			"color": "#232323",
			"backgroundColor": "transparent",
			"activeColor": "#232323",
			"border": "1px solid",
			"borderColor": "#dddddd",
			"borderRadius": "6px",
			"fontFamily": "Avenir Next",
			"fontSize": "0.875rem",
			"lineHeight": "1.25rem",
			"fontWeight": "400",
			"textTransform": "uppercase",
			"letterSpacing": "1px",
			"paddingX": "24px",
			"paddingY": "14px"
		},
		"Tertiary": {
			"color": "#2c90ce",
			"backgroundColor": "transparent",
			"activeColor": "#2c90ce",
			"border": "0",
			"fontFamily": "Avenir Next",
			"fontSize": "1rem",
			"lineHeight": "1.25rem",
			"fontWeight": "500"
		},
		"Welcome": {
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"width": "172px",
			"height": "104px",
			"color": "#2c90ce",
			"backgroundColor": "#ffffff",
			"activeColor": "#2c90ce",
			"border": "0",
			"borderRadius": "4px",
			"boxShadow": "0 2px 6px -2px rgba(0, 0, 0, 0.15)",
			"fontFamily": "Avenir Next",
			"fontSize": "1rem",
			"lineHeight": "1.25rem",
			"fontWeight": "500"
		},
		"Invisible": {
			"backgroundColor": "transparent",
			"border": "0",
			"color": "unset",
			"activeColor": "unset"
		}
	},
	"texts": {
		"Primary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "0.875rem",
			"lineHeight": "1rem"
		},
		"Secondary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "1rem",
			"lineHeight": "1.25rem",
			"fontWeight": "700"
		},
		"Accent": {
			"color": "#6b6b6b",
			"fontFamily": "Avenir Next",
			"fontSize": "0.75rem",
			"lineHeight": "1rem",
			"fontWeight": "400",
			"textTransform": "uppercase",
			"letterSpacing": "1px"
		},
		"Accent Small": {
			"color": "#6b6b6b",
			"fontFamily": "Avenir Next",
			"fontSize": "0.75rem",
			"lineHeight": "1rem",
			"fontWeight": "300"
		}
	},
	"headings": {
		"Primary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "1rem",
			"lineHeight": "1.25rem",
			"fontWeight": "700"
		},
		"Secondary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "2rem",
			"lineHeight": "1.5rem",
			"fontWeight": "700"
		},
		"Tertiary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "1.5rem",
			"lineHeight": "2rem",
			"fontWeight": "700"
		}
	},
	"labels": {},
	"links": {
		"Primary": {
			"color": "#2c90ce",
			"fontFamily": "Avenir Next",
			"fontSize": "1rem",
			"lineHeight": "1.25rem",
			"fontWeight": "500"
		}
	},
	"icons": {
		"Primary": {
			"fill": "#2c90ce"
		}
	},
	"inputs": {
		"Primary": {
			"color": "#232323",
			"fontFamily": "Avenir Next",
			"fontSize": "0.875rem"
		}
	}
} as const


type StyleTheme = typeof theme

declare module 'styled-components' {
	export interface DefaultTheme extends StyleTheme {}
}

export default theme