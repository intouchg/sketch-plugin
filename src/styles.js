import { getSelectedDocument } from 'sketch'

const getColorValue = (color) => color.charAt(0) === '#' ? color.substr(0, color.length - 2) : color

export const importSketchStyles = () => {
	const document = getSelectedDocument()
	const colors = []
	const fonts = []
	const fontSizes = []
	const fontWeights = []

	const updateColors = (color) => {
		const colorValue = getColorValue(color)

		if (!colors.includes(colorValue)) {
			colors.push(colorValue)
		}
	}

	document.colors.forEach(({ name, color }) => updateColors(color))

	document.gradients.forEach(({ name, stops }) => {
		stops.forEach(({ color }) => updateColors(color))
	})

	const extractColorStyles = ({ color, gradient }) => {
		updateColors(color)
		gradient.stops.forEach(({ color }) => updateColors(color))
	}

	document.sharedLayerStyles.forEach(({ style: { fills, borders } }) => {
		fills.forEach(extractColorStyles)
		borders.forEach(extractColorStyles)
	})

	document.sharedTextStyles.forEach(({ name, style: { fontFamily, fontSize, fontWeight } }) => {
		if (!fonts.includes(fontFamily)) {
			fonts.push(fontFamily)
		}

		if (!fontSizes.includes(fontSize)) {
			fontSizes.push(fontSize)
		}

		if (!fontWeights.includes(fontWeight)) {
			fontWeights.push(fontWeight)
		}
	})

	fontSizes.sort((a, b) => a - b)
	fontWeights.sort((a, b) => a - b)

	return {
		colors,
		fonts,
		fontSizes,
		fontWeights,
	}
}
