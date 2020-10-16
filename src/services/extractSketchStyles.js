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

const sortIntegersAscending = (a, b) => a - b

const sortShadowStyles = (a, b) => {
	const a1 = Math.abs(a.y)
	const b1 = Math.abs(b.y)
	const r1 = a1 < b1 ? -1 : a1 > b1 ? 1 : 0

	if (r1 !== 0) {
		return r1
	}

	const a2 = a.spread
	const b2 = b.spread
	const r2 = a2 < b2 ? -1 : a2 > b2 ? 1 : 0

	if (r2 !== 0) {
		return r2
	}

	const a3 = a.blur
	const b3 = b.blur
	const r3 = a3 < b3 ? -1 : a3 > b3 ? 1 : 0

	if (r3 !== 0) {
		return r3
	}

	const a4 = Math.abs(a.x)
	const b4 = Math.abs(b.x)
	return a4 < b4 ? -1 : a4 > b4 ? 1 : 0
}

export const extractSketchDocumentStyles = (document) => {
	if (!document) {
		return
	}

	const colors = []
	const fonts = []
	const fontSizes = []
	const fontWeights = []
	const lineHeights = []
	const letterSpacings = []
	const shadows = []
	const borderWidths = []

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
			if (enabled && !borderWidths.includes(thickness)) {
				borderWidths.push(thickness)
			}
		})

		sharedShadowStyles.forEach(({ enabled, x, y, blur, spread, color }) => {
			if (enabled) {
				if (shadows.some(({ x: x2, y: y2, blur: blur2, spread: spread2, color: color2 }) =>
					(x2 === x && y2 === y && blur2 === blur && spread2 === spread && color2 === color),
				)) {
					return
				}

				shadows.push({ x, y, blur, spread, color })
			}
		})
	})

	fontSizes.sort(sortIntegersAscending)
	fontWeights.sort(sortIntegersAscending)
	lineHeights.sort(sortIntegersAscending)
	letterSpacings.sort(sortIntegersAscending)
	borderWidths.sort(sortIntegersAscending)
	shadows.sort(sortShadowStyles)

	return {
		colors: colors.filter(([ , v ]) => filterNonStrings(v)),
		fonts: fonts.filter(filterNonStrings),
		fontSizes: fontSizes.filter(filterNonNumbers).map((v) => convertPxToRem(v)),
		fontWeights: fontWeights.filter(filterNonNumbers),
		lineHeights: lineHeights.filter(filterNonNumbers).map((v) => convertPxToRem(v)),
		letterSpacings: letterSpacings.filter(filterNonNumbers).map((v) => `${v}px`),
		borderWidths: borderWidths.filter(filterNonNumbers).map((v) => `${v}px`),
		shadows: shadows.map(({ x, y, blur, spread, color }) => `${x}px ${y}px ${blur}px ${spread}px ${convert8DigitHex(color)}`),
	}
}
