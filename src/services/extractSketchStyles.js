import { titleCase } from '@intouchg/utility'

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
	const a = (parseFloat(alpha.toFixed(2)) * 100).toFixed(0)

	return `rgba(${r}, ${g}, ${b}, ${a}%)`
}

const checkForMatchingShadow = (shadows, shadow) => {
	const { x, y, blur, spread, color } = shadow

	if (shadows.some(({ x: x2, y: y2, blur: blur2, spread: spread2, color: color2 }) =>
		(x2 === x && y2 === y && blur2 === blur && spread2 === spread && color2 === color),
	)) {
		return true
	}

	return false
}

const sortIntegersAscending = (a, b) => a - b

const sortShadowStyles = (a, b) => {
	const valueA = a.blur + a.spread + (0.5 * (Math.abs(a.x) + Math.abs(a.y)))
	const valueB = b.blur + b.spread + (0.5 * (Math.abs(b.x) + Math.abs(b.y)))
	return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
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
	const innerShadows = []
	const borderWidths = []

	document.swatches.forEach(({ name, color }) => {
		colors.push([ titleCase(name), convert8DigitHex(color) ])
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

		const lineHeightRatio = lineHeight ? Number((lineHeight / fontSize).toFixed(3)) : 1

		if (!lineHeights.includes(lineHeightRatio)) {
			lineHeights.push(lineHeightRatio)
		}

		if (!letterSpacings.includes(kerning)) {
			letterSpacings.push(kerning)
		}
	})

	document.sharedLayerStyles.forEach(({ style: { borders: sharedBorderStyles, shadows: sharedShadowStyles, innerShadows: sharedInnerShadowStyles } }) => {
		sharedBorderStyles.forEach(({ enabled, thickness }) => {
			if (enabled && !borderWidths.includes(thickness)) {
				borderWidths.push(thickness)
			}
		})

		sharedShadowStyles.forEach((shadow) => {
			if (shadow.enabled) {
				if (checkForMatchingShadow(shadows, shadow)) {
					return
				}

				const { x, y, blur, spread, color } = shadow
				shadows.push({ x, y, blur, spread, color })
			}
		})

		sharedInnerShadowStyles.forEach((innerShadow) => {
			if (innerShadow.enabled) {
				if (checkForMatchingShadow(innerShadows, innerShadow)) {
					return
				}

				const { x, y, blur, spread, color } = innerShadow
				innerShadows.push({ x, y, blur, spread, color })
			}
		})
	})

	fontSizes.sort(sortIntegersAscending)
	fontWeights.sort(sortIntegersAscending)
	lineHeights.sort(sortIntegersAscending)
	letterSpacings.sort(sortIntegersAscending)
	borderWidths.sort(sortIntegersAscending)
	shadows.sort(sortShadowStyles)
	innerShadows.sort(sortShadowStyles)

	const shadowStrings = shadows.map(({ x, y, blur, spread, color }) => `${x}px ${y}px ${blur}px ${spread}px ${convert8DigitHex(color)}`)
	const innerShadowStrings = innerShadows.map(({ x, y, blur, spread, color }) => `inset ${x}px ${y}px ${blur}px ${spread}px ${convert8DigitHex(color)}`)

	return {
		colors: colors.filter(([ , v ]) => filterNonStrings(v)),
		fonts: fonts.filter(filterNonStrings),
		fontSizes: fontSizes.filter(filterNonNumbers).map((v) => convertPxToRem(v)),
		fontWeights: fontWeights.filter(filterNonNumbers).map((v) => v.toString()),
		lineHeights: lineHeights.filter(filterNonNumbers).map((v) => v.toString()),
		letterSpacings: letterSpacings.filter(filterNonNumbers).map((v) => `${v}px`),
		borderWidths: borderWidths.filter(filterNonNumbers).map((v) => `${v}px`),
		shadows: shadowStrings.concat(innerShadowStrings),
	}
}
