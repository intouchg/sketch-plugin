const filterNonStrings = (value) => typeof value === 'string'

const filterNonNumbers = (value) => typeof value === 'number'

const convertPxToRem = (pxNumber, baseFontSize = 16) => `${parseFloat((pxNumber / baseFontSize).toFixed(4))}rem`

const convert8DigitHex = (color) => {
	if (color.charAt(0) !== '#' || color.length !== 9) {
		return color
	}

	const alpha = parseInt(color.substr(-2), 16) / 255

	if (alpha === 1) {
		return color.substr(0, 7)
	}

	const r = parseInt(color.substr(1, 2), 16)
	const g = parseInt(color.substr(3, 2), 16)
	const b = parseInt(color.substr(5, 2), 16)

	return `rgba(${r}, ${g}, ${b}, ${parseFloat(alpha.toFixed(2))})`
}

export const extractSketchDocumentStyles = (document) => {
	const colors = []
	const fonts = []
	const fontSizes = []
	const fontWeights = []
	const lineHeights = []
	const letterSpacings = []
	const shadows = []
	const shadowCache = []
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
			if (enabled && !bordersWidths.includes(thickness)) {
				borderWidths.push(thickness)
			}
		})

		sharedShadowStyles.forEach(({ enabled, x, y, blur, spread, color }) => {
			if (enabled) {
				if (shadowCache.some(({ x: x2, y: y2, blur: blur2, spread: spread2, color: color2 }) =>
					(x2 === x && y2 === y && blur2 === blur && spread2 === spread && color2 === color),
				)) {
					return
				}

				shadowCache.push({ x, y, blur, spread, color })
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
		fontSizes: fontSizes.filter(filterNonNumbers).map(convertPxToRem),
		fontWeights: fontWeights.filter(filterNonNumbers),
		lineHeights: lineHeights.filter(filterNonNumbers).map(convertPxToRem),
		letterSpacings: letterSpacings.filter(filterNonNumbers).map((v) => `${v}px`),
		borderWidths: borderWidths.filter(filterNonNumbers).map((v) => `${v}px`),
		shadows,
		radii,
	}
}
