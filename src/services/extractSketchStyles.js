const filterNonStrings = (value) => typeof value === 'string'

const filterNonNumbers = (value) => typeof value === 'number'

const convert8DigitHex = (color) => color.charAt(0) === '#' ? color.substr(0, color.length - 2) : color

export const extractSketchDocumentStyles = (document) => {
	const colors = []
	const fonts = []
	const fontSizes = []
	const fontWeights = []
	const lineHeights = []
	const letterSpacings = []
	const shadows = []
	const borderWidths = []
	const radii = []

	document.swatches.forEach(({ name, color }) => {
		colors.push([ name, convert8DigitHex(color) ])
	})

	document.sharedTextStyles.forEach(({ style: { fontFamily, fontSize, fontWeight, lineHeight, kerning } }) => {
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
	})

	document.sharedLayerStyles.forEach(({ style: { borders: sharedBorderStyles, shadows: sharedShadowStyles } }) => {
		sharedBorderStyles.forEach(({ enabled, thickness }) => {
			if (enabled) {
				borderWidths.push(thickness)
			}
		})

		sharedShadowStyles.forEach(({ enabled, x, y, blur, spread, color }) => {
			if (enabled) {
				shadows.push(`${x}px ${y}px ${blur}px ${spread}px ${convert8DigitHex(color)}`)
			}
		})
	})

	fontSizes.sort((a, b) => a - b)
	fontWeights.sort((a, b) => a - b)
	lineHeights.sort((a, b) => a - b)
	letterSpacings.sort((a, b) => a - b)
	borderWidths.sort((a, b) => a - b)

	return {
		colors: colors.filter(([ , v ]) => filterNonStrings(v)),
		fonts: fonts.filter(filterNonStrings),
		fontSizes: fontSizes.filter(filterNonNumbers),
		fontWeights: fontWeights.filter(filterNonNumbers),
		lineHeights: lineHeights.filter(filterNonNumbers),
		letterSpacings: letterSpacings.filter(filterNonNumbers),
		borderWidths: borderWidths.filter(filterNonNumbers).map((v) => `${v}px`),
		shadows,
		radii,
	}
}
