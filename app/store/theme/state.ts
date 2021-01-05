import type { ThemeBorder, ThemeBorderStyle, ThemeBorderWidth, ThemeBreakpoint, ThemeColor, ThemeFont, ThemeFontSize, ThemeFontWeight, ThemeLetterSpacing, ThemeLineHeight, ThemeRadius, ThemeShadow, ThemeSize, ThemeSpace, ThemeValue, ThemeVariant, ThemeZIndex } from '@i/theme'
import type { RecentProject, ParsedImportedSketchValues, SystemFontsDictionary } from '../../sketchApi'

export type ThemeData = {
	values: ThemeValue[]
	variants: ThemeVariant[]
}

export type ThemeState = {
	values: {
		breakpoints: ThemeBreakpoint[]
		space: ThemeSpace[]
		sizes: ThemeSize[]
		colors: ThemeColor[]
		fonts: ThemeFont[]
		fontSizes: ThemeFontSize[]
		fontWeights: ThemeFontWeight[]
		lineHeights: ThemeLineHeight[]
		letterSpacings: ThemeLetterSpacing[]
		borders: ThemeBorder[]
		borderStyles: ThemeBorderStyle[]
		borderWidths: ThemeBorderWidth[]
		radii: ThemeRadius[]
		shadows: ThemeShadow[]
		zIndices: ThemeZIndex[]
	}
	variants: ThemeVariant[]
	canUndo: boolean
	canRedo: boolean
	recentProjects: RecentProject[]
	sketchDocumentNames: string[]
	importedSketchValues: ParsedImportedSketchValues
	importedSketchFontFamilyNames: string[]
	systemFonts: SystemFontsDictionary
}

export const initialThemeState: ThemeState = {
	canUndo: false,
	canRedo: false,
	values: {
		breakpoints: [],
		space: [],
		sizes: [],
		colors: [],
		fonts: [],
		fontSizes: [],
		fontWeights: [],
		lineHeights: [],
		letterSpacings: [],
		borders: [],
		borderStyles: [],
		borderWidths: [],
		radii: [],
		shadows: [],
		zIndices: [],
	},
	variants: [] as ThemeVariant[],
	recentProjects: [],
	sketchDocumentNames: [],
	importedSketchValues: {
		colors: [],
		fonts: [],
		fontSizes: [],
		fontWeights: [],
		lineHeights: [],
		letterSpacings: [],
		borderWidths: [],
		shadows: [],
	},
	importedSketchFontFamilyNames: [],
	systemFonts: {},
}
