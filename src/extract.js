import { getSelectedDocument } from 'sketch'

const filterNonStrings = (value) => typeof value === 'string'

const filterNonNumbers = (value) => typeof value === 'number'

export const extractSketchDocumentStyles = () => {
	const document = getSelectedDocument()
	const colors = []
	const fonts = []
	const fontSizes = []
	const fontWeights = []
	const lineHeights = []
	const letterSpacings = []

	const updateColors = (color) => {
		const colorValue = color.charAt(0) === '#' ? color.substr(0, color.length - 2) : color

		if (!colors.includes(colorValue)) {
			colors.push(colorValue)
		}
	}

	const extractColorStyles = ({ color, gradient }) => {
		if (color) {
			updateColors(color)
		}

		if (gradient) {
			gradient.stops.forEach(({ color }) => updateColors(color))
		}
	}

	const extractFillAndBorderStyles = ({ fills, borders }) => {
		fills.forEach(extractColorStyles)
		borders.forEach(extractColorStyles)
	}

	const extractTextStyles = ({ textColor, fontFamily, fontSize, fontWeight, lineHeight, kerning }) => {
		updateColors(textColor)

		if (!fonts.includes(fontFamily)) {
			fonts.push(fontFamily)
		}

		if (!fontSizes.includes(fontSize)) {
			fontSizes.push(fontSize)
		}

		if (!fontWeights.includes(fontWeight)) {
			fontWeights.push(fontWeight)
		}

		if (!lineHeights.includes(lineHeight)) {
			lineHeights.push(lineHeight)
		}

		if (!letterSpacings.includes(kerning)) {
			letterSpacings.push(kerning)
		}
	}

	const extractStylesFromLayers = ({ name, type, style, background, layers }) => {
		if (background) {
			updateColors(background.color)
		}

		if (style) {
			extractFillAndBorderStyles(style)

			if (type === 'Text') {
				extractTextStyles(style)
			}
		}

		if (layers) {
			layers.forEach(extractStylesFromLayers)
		}
	}

	document.colors.forEach(({ name, color }) => updateColors(color))
	document.gradients.forEach(({ name, gradient }) => extractColorStyles({ gradient }))
	document.pages.forEach(extractStylesFromLayers)
	document.sharedLayerStyles.forEach(extractStylesFromLayers)
	document.sharedTextStyles.forEach(extractStylesFromLayers)

	fontSizes.sort((a, b) => a - b)
	fontWeights.sort((a, b) => a - b)
	lineHeights.sort((a, b) => a - b)
	letterSpacings.sort((a, b) => a - b)

	return {
		colors: colors.filter(filterNonStrings),
		fonts: fonts.filter(filterNonStrings),
		fontSizes: fontSizes.filter(filterNonNumbers),
		fontWeights: fontWeights.filter(filterNonNumbers),
		lineHeights: lineHeights.filter(filterNonNumbers),
		letterSpacings: letterSpacings.filter(filterNonNumbers),
	}
}
